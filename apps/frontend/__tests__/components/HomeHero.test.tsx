import { render, screen, within } from "@testing-library/react"
import HomeHero from "@/components/heros/home"

const block = (text: string) => ({
  _key: text,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${text}-s`, _type: "span", marks: [], text }],
})

const recentData = {
  projects: [
    {
      name: "Figma Tickets Plugin",
      publish_date: "2025-09-12",
      url: "https://figma.com/plugin",
      teaser: "Turns frames into tickets.",
    },
  ],
  articles: [
    {
      title: "Sending emails in Medusa",
      publish_date: "2025-01-01",
      slug: { current: "medusa-smtp" },
      seo_summary: "SMTP setup.",
    },
  ],
} as any

const renderHero = (props: Partial<React.ComponentProps<typeof HomeHero>> = {}) =>
  render(<HomeHero {...recentData} {...props} />)

describe("HomeHero", () => {
  it("has no contact links; they live in the header", () => {
    renderHero()

    expect(screen.queryByRole("link", { name: /get in touch/i })).toBeNull()
    expect(screen.queryByRole("link", { name: "GitHub" })).toBeNull()
    expect(screen.queryByRole("link", { name: "LinkedIn" })).toBeNull()
  })

  it("is the About section the hero nav links to", () => {
    renderHero()

    expect(screen.getByRole("region", { name: "Introduction" })).toHaveAttribute(
      "id",
      "about"
    )
  })

  describe("pitch", () => {
    it("uses the short Hero Pitch from Sanity when set", () => {
      renderHero({
        hero_pitch: "  I build accessible products.  ",
        banner_description: [block("Long bio.")] as any,
      })

      expect(screen.getByText("I build accessible products.")).toBeInTheDocument()
      expect(screen.queryByText("Long bio.")).toBeNull()
    })

    it("falls back to only the first paragraph of the banner description", () => {
      renderHero({
        hero_pitch: "   ",
        banner_description: [block("First paragraph."), block("Second.")] as any,
      })

      expect(screen.getByText("First paragraph.")).toBeInTheDocument()
      expect(screen.queryByText(/Second\./)).toBeNull()
    })

    it("accepts a plain-string description", () => {
      renderHero({ banner_description: "Plain pitch." as any })

      expect(screen.getByText("Plain pitch.")).toBeInTheDocument()
    })

    it("renders no empty paragraph when there is no pitch at all", () => {
      const { container } = renderHero({})

      expect(container.querySelector("p.type-body")).toBeNull()
    })
  })

  describe("portrait", () => {
    it("uses the alt text from Sanity", () => {
      renderHero({ banner_image_alt: "Victory smiling, in grayscale." })

      expect(
        screen.getByRole("img", { name: "Victory smiling, in grayscale." })
      ).toBeInTheDocument()
    })

    it("falls back to a generic description when the alt text is blank", () => {
      renderHero({ banner_image_alt: "  " })

      expect(
        screen.getByRole("img", {
          name: "Portrait of Victory Nwani, a software engineer.",
        })
      ).toBeInTheDocument()
    })

    it("loads the Sanity image from Cloudinary, with the default as fallback", () => {
      const { unmount } = renderHero({
        banner_image: { public_id: "portfolio/me", format: "png" },
      })
      expect(screen.getByRole("img").getAttribute("src")).toContain(
        "/portfolio/me.png"
      )
      unmount()

      renderHero({ banner_image: null })
      expect(screen.getByRole("img").getAttribute("src")).toContain(
        "/personal-portfolio-app/my-picture.jpg"
      )
    })
  })

  describe("Recent", () => {
    it("hides both Recent layouts when there is nothing to show", () => {
      renderHero({ projects: [], articles: [], engagements: [] })

      expect(screen.queryByRole("heading", { name: "Recent" })).toBeNull()
    })

    // jsdom can't evaluate media queries, so this pins the Tailwind breakpoint
    // contract instead: exactly one Recent layout is visible at any width.
    it("shows the swipe deck below md and the stacked list from md up", () => {
      renderHero()

      const [deck, feed] = screen
        .getAllByRole("heading", { name: "Recent" })
        .map(heading => heading.closest("section") as HTMLElement)

      expect(deck).toHaveAttribute("aria-labelledby", "hero-deck-heading")
      expect(deck).toHaveClass("md:hidden")
      expect(deck).not.toHaveClass("hidden")

      expect(feed).toHaveAttribute("aria-labelledby", "hero-recent-heading")
      expect(feed).toHaveClass("hidden", "md:block")
    })

    it("opens external work in a new tab safely and keeps blog posts in-app", () => {
      renderHero()
      const feed = screen
        .getAllByRole("heading", { name: "Recent" })[1]
        .closest("section") as HTMLElement

      const project = within(feed).getByRole("link", { name: /Figma Tickets Plugin/ })
      expect(project).toHaveAttribute("href", "https://figma.com/plugin")
      expect(project).toHaveAttribute("target", "_blank")
      expect(project).toHaveAttribute("rel", "noopener noreferrer")

      const article = within(feed).getByRole("link", { name: /Sending emails/ })
      expect(article).toHaveAttribute("href", "/blog/medusa-smtp")
      expect(article).not.toHaveAttribute("target")
    })
  })
})
