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
import {
  DEFAULT_LINK_LABEL,
  DEFAULT_TAG_LABEL,
  cleanHref,
  type MessagePart,
} from "./announcement"
import {
  MAX_STRETCH,
  NAIL_Y,
  pullFromPointer,
  releaseSpring,
  ropeStyle,
  stringGeometry,
  strainAt,
  tiltFor,
  type Rig,
} from "./hangingRope"


export { DEFAULT_LINK_LABEL, type MessagePart }

interface HangingBannerProps {
  message: string | MessagePart[]
  /** Where the Read article button (and a long pull down) goes. */
  href?: string
  /** Button text; blank falls back to "Read article →". */
  linkLabel?: string
  /** Tag before the message; blank falls back to "New". */
  tagLabel?: string
  className?: string
}

type Phase = "idle" | "pulling" | "armed" | "opening" | "opened"

/** How far (px) the bar must be pulled down before letting go opens the link. */
export const OPEN_THRESHOLD = 100
/** Pointer travel (px) before a press counts as a drag instead of a click. */
const DRAG_SLOP = 4
const NAIL_RADIUS = 4
/** How long after navigating a still-mounted bar waits before reappearing. */
const RECOVER_AFTER_MS = 1200

const CALM = { type: "spring", stiffness: 320, damping: 32 } as const

const PHASE_MESSAGE: Record<Phase, string> = {
  idle: "",
  pulling: "Keep pulling to open it ↓",
  armed: "Let go to read it",
  opening: "Opening…",
  opened: "Opened in a new tab",
}

