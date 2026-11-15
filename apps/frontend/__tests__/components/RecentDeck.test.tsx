import { act, fireEvent, render, screen } from "@testing-library/react"
import RecentDeck from "@/components/heros/home/RecentDeck"
import { RecentItem } from "@/components/heros/home/recentItems"
import { mockMatchMedia } from "../../test-utils/browserMocks"

/*
  The mobile deck is a horizontal scroller. jsdom has no layout, so the card
  width, gap and scroll extents are stubbed to the real mobile values:
  268px cards, 16px gap, 351px visible width.
*/

const CARD = 268
const GAP = 16
const STEP = CARD + GAP
const VISIBLE = 351

// Hash hrefs keep jsdom from attempting a real navigation when a card is clicked.
const item = (type: RecentItem["type"], title: string): RecentItem => ({
  type,
  title,
  description: `${title} description`,
  meta: "",
  href: `#${type}`,
  isExternal: true,
})

const ITEMS = [
  item("project", "Project card"),
  item("article", "Article card"),
  item("talk", "Talk card"),
]

const offsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetWidth"
)

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    get() {
      return this.tagName === "LI" ? CARD : 0
    },
  })
})

afterAll(() => {
  if (offsetWidth)
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", offsetWidth)
})

const setup = (items = ITEMS) => {
  const utils = render(<RecentDeck items={items} />)
  const scroller = screen.getByRole("region", { name: "Recent work" })
  const list = scroller.querySelector("ul")
  if (list) list.style.columnGap = `${GAP}px`

  Object.defineProperty(scroller, "clientWidth", { value: VISIBLE })
  Object.defineProperty(scroller, "scrollWidth", {
    value: items.length * CARD + (items.length - 1) * GAP + 24,
  })
  const scrollTo = jest.spyOn(scroller, "scrollTo")

  return { ...utils, scroller, scrollTo }
}

const counter = () => screen.getByText(/\d{2} \/ \d{2}/).textContent
const next = () => screen.getByRole("button", { name: "Next" })
const previous = () => screen.getByRole("button", { name: "Previous" })

/** A user swipe or trackpad scroll: move the scroller and let it settle. */
const scrollTo = (scroller: HTMLElement, left: number) => {
  act(() => {
    scroller.scrollLeft = left
    fireEvent.scroll(scroller)
    jest.advanceTimersByTime(150)
  })
}

const pointer = (
  type: "pointerDown" | "pointerMove" | "pointerUp",
  target: HTMLElement,
  init: { clientX: number; pointerType?: string; button?: number }
) =>
  fireEvent[type](target, {
    pointerId: 1,
    pointerType: "mouse",
    button: 0,
    ...init,
  })

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
})

