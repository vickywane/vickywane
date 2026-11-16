"use client"

import React, { useCallback, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import cn from "classnames"
import {
  LazyMotion,
  animate,
  m,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion"
import loadFeatures from "@/framer/load-features"

interface HangingBannerProps {
  message: string
  href?: string
  linkLabel?: string
  className?: string
}

type Phase = "idle" | "pulling" | "armed" | "opening" | "opened"

/** How far (px) the bar must be pulled down before letting go opens the link. */
export const OPEN_THRESHOLD = 90
/** Pointer travel (px) before a press counts as a drag instead of a click. */
const DRAG_SLOP = 4
const NAIL_RADIUS = 4
/**
 * Nails sit on the header's bottom border. The sticky header paints above the
 * hero, so drop them 2px to keep most of the head visible below the line.
 */
const NAIL_Y = 2
const MAX_TILT = 7

// Loose enough to bob a few times on release, firm enough to settle quickly.
const BOUNCY = { type: "spring", stiffness: 120, damping: 9 } as const
const CALM = { type: "spring", stiffness: 320, damping: 32 } as const

const PHASE_MESSAGE: Record<Phase, string> = {
  idle: "",
  pulling: "Keep pulling to open it ↓",
  armed: "Let go to read it",
  opening: "Opening…",
  opened: "Opened in a new tab",
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const isExternalHref = (href: string) => {
  if (!/^https?:\/\//i.test(href)) return false
  try {
    return new URL(href).origin !== window.location.origin
  } catch {
    return true
  }
}

/** Rubber-band resistance: the further you pull, the less it gives. */
const rubberBand = (distance: number, limit: number) => {
  const magnitude = Math.abs(distance)
  const eased = (1 - 1 / ((magnitude * 0.55) / limit + 1)) * limit

  return Math.sign(distance) * eased
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/** Length of each rope segment once the string starts to strain. */
const STRAIN_DASH = 5
/** Widest gap between segments when the string is pulled tight. */
const MAX_STRAIN_GAP = 2.5

/**
 * One string: from its nail on the header border to its knot on the bar.
 * It sags into a curve when the bar is pushed up and the string goes slack,
 * and splits into short segments, like rope fibres straining, when stretched.
 */
const useString = (
  side: -1 | 1,
  x: MotionValue<number>,
  y: MotionValue<number>,
  rotate: MotionValue<number>,
  width: MotionValue<number>,
  inset: MotionValue<number>,
  rest: MotionValue<number>
) => {
  const geometry = useTransform(
    [x, y, rotate, width, inset, rest],
    (values: number[]) => {
      const [dx, dy, deg, w, ins, len] = values
      if (!w) return { d: "", strain: 0 }

      const nailX = side < 0 ? ins : w - ins
      const reach = nailX - w / 2
      const rad = (deg * Math.PI) / 180
      const knotX = w / 2 + dx + reach * Math.cos(rad)
      const knotY = len + dy + reach * Math.sin(rad)

      const restLength = Math.max(1, len - NAIL_Y)
      const span = Math.hypot(knotX - nailX, knotY - NAIL_Y)
      const slack = Math.max(0, restLength - span)
      const ctrlX = (nailX + knotX) / 2
      const ctrlY = (NAIL_Y + knotY) / 2 + slack * 0.9

      return {
        d: `M ${nailX} ${NAIL_Y} Q ${ctrlX} ${ctrlY} ${knotX} ${knotY}`,
        strain: Math.max(0, span / restLength - 1),
      }
    }
  )

  const d = useTransform(geometry, g => g.d)
  const dash = useTransform(geometry, ({ strain }) => {
    // A little give before the fibres start to show.
    const gap = clamp((strain - 0.15) * 1.2, 0, MAX_STRAIN_GAP)

    return gap < 0.3 ? "none" : `${STRAIN_DASH} ${gap.toFixed(2)}`
  })

  return { d, dash }
}

/**
 * Announcement bar hung from the header on two strings. It swings once on
 * load to show it can be played with; pull it far enough down and let go to
 * open the linked post. A plain click still follows the link.
 */
const HangingBanner = ({
  message,
  href,
  linkLabel = "Read article →",
  className,
}: HangingBannerProps) => {
  const router = useRouter()
  const frameRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(1)
  const rotate = useTransform(x, v => clamp(v * 0.045, -MAX_TILT, MAX_TILT))

  // Geometry of the strings, measured from the laid-out (untransformed) bar.
  const width = useMotionValue(0)
  const inset = useMotionValue(0)
  const rest = useMotionValue(0)

  const leftString = useString(-1, x, y, rotate, width, inset, rest)
  const rightString = useString(1, x, y, rotate, width, inset, rest)

  // Nails never move, so they are plain state: rendered straight from layout.
  const [nails, setNails] = useState<[number, number] | null>(null)
  const [phase, setPhase] = useState<Phase>("idle")

  const pointerRef = useRef<{ id: number; x: number; y: number } | null>(null)
  const draggedRef = useRef(false)
  const lockedRef = useRef(false)
  const animsRef = useRef<AnimationPlaybackControls[]>([])

  const stopAnimations = () => {
    animsRef.current.forEach(anim => anim.stop())
    animsRef.current = []
  }

  const springBack = useCallback(() => {
    const spring = prefersReducedMotion() ? CALM : BOUNCY
    stopAnimations()
    animsRef.current = [animate(x, 0, spring), animate(y, 0, spring)]
  }, [x, y])

  useEffect(() => {
    const frame = frameRef.current
    const bar = barRef.current
    if (!frame || !bar) return

    const measure = () => {
      const isWide = window.matchMedia("(min-width: 768px)").matches
      // Nail centres sit 48px in from the bar's ends on desktop, 24px on mobile.
      const nailInset = isWide ? 48 : 24
      const barWidth = bar.offsetWidth

      width.set(barWidth)
      rest.set(bar.offsetTop)
      inset.set(nailInset)
      setNails([nailInset, barWidth - nailInset])
    }

    measure()
    if (typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(measure)
    observer.observe(frame)

    return () => observer.disconnect()
  }, [width, rest, inset])

  // A small nudge on load so it reads as something you can grab.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const timer = window.setTimeout(() => {
      animsRef.current = [
        animate(x, 0, {
          type: "spring",
          velocity: 280,
          stiffness: 100,
          damping: 4.5,
        }),
        animate(y, 0, {
          type: "spring",
          velocity: 90,
          stiffness: 160,
          damping: 6,
        }),
      ]
    }, 700)

    return () => window.clearTimeout(timer)
  }, [x, y])

  useEffect(() => () => stopAnimations(), [])

  useMotionValueEvent(y, "change", latest => {
    if (!pointerRef.current || lockedRef.current) return
    setPhase(
      latest >= OPEN_THRESHOLD ? "armed" : latest > 24 ? "pulling" : "idle"
    )
  })

  const open = () => {
    if (!href) return

    if (isExternalHref(href)) {
      // Must happen inside the pointerup gesture or popup blockers step in.
      window.open(href, "_blank", "noopener,noreferrer")
      setPhase("opened")
      springBack()
      window.setTimeout(() => setPhase("idle"), 1800)
      return
    }

    lockedRef.current = true
    setPhase("opening")
    stopAnimations()
    animsRef.current = [
      animate(y, y.get() + 220, { duration: 0.35, ease: "easeIn" }),
      animate(opacity, 0, {
        duration: 0.35,
        ease: "easeIn",
        onComplete: () => router.push(href),
      }),
    ]
  }

  const setBodyCursor = (value: string) => {
    document.body.style.cursor = value
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (lockedRef.current) return
    if (event.pointerType === "mouse" && event.button !== 0) return

    stopAnimations()
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX - x.get(),
      y: event.clientY - y.get(),
    }
    draggedRef.current = false
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Pointer already gone (or synthetic): drag still tracks over the bar.
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerRef.current
    if (!start || start.id !== event.pointerId) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y

    if (!draggedRef.current && Math.hypot(dx, dy) > DRAG_SLOP) {
      draggedRef.current = true
      setBodyCursor("grabbing")
    }
    if (!draggedRef.current) return

    x.set(rubberBand(dx, 220))
    // Easy to pull down, stiff to push up: the strings only go slack.
    y.set(dy >= 0 ? rubberBand(dy, 360) : rubberBand(dy, 50))
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerRef.current
    if (!start || start.id !== event.pointerId) return

    pointerRef.current = null
    setBodyCursor("")
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (
      event.type === "pointerup" &&
      draggedRef.current &&
      href &&
      y.get() >= OPEN_THRESHOLD
    ) {
      open()
      return
    }

    setPhase("idle")
    springBack()
  }

  // A drag ends in a click on the link; swallow it so only a real click navigates.
  const onClickCapture = (event: React.MouseEvent) => {
    if (draggedRef.current || lockedRef.current) {
      event.preventDefault()
      event.stopPropagation()
      draggedRef.current = false
    }
  }

  const barClass = cn(
    "flex w-full cursor-grab select-none flex-col items-start gap-2.5 border border-ink bg-white p-2.5 text-ink outline-none [-webkit-touch-callout:none] [-webkit-user-drag:none]",
    "md:flex-row md:items-center md:justify-between md:gap-6 md:py-1.5 md:pr-1.5 md:pl-2.5",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal"
  )

  const content = (
    <>
      <span className="flex w-full min-w-0 items-center gap-2.5 md:w-auto md:gap-3">
        <span className="shrink-0 bg-ink px-[7px] py-[3px] font-code text-[11px] font-bold uppercase leading-[1.4] tracking-[0.1em] text-white">
          New
        </span>
        <span className="min-w-0 flex-1 font-display text-sm font-medium leading-[18px] tracking-[0.01em] md:truncate md:text-base md:leading-5">
          {message}
        </span>
      </span>
      {href && (
        <span className="flex w-full shrink-0 justify-center bg-ink px-3.5 py-2 font-code text-[13px] font-bold uppercase leading-[1.4] tracking-[0.06em] whitespace-nowrap text-white md:w-auto">
          {linkLabel}
        </span>
      )}
    </>
  )

  const hint = PHASE_MESSAGE[phase]
  const hintId = useId()

  const external = href ? /^https?:\/\//i.test(href) : false
  const linkProps = {
    className: barClass,
    draggable: false,
    onDragStart: (event: React.DragEvent) => event.preventDefault(),
    "aria-describedby": hintId,
  }

  return (
    <LazyMotion strict features={loadFeatures}>
      <div
        className={cn(
          "relative z-20 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16 xl:px-[120px]",
          className
        )}
      >
        <div ref={frameRef} className="relative pt-7 md:pt-9">
          <svg
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 size-full overflow-visible text-ink transition-opacity",
              nails ? "opacity-100" : "opacity-0"
            )}
          >
            <m.path
              d={leftString.d}
              strokeDasharray={leftString.dash}
              fill="none"
              stroke="currentColor"
              strokeLinecap="butt"
            />
            <m.path
              d={rightString.d}
              strokeDasharray={rightString.dash}
              fill="none"
              stroke="currentColor"
              strokeLinecap="butt"
            />
            {nails?.map((cx, index) => (
              <circle
                key={index}
                data-testid="hanging-banner-nail"
                cx={cx}
                cy={NAIL_Y}
                r={NAIL_RADIUS}
                fill="currentColor"
              />
            ))}
          </svg>

          <m.div
            ref={barRef}
            data-testid="hanging-banner-bar"
            style={{ x, y, rotate, opacity, transformOrigin: "50% 0%" }}
            className="relative touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
          >
            {href ? (
              external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...linkProps}
                >
                  {content}
                </a>
              ) : (
                <Link href={href} {...linkProps}>
                  {content}
                </Link>
              )
            ) : (
              <div className={barClass}>{content}</div>
            )}

            <span
              aria-live="polite"
              className={cn(
                "pointer-events-none absolute top-full left-1/2 mt-3 -translate-x-1/2 bg-ink px-2.5 py-1 font-code text-xs font-bold whitespace-nowrap text-white transition-opacity duration-150",
                hint ? "opacity-100" : "opacity-0"
              )}
            >
              {hint}
            </span>
          </m.div>

          <span id={hintId} className="sr-only">
            {href
              ? "You can also drag this banner; pull it down and let go to open the post."
              : "You can drag this banner around."}
          </span>
        </div>
      </div>
    </LazyMotion>
  )
}

export default HangingBanner