/** Internal links stay in-app; external ones open in a new tab. */
const BannerLink = ({
  href,
  className,
  children,
  ...rest
}: {
  href: string
  className?: string
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
  /^https?:\/\//i.test(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )

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

/**
 * One string: from its nail on the header border to its knot on the bar.
 * It sags into a curve when the bar is pushed up and the string goes slack;
 * stretched, it strains (see ropeStyle).
 */
const useString = (
  side: -1 | 1,
  x: MotionValue<number>,
  y: MotionValue<number>,
  width: MotionValue<number>,
  inset: MotionValue<number>,
  rest: MotionValue<number>
) => {
  const geometry = useTransform([x, y, width, inset, rest], (values: number[]) => {
    const [dx, dy, w, ins, len] = values
    if (!w) return { d: "", strain: 0 }

    const rig: Rig = { width: w, inset: ins, rest: len }
    const { nailX, knotX, knotY, restLength, span, extension } =
      stringGeometry(side, dx, dy, rig)
    const slack = Math.max(0, restLength - span)
    const ctrlX = (nailX + knotX) / 2
    const ctrlY = (NAIL_Y + knotY) / 2 + slack * 0.9

    return {
      d: `M ${nailX} ${NAIL_Y} Q ${ctrlX} ${ctrlY} ${knotX} ${knotY}`,
      strain: extension / MAX_STRETCH,
    }
  })

  const d = useTransform(geometry, g => g.d)
  const style = useTransform(geometry, g => ropeStyle(g.strain))
  const dash = useTransform(style, r => r.dash)
  const stroke = useTransform(style, r => r.color)
  const strokeWidth = useTransform(style, r => r.width)

  return { d, dash, stroke, strokeWidth }
}

/**
 * Announcement bar hung from the header on two strings. It swings once on
 * load to show it can be played with; pull it far enough down and let go to
 * open the linked post. A plain click still follows the link.
 */
const HangingBanner = ({
  message,
  href: rawHref,
  linkLabel: rawLinkLabel,
  tagLabel: rawTagLabel,
  className,
}: HangingBannerProps) => {
  // Blank or unsafe links mean no button; a blank label falls back.
  const href = cleanHref(rawHref)
  const linkLabel = rawLinkLabel?.trim() || DEFAULT_LINK_LABEL
  const tagLabel = rawTagLabel?.trim() || DEFAULT_TAG_LABEL
  const router = useRouter()
  const frameRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(1)
  const rotate = useTransform(x, tiltFor)

  // Geometry of the strings, measured from the laid-out (untransformed) bar.
  const width = useMotionValue(0)
  const inset = useMotionValue(0)
  const rest = useMotionValue(0)

  const leftString = useString(-1, x, y, width, inset, rest)
  const rightString = useString(1, x, y, width, inset, rest)

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
    const strain = strainAt(x.get(), y.get(), {
      width: width.get(),
      inset: inset.get(),
      rest: rest.get(),
    })
    const spring = prefersReducedMotion() ? CALM : releaseSpring(strain)
    stopAnimations()
    animsRef.current = [animate(x, 0, spring), animate(y, 0, spring)]
  }, [x, y, width, inset, rest])

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

  const resetTimerRef = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      stopAnimations()
      window.clearTimeout(resetTimerRef.current)
      // Unmounted mid-drag (e.g. a navigation): don't leave the page grabbing.
      if (pointerRef.current) document.body.style.cursor = ""
    },
    []
  )

  useMotionValueEvent(y, "change", latest => {
    if (!pointerRef.current || lockedRef.current) return
    // Without a link there is nothing to open, so no pull hints.
    if (!href) return
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
      window.clearTimeout(resetTimerRef.current)
      resetTimerRef.current = window.setTimeout(() => setPhase("idle"), 1800)
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
        onComplete: () => {
          router.push(href)
          // Usually the page changes and the bar unmounts. If it doesn't (a
          // link back to this page, e.g. /#about), bring the bar back.
          window.clearTimeout(resetTimerRef.current)
          resetTimerRef.current = window.setTimeout(() => {
            lockedRef.current = false
            setPhase("idle")
            springBack() // stops running animations, so fade in after it
            animsRef.current.push(animate(opacity, 1, { duration: 0.25 }))
          }, RECOVER_AFTER_MS)
        },
      }),
    ]
  }

  const setBodyCursor = (value: string) => {
    document.body.style.cursor = value
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (lockedRef.current) return
    if (event.pointerType === "mouse" && event.button !== 0) return
    // Links are for clicking: only the rest of the bar is a drag handle.
    if ((event.target as Element).closest("a")) return

    stopAnimations()
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX - x.get(),
      y: event.clientY - y.get(),
    }
    draggedRef.current = false
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerRef.current
    if (!start || start.id !== event.pointerId) return
    if (event.buttons === 0) {
      // The press ended off the bar before the pointer was captured, so its
      // pointerup never reached us. Forget it instead of letting a plain
      // hover pick the bar up.
      pointerRef.current = null
      setBodyCursor("")
      if (draggedRef.current) {
        setPhase("idle")
        springBack()
      }
      return
    }

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y

    if (!draggedRef.current && Math.hypot(dx, dy) > DRAG_SLOP) {
      draggedRef.current = true
      setBodyCursor("grabbing")
      // Capture only once it is a real drag, so taps keep their normal target.
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        // Pointer already gone (or synthetic): drag still tracks over the bar.
      }
    }
    if (!draggedRef.current) return

    const pulled = pullFromPointer(dx, dy, {
      width: width.get(),
      inset: inset.get(),
      rest: rest.get(),
    })
    x.set(pulled.x)
    y.set(pulled.y)
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

  const hint = PHASE_MESSAGE[phase]
  const hintId = useId()

  const barClass = cn(
    // Mobile follows the "A · Roomy stack" exploration: tag on its own row,
    // 15/22 copy, 16px padding and a 44px button.
    "flex w-full cursor-grab select-none flex-col items-stretch gap-3.5 border border-ink bg-white p-4 text-ink [-webkit-touch-callout:none]",
    "md:flex-row md:items-center md:justify-between md:gap-6 md:py-1.5 md:pr-1.5 md:pl-2.5"
  )

  const focusRing =
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal"

  const parts: MessagePart[] = (
    typeof message === "string" ? [{ text: message }] : message
  )
    .filter(part => part.text)
    .map(part => {
      const partHref = cleanHref(part.href)
      return partHref ? { text: part.text, href: partHref } : { text: part.text }
    })
  const plainMessage = parts.map(part => part.text).join("").trim()

  const content = (
    <>
      <span className="flex w-full min-w-0 flex-col items-start gap-3.5 md:w-auto md:flex-row md:items-center md:gap-3">
        <span className="shrink-0 bg-ink px-[7px] py-[3px] font-code text-[11px] font-bold uppercase leading-[1.4] tracking-[0.1em] text-white">
          {tagLabel}
        </span>
        <span
          // Tablet+ truncates to one line; the tooltip keeps the full text.
          title={plainMessage}
          className="w-full min-w-0 font-display text-[15px] font-medium leading-[22px] tracking-[0.01em] [overflow-wrap:anywhere] md:w-auto md:flex-1 md:truncate md:text-base md:leading-5"
        >
          {parts.map((part, index) =>
            part.href ? (
              <BannerLink
                key={index}
                href={part.href}
                draggable={false}
                className={cn(
                  "cursor-pointer underline decoration-1 underline-offset-2 hover:text-dark-teal",
                  focusRing
                )}
              >
                {part.text}
              </BannerLink>
            ) : (
              <React.Fragment key={index}>{part.text}</React.Fragment>
            )
          )}
        </span>
      </span>
      {href && (
        <BannerLink
          href={href}
          draggable={false}
          aria-describedby={hintId}
          className={cn(
            "flex h-11 w-full shrink-0 cursor-pointer items-center justify-center bg-ink px-3.5 font-code text-[13px] font-bold uppercase leading-[1.4] tracking-[0.06em] whitespace-nowrap text-white transition-colors hover:bg-dark-teal md:h-auto md:w-auto md:py-2",
            focusRing
          )}
        >
          {linkLabel}
        </BannerLink>
      )}
    </>
  )


  // Nothing to announce: render nothing rather than an empty bar.
  if (!plainMessage) return null

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
              data-testid="hanging-banner-string"
              d={leftString.d}
              strokeDasharray={leftString.dash}
              stroke={leftString.stroke}
              strokeWidth={leftString.strokeWidth}
              fill="none"
              strokeLinecap="butt"
            />
            <m.path
              data-testid="hanging-banner-string"
              d={rightString.d}
              strokeDasharray={rightString.dash}
              stroke={rightString.stroke}
              strokeWidth={rightString.strokeWidth}
              fill="none"
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
          >
            <div className={barClass}>{content}</div>

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
              ? "You can also drag the banner; pull it down and let go to open the article."
              : "You can drag this banner around."}
          </span>
        </div>
      </div>
    </LazyMotion>
  )
}

export default HangingBanner