describe("RecentDeck", () => {
  it("renders nothing without items", () => {
    const { container } = render(<RecentDeck items={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("renders every card as a link, without an arrow icon", () => {
    setup()

    const cards = screen.getAllByRole("listitem")
    expect(cards).toHaveLength(3)
    cards.forEach(card => {
      expect(card.querySelector("a")).toBeInTheDocument()
      expect(card.querySelector("svg")).toBeNull()
    })
  })

  describe("prev / next controls", () => {
    it("starts on the first card with Previous disabled", () => {
      setup()

      expect(counter()).toBe("01 / 03")
      expect(previous()).toBeDisabled()
      expect(next()).toBeEnabled()
    })

    it("scrolls one card at a time and updates the counter", () => {
      const { scrollTo } = setup()

      fireEvent.click(next())

      expect(counter()).toBe("02 / 03")
      expect(scrollTo).toHaveBeenLastCalledWith({
        left: STEP,
        behavior: "smooth",
      })
      expect(previous()).toBeEnabled()
    })

    it("disables Next on the last card", () => {
      setup()

      fireEvent.click(next())
      fireEvent.click(next())

      expect(counter()).toBe("03 / 03")
      expect(next()).toBeDisabled()
    })

    it("does not snap back mid-animation while smooth scrolling", () => {
      const { scroller } = setup()

      fireEvent.click(next())
      // An intermediate frame of the smooth scroll, still near card 1.
      act(() => {
        scroller.scrollLeft = 40
        fireEvent.scroll(scroller)
      })

      expect(counter()).toBe("02 / 03")
    })

    it("jumps without animation for reduced-motion users", () => {
      mockMatchMedia(["(prefers-reduced-motion: reduce)"])
      const { scrollTo } = setup()

      fireEvent.click(next())

      expect(scrollTo).toHaveBeenLastCalledWith({ left: STEP, behavior: "auto" })
    })

    it("has a 44px touch target and a pointer cursor", () => {
      setup()

      expect(next()).toHaveClass("size-11", "cursor-pointer")
      expect(previous()).toHaveClass("disabled:cursor-default")
    })
  })

  describe("position indicator", () => {
    const dot = (n: number) =>
      screen.getByRole("button", { name: new RegExp(`^Go to card ${n}:`) })

    it("has one labelled button per card, marking the current one", () => {
      setup()

      expect(dot(1)).toHaveAccessibleName("Go to card 1: Project card")
      expect(dot(1)).toHaveAttribute("aria-current", "true")
      expect(dot(2)).not.toHaveAttribute("aria-current")
      expect(dot(3)).not.toHaveAttribute("aria-current")
    })

    it("jumps straight to the card that was clicked", () => {
      const { scrollTo } = setup()

      fireEvent.click(dot(3))

      expect(scrollTo).toHaveBeenLastCalledWith({
        left: 2 * STEP,
        behavior: "smooth",
      })
      expect(counter()).toBe("03 / 03")
      expect(dot(3)).toHaveAttribute("aria-current", "true")
      expect(dot(1)).not.toHaveAttribute("aria-current")
      expect(next()).toBeDisabled()
    })

    it("can jump back to the first card", () => {
      const { scrollTo } = setup()
      fireEvent.click(dot(3))

      fireEvent.click(dot(1))

      expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" })
      expect(counter()).toBe("01 / 03")
      expect(previous()).toBeDisabled()
    })

    it("follows swipes", () => {
      const { scroller } = setup()

      scrollTo(scroller, STEP)

      expect(dot(2)).toHaveAttribute("aria-current", "true")
    })
  })

  describe("swiping", () => {
    it("follows the nearest card as the user scrolls", () => {
      const { scroller } = setup()

      scrollTo(scroller, STEP * 0.6)

      expect(counter()).toBe("02 / 03")
    })

    it("reports the last card once scrolled to the end, even off the grid", () => {
      // The last card can't scroll to the left edge, so its position is short of 2 * STEP.
      const { scroller } = setup()

      scrollTo(scroller, scroller.scrollWidth - VISIBLE)

      expect(counter()).toBe("03 / 03")
      expect(next()).toBeDisabled()
    })
  })

  describe("mouse dragging", () => {
    it("scrolls with the pointer and snaps to the nearest card on release", () => {
      const { scroller, scrollTo } = setup()

      pointer("pointerDown", scroller, { clientX: 300 })
      pointer("pointerMove", scroller, { clientX: 100 })

      expect(scroller.scrollLeft).toBe(200)
      expect(scroller).toHaveClass("cursor-grabbing")
      expect(scroller).not.toHaveClass("snap-x") // snapping would fight the drag

      pointer("pointerUp", scroller, { clientX: 100 })

      expect(scrollTo).toHaveBeenLastCalledWith({
        left: STEP,
        behavior: "smooth",
      })
      expect(counter()).toBe("02 / 03")
      expect(scroller).toHaveClass("cursor-grab", "snap-x")
    })

    it("does not open the card under the cursor after a drag", () => {
      setup()
      const card = screen.getByRole("link", { name: /Project card/ })

      pointer("pointerDown", card, { clientX: 300 })
      pointer("pointerMove", card, { clientX: 150 })
      pointer("pointerUp", card, { clientX: 150 })

      expect(fireEvent.click(card)).toBe(false) // default prevented
      // Only the click that ended the drag is swallowed.
      expect(fireEvent.click(card)).toBe(true)
    })

    it("treats a tiny wobble as a click, not a drag", () => {
      const { scroller } = setup()
      const card = screen.getByRole("link", { name: /Article card/ })

      pointer("pointerDown", card, { clientX: 300 })
      pointer("pointerMove", card, { clientX: 297 })
      pointer("pointerUp", card, { clientX: 297 })

      expect(scroller.scrollLeft).toBe(0)
      expect(fireEvent.click(card)).toBe(true)
    })

    it("leaves touch and pen swipes to the browser", () => {
      const { scroller } = setup()

      pointer("pointerDown", scroller, { clientX: 300, pointerType: "touch" })
      pointer("pointerMove", scroller, { clientX: 100, pointerType: "touch" })

      expect(scroller.scrollLeft).toBe(0)
      expect(scroller).not.toHaveClass("cursor-grabbing")
    })

    it("ignores right-button drags", () => {
      const { scroller } = setup()

      pointer("pointerDown", scroller, { clientX: 300, button: 2 })
      pointer("pointerMove", scroller, { clientX: 100 })

      expect(scroller.scrollLeft).toBe(0)
    })
  })
})
