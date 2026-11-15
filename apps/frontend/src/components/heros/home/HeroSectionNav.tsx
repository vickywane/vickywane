"use client"

import React, { useEffect, useState } from "react"
import cn from "classnames"
import { hero_section_links } from "@/data/static"

interface HeroSectionNavProps {
  className?: string
}

/** In-page links to the home page sections; highlights the section in view. */
const HeroSectionNav = ({ className }: HeroSectionNavProps) => {
  const [links, setLinks] = useState(hero_section_links)
  const [activeTarget, setActiveTarget] = useState<string | null>(null)

  useEffect(() => {
    // Some sections are feature-flagged (e.g. projects) - drop links with no target.
    const available = hero_section_links.filter(link =>
      document.getElementById(link.target)
    )
    setLinks(available)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveTarget(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )

    available.forEach(link => {
      const section = document.getElementById(link.target)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

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
