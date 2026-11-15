"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import cn from "classnames"
import ArrowLeft from "@/assets/svg/icons/arrow-left-20.svg"
import ArrowRight from "@/assets/svg/icons/arrow-right-20.svg"
import RecentLink from "./RecentLink"
import { RecentItem } from "./recentItems"

interface RecentDeckProps {
  items: RecentItem[]
  className?: string
}

const pad = (value: number) => String(value).padStart(2, "0")

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Mobile: a scroll-snap deck of cards with prev / next controls. */
const RecentDeck = ({ items, className }: RecentDeckProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const targetIndexRef = useRef<number | null>(null)
  const lastIndex = items.length - 1

  const getStep = () => {
    const scroller = scrollerRef.current
    const list = scroller?.querySelector("ul")
    const card = list?.querySelector("li")
    if (!list || !card) return 0

    const gap = parseFloat(getComputedStyle(list).columnGap) || 0

    return card.offsetWidth + gap
  }

  const syncActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current
    const step = getStep()
    if (!scroller || !step) return

    const atEnd =
      scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 2

    setActiveIndex(
      atEnd ? lastIndex : Math.round(scroller.scrollLeft / step)
    )
  }, [lastIndex])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let settleTimer: number | undefined

    const onScroll = () => {
      // Follow manual swipes live, but while a prev/next scroll is animating
      // keep its target so intermediate positions don't flip the counter back.
      if (targetIndexRef.current === null) syncActiveIndex()

      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => {
        targetIndexRef.current = null
        syncActiveIndex()
      }, 120)
    }

    scroller.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.clearTimeout(settleTimer)
      scroller.removeEventListener("scroll", onScroll)
    }
  }, [syncActiveIndex])

  const goTo = (index: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const next = Math.max(0, Math.min(lastIndex, index))

    targetIndexRef.current = next
    setActiveIndex(next)
    scroller.scrollTo({
      left: next * getStep(),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }

  // Mouse drag-to-scroll. Touch and pens already swipe natively.
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startScroll: number
    moved: boolean
  } | null>(null)
  const suppressClickRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current
    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: scroller.scrollLeft,
      moved: false,
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const scroller = scrollerRef.current
    if (!drag || !scroller || drag.pointerId !== event.pointerId) return

    const delta = event.clientX - drag.startX
    if (!drag.moved) {
      if (Math.abs(delta) < 5) return
      drag.moved = true
      setIsDragging(true)
      scroller.setPointerCapture(event.pointerId)
    }

    scroller.scrollLeft = drag.startScroll - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    dragRef.current = null
    if (!drag.moved) return

    // The click that follows a drag must not open the card under the cursor.
    suppressClickRef.current = true
    setIsDragging(false)

    const step = getStep()
    if (step) goTo(Math.round((scrollerRef.current?.scrollLeft ?? 0) / step))
  }

  const onClickCapture = (event: React.MouseEvent) => {
    if (!suppressClickRef.current) return

    suppressClickRef.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  if (!items.length) return null

  const controlClass =
    "flex size-11 cursor-pointer items-center justify-center text-ink transition-opacity disabled:cursor-default disabled:opacity-35 outline-none focus-visible:outline-2 focus-visible:outline-dark-teal"

  return (
    <section
      aria-labelledby="hero-deck-heading"
      className={cn("flex flex-col gap-5", className)}
    >
      <div className="flex items-center justify-between">
        <h2 id="hero-deck-heading" className="type-mono font-bold text-ink">
          Recent
        </h2>

        <div className="flex items-center gap-3">
          <p className="type-mono text-body" aria-live="polite">
            {pad(activeIndex + 1)} / {pad(items.length)}
          </p>

          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Previous"
              className={controlClass}
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className={controlClass}
              disabled={activeIndex === lastIndex}
              onClick={() => goTo(activeIndex + 1)}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Recent work"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={event => event.preventDefault()}
        className={cn(
          "-mr-6 overflow-x-auto outline-none [&_a]:cursor-[inherit] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-dark-teal [&::-webkit-scrollbar]:hidden",
          // Snapping fights a manual scrollLeft, so it is paused mid-drag.
          isDragging
            ? "cursor-grabbing select-none"
            : "cursor-grab snap-x snap-mandatory"
        )}
      >
        <ul className="flex w-max gap-4 pr-6">
        {items.map(item => (
          <li
            key={item.type}
            className="w-[268px] shrink-0 snap-start"
          >
            <RecentLink
              item={item}
              className="flex h-full flex-col gap-2.5 border border-hairline px-[18px] pt-[18px] pb-5 outline-none transition-colors hover:border-ink focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-dark-teal"
            >
              <span aria-hidden="true" className="h-1 w-full bg-ink" />
              <p className="type-mono-caption font-bold text-dark-teal">
                {item.type}
              </p>
              <h3 className="type-peek-title line-clamp-2 text-ink">
                {item.title}
              </h3>
              {item.description && (
                <p className="type-peek-small line-clamp-3 text-body">
                  {item.description}
                </p>
              )}
              {item.meta && (
                <p className="type-mono-caption line-clamp-2 text-body">
                  {item.meta}
                </p>
              )}
            </RecentLink>
          </li>
        ))}
        </ul>
      </div>

      {/* Padding enlarges the click area; the negative margin keeps the bars where they were. */}
      <div className="-mx-[3px] -my-2 flex">
        {items.map((item, idx) => (
          <button
            key={item.type}
            type="button"
            aria-label={`Go to card ${idx + 1}: ${item.title}`}
            aria-current={idx === activeIndex ? "true" : undefined}
            onClick={() => goTo(idx)}
            className="group cursor-pointer px-[3px] py-2 outline-none focus-visible:outline-2 focus-visible:outline-dark-teal"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-[3px] transition-[width,background-color] duration-200",
                idx === activeIndex
                  ? "w-6 bg-ink"
                  : "w-2 bg-hairline group-hover:bg-body"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

export default RecentDeck
