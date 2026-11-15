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

  if (!items.length) return null

  const controlClass =
    "flex size-11 items-center justify-center text-ink transition-opacity disabled:opacity-35 outline-none focus-visible:outline-2 focus-visible:outline-dark-teal"

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
        className="-mr-6 snap-x snap-mandatory overflow-x-auto outline-none [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-dark-teal [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-4 pr-6">
        {items.map(item => (
          <li
            key={item.type}
            className="w-[268px] shrink-0 snap-start"
          >
            <RecentLink
              item={item}
              className="group flex h-[319px] flex-col gap-3 border border-hairline px-[22px] pt-5 pb-[22px] outline-none transition-colors hover:border-ink focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-dark-teal"
            >
              <span aria-hidden="true" className="h-1 w-full bg-ink" />
              <p className="type-mono font-bold text-dark-teal">{item.type}</p>
              <h3 className="type-h4 line-clamp-2 text-ink">{item.title}</h3>
              {item.description && (
                <p className="type-small line-clamp-3 text-body">
                  {item.description}
                </p>
              )}
              {item.meta && (
                <p className="type-mono line-clamp-2 text-body">{item.meta}</p>
              )}
              <span className="mt-auto flex justify-end text-ink">
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </RecentLink>
          </li>
        ))}
        </ul>
      </div>

      <div aria-hidden="true" className="flex gap-1.5">
        {items.map((item, idx) => (
          <span
            key={item.type}
            className={cn(
              "h-[3px] transition-[width,background-color] duration-200",
              idx === activeIndex ? "w-6 bg-ink" : "w-2 bg-hairline"
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default RecentDeck
