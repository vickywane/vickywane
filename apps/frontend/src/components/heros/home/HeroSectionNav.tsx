"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore
} from "react"
import cn from "classnames"
import { hero_section_links } from "@/data/static"

interface HeroSectionNavProps {
  className?: string
  /** "menu" lays the links out as full-width rows for the mobile header menu. */
  variant?: "hero" | "menu"
  /** Section targets to leave out, e.g. "about" in the header menu. */
  exclude?: string[]
  /** Called after a link is followed, e.g. to close the menu. */
  onNavigate?: () => void
}

// The hero is the "About" section. It only counts as active while it sits at
// the top of the viewport, so it switches off as soon as the user scrolls away.
const ABOUT_TARGET = "about"
const ABOUT_SCROLL_TOLERANCE = 48

/*
  Some sections are feature-flagged on the client (Projects hides itself once
  PostHog loads), so which links to show is read from the DOM and kept in sync
  as sections appear or disappear. The server can't know the flag, so it
  renders every link.
*/
const ALL_TARGETS = hero_section_links.map(link => link.target).join(",")

// Off the home page (no hero), every link points back to its section on "/".
const getAvailableTargets = () =>
  document.getElementById(ABOUT_TARGET)
    ? hero_section_links
        .filter(link => document.getElementById(link.target))
        .map(link => link.target)
        .join(",")
    : ALL_TARGETS

const subscribeToSections = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.body, { childList: true, subtree: true })

  return () => observer.disconnect()
}

/** In-page links to the home page sections; highlights the section in view. */
const HeroSectionNav = ({
  className,
  variant = "hero",
  exclude = [],
  onNavigate
}: HeroSectionNavProps) => {
  const availableTargets = useSyncExternalStore(
    subscribeToSections,
    getAvailableTargets,
    () => ALL_TARGETS
  )
  // `exclude` is a new array on every render; key the memo on its contents.
  const excludeKey = exclude.join(",")
  const links = useMemo(() => {
    const available = availableTargets.split(",")
    const excluded = excludeKey.split(",")
    return hero_section_links.filter(
      link => available.includes(link.target) && !excluded.includes(link.target)
    )
  }, [availableTargets, excludeKey])

  const [sectionTarget, setSectionTarget] = useState<string | null>(null)
  const [isAboutActive, setIsAboutActive] = useState(true)

  // Highlight the section crossing the middle of the viewport.
  useEffect(() => {
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

    availableTargets.split(",").forEach(target => {
      if (target === ABOUT_TARGET) return
      const section = document.getElementById(target)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [availableTargets])

  // Track whether the hero (About) is still at the top of the viewport.
  useEffect(() => {
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
    window.addEventListener("scroll", syncAbout, {
      capture: true,
      passive: true
    })
    window.addEventListener("resize", syncAbout)

    return () => {
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
    onNavigate?.()
    const section = document.getElementById(target)
    // Not on the home page: let the link navigate to "/#target".
    if (!section) return

    event.preventDefault()

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    })
    window.history.replaceState(null, "", `#${target}`)
  }

  const isMenu = variant === "menu"

  return (
    <nav aria-label="Page sections" className={className}>
      <ul className={cn("flex flex-col", !isMenu && "lg:gap-1 lg:py-6")}>
        {links.map(({ label, target }) => {
          const isActive = activeTarget === target

          return (
            <li
              key={target}
              className={cn(isMenu && "border-b border-hairline last:border-b-0")}
            >
              <a
                // "/#target" works from any page; on Home the click handler
                // scrolls in place instead.
                href={`/#${target}`}
                aria-current={isActive ? "location" : undefined}
                onClick={event => handleClick(event, target)}
                className={cn(
                  "group flex items-center gap-4 py-[13px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal",
                  isMenu ? "w-full" : "w-fit lg:py-2.5"
                )}
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
