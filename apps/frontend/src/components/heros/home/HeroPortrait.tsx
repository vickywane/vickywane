"use client"

import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import cn from "classnames"
import { ImageLoader } from "@/utils/Cloudinary"

interface HeroPortraitProps {
  src: string
  alt: string
  className?: string
}

const GUTTER = 24
const POPOVER_WIDTH = 304
const POPOVER_OFFSET = 8
const MOBILE_MAX = 767

const chipLabelClass = "font-code font-bold uppercase leading-[1.4] text-white"

/**
 * Hero portrait: greyscale thumbnail that grows to 288px on click.
 * The ALT chip is a separate button that shows the image's alt text in a popover.
 */
const HeroPortrait = ({ src, alt, className }: HeroPortraitProps) => {
  const [isEnlarged, setIsEnlarged] = useState(false)
  const [isAltOpen, setIsAltOpen] = useState(false)
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    visibility: "hidden",
  })

  const chipRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const popoverId = useId()
  const popoverTitleId = useId()

  const closeAlt = useCallback((returnFocus = true) => {
    setIsAltOpen(false)
    if (returnFocus) chipRef.current?.focus()
  }, [])

  // Anchor 8px below the chip, left-aligned to it; clamp to the viewport and
  // flip above when there is no room below. Full content width on mobile.
  const positionPopover = useCallback(() => {
    const chip = chipRef.current
    const popover = popoverRef.current
    if (!chip || !popover) return

    const rect = chip.getBoundingClientRect()
    const viewportWidth = document.documentElement.clientWidth
    const isMobile = viewportWidth <= MOBILE_MAX
    const width = isMobile
      ? viewportWidth - GUTTER * 2
      : Math.min(POPOVER_WIDTH, viewportWidth - GUTTER * 2)

    const left = isMobile
      ? GUTTER
      : Math.min(
          Math.max(rect.left, GUTTER),
          viewportWidth - GUTTER - width
        )

    const height = popover.offsetHeight
    let top = rect.bottom + POPOVER_OFFSET

    if (
      top + height > window.innerHeight - POPOVER_OFFSET &&
      rect.top - POPOVER_OFFSET - height > POPOVER_OFFSET
    ) {
      top = rect.top - POPOVER_OFFSET - height
    }

    setPopoverStyle({ top, left, width })
  }, [])

  useLayoutEffect(() => {
    if (!isAltOpen) return

    positionPopover()
    // Wait a frame so the popover is visible (positioned) before focusing it
    const focusFrame = window.requestAnimationFrame(() =>
      popoverRef.current?.focus()
    )

    const reposition = () => positionPopover()
    window.addEventListener("resize", reposition)
    // capture: the page scrolls inside a nested container, not the window
    window.addEventListener("scroll", reposition, true)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener("resize", reposition)
      window.removeEventListener("scroll", reposition, true)
    }
  }, [isAltOpen, positionPopover])

  // Re-anchor once the portrait finishes resizing while the popover is open.
  useEffect(() => {
    if (!isAltOpen) return

    const timer = window.setTimeout(positionPopover, 260)

    return () => window.clearTimeout(timer)
  }, [isEnlarged, isAltOpen, positionPopover])

  // Esc closes the popover first, then reduces the portrait.
  useEffect(() => {
    if (!isAltOpen && !isEnlarged) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return

      if (isAltOpen) closeAlt()
      else setIsEnlarged(false)
    }

    document.addEventListener("keydown", onKeyDown)

    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isAltOpen, isEnlarged, closeAlt])

  // Outside click closes the popover.
  useEffect(() => {
    if (!isAltOpen) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node

      if (
        popoverRef.current?.contains(target) ||
        chipRef.current?.contains(target)
      ) {
        return
      }

      closeAlt(false)
    }

    document.addEventListener("pointerdown", onPointerDown)

    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [isAltOpen, closeAlt])

  return (
    <div className={cn("relative w-fit", className)}>
      <button
        type="button"
        aria-expanded={isEnlarged}
        aria-label={isEnlarged ? "Reduce portrait" : "Enlarge portrait"}
        onClick={() => setIsEnlarged(value => !value)}
        className={cn(
          "group relative block overflow-hidden border border-ink bg-ink outline-none",
          "transition-[width,height] duration-[240ms] ease-out-snappy motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal",
          isEnlarged
            ? "size-[288px] cursor-zoom-out"
            : "size-16 cursor-zoom-in md:size-24 lg:size-[110px]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          loader={ImageLoader}
          fill
          priority
          sizes="288px"
          className="object-cover object-top grayscale"
        />
      </button>

      <button
        ref={chipRef}
        type="button"
        aria-label="Show image description"
        aria-haspopup="dialog"
        aria-expanded={isAltOpen}
        aria-controls={isAltOpen ? popoverId : undefined}
        onClick={() => (isAltOpen ? closeAlt() : setIsAltOpen(true))}
        className={cn(
          chipLabelClass,
          "absolute cursor-pointer border border-white/35 bg-ink/45 outline-none",
          "before:absolute before:-inset-2 before:content-['']",
          "transition-colors hover:bg-ink focus-visible:bg-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white",
          isEnlarged
            ? "right-[7px] bottom-[7px] px-[5px] py-0.5 text-[10px] tracking-[0.1em] backdrop-blur-[4px]"
            : "right-[3px] bottom-[3px] px-[3px] py-px text-[8px] tracking-[0.08em] backdrop-blur-[3px]"
        )}
      >
        Alt
      </button>

      {isAltOpen && (
        <div
          ref={popoverRef}
          id={popoverId}
          role="dialog"
          aria-labelledby={popoverTitleId}
          tabIndex={-1}
          style={popoverStyle}
          className="fixed z-50 flex flex-col gap-2 border border-ink bg-white px-4 pt-3 pb-4 shadow-[4px_4px_0_0_var(--color-ink)] outline-none"
        >
          <div className="flex items-center justify-between">
            <p
              id={popoverTitleId}
              className="font-code text-[11px] font-bold uppercase leading-[1.4] tracking-[0.1em] text-dark-teal"
            >
              Alt text
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={() => closeAlt()}
              className="flex size-6 cursor-pointer items-center justify-center border border-ink font-code text-sm font-bold leading-none text-ink outline-none transition-colors hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dark-teal"
            >
              ×
            </button>
          </div>
          <p className="font-body text-[15px] leading-[23px] text-ink">
            {alt}
          </p>
        </div>
      )}
    </div>
  )
}

export default HeroPortrait
