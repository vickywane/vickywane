"use client"

import React, { useEffect, useId, useRef, useState } from "react"
import { flushSync } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import cn from "classnames"
import { ImageLoader } from "@/utils/Cloudinary"
import { social_links } from "@/data/static"
import HeroSectionNav from "@/components/heros/home/HeroSectionNav"
import GithubIcon from "@/assets/svg/icons/github-20.svg"
import LinkedinIcon from "@/assets/svg/icons/linkedin-20.svg"
import MenuIcon from "@/assets/svg/icons/menu-24.svg"
import CloseIcon from "@/assets/svg/icons/close-24.svg"
import { announceMenuToggle } from "./menuEvents"

/*
  Header v2 · H4 (Figma "Portfolio" → Components & assets → Header v2).
  Desktop: brand on the left, contact (Get in touch, GitHub, LinkedIn) on the
  right. Mobile: brand + menu button; the menu lists the home page sections,
  then the same contact links. The hero has no contact links of its own.
*/

const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal"

const contactBoxClass = cn(
  "flex h-11 shrink-0 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-white",
  focusRing
)

/**
 * Get in touch, GitHub and LinkedIn: 44px, 1px ink border, 8px gaps.
 * `fill`: Get in touch takes the row's spare width (the mobile menu).
 */
const ContactLinks = ({
  className,
  fill = false,
}: {
  className?: string
  fill?: boolean
}) => (
  <div className={cn("flex items-center gap-2", fill && "w-full", className)}>
    <a
      href={social_links.contact}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(contactBoxClass, "type-small px-3", fill && "flex-1")}
    >
      Get in touch
    </a>
    <a
      href={social_links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className={cn(contactBoxClass, "w-11")}
    >
      <GithubIcon aria-hidden="true" />
    </a>
    <a
      href={social_links.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={cn(contactBoxClass, "w-11")}
    >
      <LinkedinIcon aria-hidden="true" />
    </a>
  </div>
)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Following a section link closes the menu without the slide, or the page
  // would still be moving when the scroll lands.
  const [skipSlide, setSkipSlide] = useState(false)
  const menuId = useId()

  // Tell the hanging banner when the menu moves the page (not on mount).
  const announcedRef = useRef(isMenuOpen)
  useEffect(() => {
    if (announcedRef.current === isMenuOpen) return
    announcedRef.current = isMenuOpen
    announceMenuToggle(isMenuOpen)
  }, [isMenuOpen])

  // Close on Escape, and when the viewport grows past the mobile layout.
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    const onResize = () => desktop.matches && setIsMenuOpen(false)

    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onResize)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onResize)
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-[99999] w-full bg-white">
      <div className="border-b border-semi-transparent-grey">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 md:h-[95px] md:px-12 md:py-0 lg:px-16 xl:px-[120px]">
          <Link
            href="/"
            className={cn("flex items-center gap-3", focusRing)}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
              <Image
                loader={ImageLoader}
                fill
                sizes="44px"
                alt=""
                className="object-cover"
                src="/personal-portfolio-app/icons/victory-picture.jpg"
              />
            </span>
            <span className="font-display text-[18px] leading-6 font-bold text-ink md:text-[22px] md:leading-7">
              Victory Nwani
            </span>
          </Link>

          <ContactLinks className="hidden md:flex" />

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setSkipSlide(false)
              setIsMenuOpen(open => !open)
            }}
            className={cn(
              "flex size-11 cursor-pointer items-center justify-center text-ink md:hidden",
              focusRing
            )}
          >
            {isMenuOpen ? (
              <CloseIcon aria-hidden="true" />
            ) : (
              <MenuIcon aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/*
        Slides down and up (200ms) by animating its row from 0 to its height,
        pushing the page as it goes. Visibility flips after the slide up, so
        a closed menu can't be tabbed into or read out.
      */}
      <div
        id={menuId}
        style={{
          gridTemplateRows: isMenuOpen ? "1fr" : "0fr",
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
        className={cn(
          "grid transition-[grid-template-rows,visibility] duration-200 ease-out motion-reduce:transition-none md:hidden",
          skipSlide && "transition-none"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-b border-ink px-6 pt-5 pb-7">
            <HeroSectionNav
              variant="menu"
              exclude={["about"]}
              // Collapse the menu before the page scrolls, or the section
              // lands under the header by the menu's height.
              onNavigate={() =>
                flushSync(() => {
                  setSkipSlide(true)
                  setIsMenuOpen(false)
                })
              }
            />
            <ContactLinks fill className="pt-6" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
