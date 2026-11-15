import React from "react"
import cn from "classnames"
import ArrowRight from "@/assets/svg/icons/arrow-right-18.svg"
import GithubIcon from "@/assets/svg/icons/github-22.svg"
import LinkedinIcon from "@/assets/svg/icons/linkedin-22.svg"
import { social_links } from "@/data/static"

interface HeroSocialBarProps {
  className?: string
}

const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal"

const iconLinkClass = cn(
  "flex size-14 shrink-0 items-center justify-center border-ink text-ink transition-colors hover:bg-ink hover:text-white",
  focusRing
)

/** "Get in touch" CTA joined to the GitHub and LinkedIn icon links. */
const HeroSocialBar = ({ className }: HeroSocialBarProps) => (
  <div className={cn("flex items-center", className)}>
    <a
      href={social_links.contact}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-14 shrink-0 items-center gap-3 whitespace-nowrap bg-ink px-[22px] text-white transition-colors hover:bg-dark-teal",
        focusRing
      )}
    >
      <span className="type-mono text-[15px]! font-bold tracking-[0.06em]">
        Get in touch
      </span>
      <ArrowRight
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      />
    </a>

    <a
      href={social_links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className={cn(iconLinkClass, "border-2")}
    >
      <GithubIcon aria-hidden="true" />
    </a>

    <a
      href={social_links.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={cn(iconLinkClass, "border-y-2 border-r-2")}
    >
      <LinkedinIcon aria-hidden="true" />
    </a>
  </div>
)

export default HeroSocialBar
