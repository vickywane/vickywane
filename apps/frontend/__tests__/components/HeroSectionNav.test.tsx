import { act, fireEvent, render, screen } from "@testing-library/react"
import HeroSectionNav from "@/components/heros/home/HeroSectionNav"
import {
  mockMatchMedia,
  triggerIntersection,
} from "../../test-utils/browserMocks"

/*
  The nav reads the real page: which sections exist, where the hero (#about)
  sits, and which section crosses the middle of the viewport. jsdom has no
  layout, so each test places the hero by stubbing its bounding box.
*/

const SCROLL_MARGIN = 90 // matches scroll-mt-[90px] on the hero
const TOLERANCE = 48 // ABOUT_SCROLL_TOLERANCE in HeroSectionNav

let heroTop = 0

const addSection = (id: string) => {
  const section = document.createElement("section")
  section.id = id
  document.body.appendChild(section)
  return section
}

const setup = ({ withProjects = false, initialTop = 145 } = {}) => {
  const hero = addSection("about")
  hero.style.scrollMarginTop = `${SCROLL_MARGIN}px`
  heroTop = initialTop
  hero.getBoundingClientRect = () => ({ top: heroTop }) as DOMRect

  const sections = {
    hero,
    experience: addSection("experience"),
    projects: withProjects ? addSection("projects") : null,
    writing: addSection("writing"),
    engagements: addSection("engagements"),
  }

  render(<HeroSectionNav />)
  act(() => {
    jest.runOnlyPendingTimers() // flush the requestAnimationFrame measure
  })

  return sections
}

/** Moves the hero and fires the scroll event the nav listens for. */
const scrollHeroTo = (top: number) => {
  heroTop = top
  act(() => {
    fireEvent.scroll(window)
    jest.runOnlyPendingTimers()
  })
}

const activeLink = () =>
  screen
    .queryAllByRole("link")
    .find(link => link.getAttribute("aria-current") === "location")
    ?.textContent ?? null

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
  document.body.innerHTML = ""
})

describe("HeroSectionNav", () => {
  it("lists About first and drops links whose section isn't on the page", () => {
    setup({ withProjects: false })

    expect(screen.getAllByRole("link").map(link => link.textContent)).toEqual([
      "About",
      "Experience",
      "Writing",
      "Talks",
    ])
  })

  it("shows Projects when that section is rendered", () => {
    setup({ withProjects: true })

    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument()
  })

  // ProjectsSummary hides itself on the client once the PostHog flag loads.
  it("drops the Projects link when the section is removed after load", async () => {
    const { projects } = setup({ withProjects: true })

    await act(async () => {
      projects?.remove()
    })

    expect(screen.queryByRole("link", { name: "Projects" })).toBeNull()
  })

  it("adds the Projects link and tracks the section when it appears later", async () => {
    setup({ withProjects: false })

    let projects: HTMLElement | null = null
    await act(async () => {
      projects = addSection("projects")
    })
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument()

    scrollHeroTo(-2000)
    act(() => triggerIntersection(projects as unknown as Element, true))

    expect(activeLink()).toBe("Projects")
  })

  describe("About state", () => {
    it("is active when the page opens with the hero below the header", () => {
      setup({ initialTop: 145 })

      expect(activeLink()).toBe("About")
    })

    it("stays active within the tolerance of the scroll margin", () => {
      setup()
      scrollHeroTo(SCROLL_MARGIN - TOLERANCE)

      expect(activeLink()).toBe("About")
    })

    it("switches off as soon as the hero scrolls past the tolerance", () => {
      setup()
      scrollHeroTo(SCROLL_MARGIN - TOLERANCE - 1)

      expect(activeLink()).toBeNull()
    })

    it("is off when the page loads already scrolled past the hero", () => {
      setup({ initialTop: -600 })

      expect(activeLink()).toBeNull()
    })

    it("comes back when the user scrolls back to the top", () => {
      setup()
      scrollHeroTo(-400)
      scrollHeroTo(145)

      expect(activeLink()).toBe("About")
    })

    it("outranks a section that is also in view while the hero is at the top", () => {
      const { experience } = setup()
      act(() => triggerIntersection(experience, true))

      expect(activeLink()).toBe("About")
    })
  })

  describe("section state", () => {
    it("highlights the section crossing the middle of the viewport", () => {
      const { writing } = setup()
      scrollHeroTo(-2000)
      act(() => triggerIntersection(writing, true))

      expect(activeLink()).toBe("Writing")
    })

    it("hands over to the next section", () => {
      const { experience, writing } = setup()
      scrollHeroTo(-2000)
      act(() => triggerIntersection(experience, true))
      act(() => {
        triggerIntersection(experience, false)
        triggerIntersection(writing, true)
      })

      expect(activeLink()).toBe("Writing")
    })

    it("clears when the active section leaves and nothing replaces it", () => {
      const { experience } = setup()
      scrollHeroTo(-2000)
      act(() => triggerIntersection(experience, true))
      act(() => triggerIntersection(experience, false))

      expect(activeLink()).toBeNull()
    })

    it("ignores a different section leaving", () => {
      const { experience, writing } = setup()
      scrollHeroTo(-2000)
      act(() => triggerIntersection(writing, true))
      act(() => triggerIntersection(experience, false))

      expect(activeLink()).toBe("Writing")
    })
  })

  describe("clicking a link", () => {
    it("smooth-scrolls to the section and updates the hash without a jump", () => {
      const { experience } = setup()
      const scrollIntoView = jest.spyOn(experience, "scrollIntoView")
      const replaceState = jest.spyOn(window.history, "replaceState")

      const notPrevented = fireEvent.click(
        screen.getByRole("link", { name: "Experience" })
      )

      expect(notPrevented).toBe(false) // the browser's own jump is cancelled
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      })
      expect(replaceState).toHaveBeenCalledWith(null, "", "#experience")
    })

    it("jumps instantly for users who prefer reduced motion", () => {
      mockMatchMedia(["(prefers-reduced-motion: reduce)"])
      const { hero } = setup()
      const scrollIntoView = jest.spyOn(hero, "scrollIntoView")

      fireEvent.click(screen.getByRole("link", { name: "About" }))

      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      })
    })

    it("falls back to normal navigation if the section has gone", () => {
      const { writing } = setup()
      writing.remove()

      const notPrevented = fireEvent.click(
        screen.getByRole("link", { name: "Writing" })
      )

      expect(notPrevented).toBe(true)
    })
  })
})
