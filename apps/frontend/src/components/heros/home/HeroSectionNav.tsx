"use client"

import React, { useEffect, useState } from "react"
import cn from "classnames"
import { hero_section_links } from "@/data/static"

interface HeroSectionNavProps {
  className?: string
}

// The hero is the "About" section. It only counts as active while it sits at
// the top of the viewport, so it switches off as soon as the user scrolls away.
const ABOUT_TARGET = "about"
const ABOUT_SCROLL_TOLERANCE = 48

/** In-page links to the home page sections; highlights the section in view. */
const HeroSectionNav = ({ className }: HeroSectionNavProps) => {
  const [links, setLinks] = useState(hero_section_links)
  const [sectionTarget, setSectionTarget] = useState<string | null>(null)
  const [isAboutActive, setIsAboutActive] = useState(true)

  useEffect(() => {
    // Some sections are feature-flagged (e.g. projects) - drop links with no target.
    const available = hero_section_links.filter(link =>
      document.getElementById(link.target)
    )
    setLinks(available)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setSectionTarget(entry.target.id)
          else
            setSectionTarget(current =>
              current === entry.target.id ? null : current
            )
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )

    available.forEach(link => {
      if (link.target === ABOUT_TARGET) return
      const section = document.getElementById(link.target)
      if (section) observer.observe(section)
    })

    const hero = document.getElementById(ABOUT_TARGET)
    let frame = 0
    const syncAbout = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        if (!hero) return
        // Clicking "About" scrolls the hero to its scroll-margin-top, so measure
        // from there: once the hero moves a little above that line, it's off.
        const offset = parseFloat(getComputedStyle(hero).scrollMarginTop) || 0
        const top = hero.getBoundingClientRect().top
        setIsAboutActive(top >= offset - ABOUT_SCROLL_TOLERANCE)
      })
    }
    syncAbout()
    // capture: the page may scroll inside a nested container, not the window
    window.addEventListener("scroll", syncAbout, { capture: true, passive: true })
    window.addEventListener("resize", syncAbout)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", syncAbout, { capture: true })
      window.removeEventListener("resize", syncAbout)
    }
  }, [])

  const activeTarget = isAboutActive ? ABOUT_TARGET : sectionTarget

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    const section = document.getElementById(target)
    if (!section) return

    event.preventDefault()

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
    window.history.replaceState(null, "", `#${target}`)
  }

  return (
    <nav aria-label="Page sections" className={className}>
      <ul className="flex flex-col lg:gap-1 lg:py-6">
        {links.map(({ label, target }) => {
          const isActive = activeTarget === target

          return (
            <li key={target}>
              <a
                href={`#${target}`}
                aria-current={isActive ? "location" : undefined}
                onClick={event => handleClick(event, target)}
                className="group flex w-fit items-center gap-4 py-[13px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal lg:py-2.5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 transition-[width,background-color] duration-200 ease-out-snappy motion-reduce:transition-none",
                    "group-hover:w-16 group-hover:bg-dark-teal group-focus-visible:w-16 group-focus-visible:bg-dark-teal",
                    isActive ? "w-16 bg-dark-teal" : "w-8 bg-ink"
                  )}
                />
                <span
                  className={cn(
                    "type-label transition-colors group-hover:text-dark-teal group-focus-visible:text-dark-teal",
                    isActive ? "text-dark-teal" : "text-body"
                  )}
                >
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default HeroSectionNav
