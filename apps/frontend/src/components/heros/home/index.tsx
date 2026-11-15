import React from "react"
import { Article, Engagement, Homepage, Projects } from "@/data/schema"
import HeroPortrait from "./HeroPortrait"
import HeroSectionNav from "./HeroSectionNav"
import HeroSocialBar from "./HeroSocialBar"
import RecentDeck from "./RecentDeck"
import RecentFeed from "./RecentFeed"
import { getRecentItems, plainText } from "./recentItems"

const DEFAULT_PORTRAIT = "/v1721832258/personal-portfolio-app/my-picture.jpg"
// Used until "Banner Image Alt Text" is filled in on the Sanity homepage.
const PORTRAIT_ALT = "Portrait of Victory Nwani, a software engineer."

interface HomeHeroProps {
  banner_description?: Homepage["banner_description"] | unknown[]
  hero_pitch?: Homepage["hero_pitch"]
  banner_image?: { public_id?: string; format?: string } | null
  banner_image_alt?: Homepage["banner_image_alt"]
  projects?: Projects[]
  articles?: Article[]
  engagements?: Engagement[]
}

const getPitch = (description: HomeHeroProps["banner_description"]) => {
  if (!description) return ""
  if (typeof description === "string") return description

  // Only the first paragraph of the banner copy fits the hero.
  const [firstBlock] = description as object[]

  return plainText(firstBlock ? [firstBlock] : undefined).trim()
}

const getPortraitSrc = (image: HomeHeroProps["banner_image"]) =>
  image?.public_id
    ? `/${image.public_id}${image.format ? `.${image.format}` : ""}`
    : DEFAULT_PORTRAIT

const HomeHero = ({
  banner_description,
  hero_pitch,
  banner_image,
  banner_image_alt,
  projects,
  articles,
  engagements,
}: HomeHeroProps) => {
  const pitch = hero_pitch?.trim() || getPitch(banner_description)
  const portraitAlt = banner_image_alt?.trim() || PORTRAIT_ALT
  const recentItems = getRecentItems({ projects, articles, engagements })

  return (
    <section
      id="about"
      aria-label="Introduction"
      className="scroll-mt-[90px] bg-cream"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 pt-8 pb-20 md:grid md:grid-cols-2 md:gap-x-12 md:px-12 md:py-20 xl:grid-cols-[560px_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-6 lg:px-16 lg:py-24 xl:gap-x-24 xl:p-[120px]">
        <div className="flex flex-col gap-7 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:gap-6">
          <HeroPortrait src={getPortraitSrc(banner_image)} alt={portraitAlt} />

          <div className="flex flex-col gap-2 lg:gap-6">
            <h1 className="type-display text-dark-teal">Victory Nwani</h1>
            <p className="type-h3 text-ink">Software Engineer</p>
          </div>

          {pitch && (
            <p className="type-body max-w-[540px] text-body">{pitch}</p>
          )}
        </div>

        {recentItems.length > 0 && (
          <>
            <RecentDeck items={recentItems} className="md:hidden" />
            <RecentFeed
              items={recentItems}
              className="hidden md:col-span-2 md:block lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-end"
            />
          </>
        )}

        <HeroSectionNav className="lg:col-start-1" />

        <HeroSocialBar className="md:self-end md:justify-self-end lg:col-start-1 lg:self-start lg:justify-self-start" />
      </div>
    </section>
  )
}

export default HomeHero
