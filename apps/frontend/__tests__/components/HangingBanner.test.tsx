import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import HangingBanner, {
  OPEN_THRESHOLD,
  type MessagePart,
} from "@/components/heros/home/HangingBanner"

const push = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}))

const MESSAGE = "Sending emails in Medusa with medusa-plugin-smtp"
const LABEL = "Read article →"
const PARTS: MessagePart[] = [
  { text: "Read", href: "/blog/category/mdx" },
  { text: " my lab notes from " },
  { text: "Middlesex University, London", href: "https://www.mdx.ac.uk" },
  { text: "!" },
]

const getBar = () => screen.getByTestId("hanging-banner-bar")
const getButton = () => screen.getByRole("link", { name: LABEL })
const getHint = () => getBar().querySelector("[aria-live]") as HTMLElement

// `buttons: 1` = the primary button is held, as browsers report during a drag.
const mouse = { pointerId: 1, pointerType: "mouse", button: 0, buttons: 1 }
const START = { clientX: 400, clientY: 100 }

/** Presses the bar's body, drags it by (dx, dy) in steps, then optionally lets go. */
const drag = (
  dx: number,
  dy: number,
  { release = true, target }: { release?: boolean; target?: Element } = {}
) => {
  fireEvent.pointerDown(target ?? getBar(), { ...mouse, ...START })
  for (let step = 1; step <= 5; step++) {
    fireEvent.pointerMove(getBar(), {
      ...mouse,
      clientX: START.clientX + (dx * step) / 5,
      clientY: START.clientY + (dy * step) / 5,
    })
  }
  if (release) {
    fireEvent.pointerUp(getBar(), {
      ...mouse,
      clientX: START.clientX + dx,
      clientY: START.clientY + dy,
    })
  }
}

/** Dispatches a real click and reports whether anything cancelled it. */
const clickFollows = (link: Element) => {
  const click = new MouseEvent("click", { bubbles: true, cancelable: true })
  link.dispatchEvent(click)

  return !click.defaultPrevented
}

/**
 * Whether the bar has moved off its resting position. framer-motion writes
 * the transform on its own frame loop, so give it time to render first.
 */
/** LazyMotion loads its features asynchronously; until then nothing can move. */
const ready = () => act(() => new Promise(resolve => setTimeout(resolve, 50)))

const isDisplaced = async () => {
  await act(() => new Promise(resolve => setTimeout(resolve, 100)))

  return /translate/.test(getBar().style.transform)
}

afterEach(() => {
  document.body.style.cursor = ""
})

describe("HangingBanner", () => {
  describe("content and labels", () => {
    it("shows the NEW tag, the message and the Read article button", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

      expect(within(getBar()).getByText("New")).toBeVisible()
      expect(within(getBar()).getByText(MESSAGE)).toBeVisible()
      expect(getButton()).toBeVisible()
    })

    it("uses a custom button label when given one", () => {
      render(
        <HangingBanner message={MESSAGE} href="/blog/a" linkLabel="Watch talk →" />
      )

      expect(screen.getByRole("link", { name: "Watch talk →" })).toBeVisible()
      expect(screen.queryByRole("link", { name: LABEL })).not.toBeInTheDocument()
    })

    it("renders message parts in order, as one sentence", () => {
      render(<HangingBanner message={PARTS} href="/blog/category/mdx" />)

      expect(getBar()).toHaveTextContent(
        "Read my lab notes from Middlesex University, London!"
      )
    })

    it("tells screen readers the button's banner can also be dragged", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      const describedBy = getButton().getAttribute("aria-describedby")
      expect(describedBy).toBeTruthy()
      expect(document.getElementById(describedBy!)).toHaveTextContent(
        "pull it down and let go to open the article"
      )
    })

    it("announces drag hints through a polite live region that starts empty", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      expect(getHint()).toHaveAttribute("aria-live", "polite")
      expect(getHint()).toBeEmptyDOMElement()
    })

    it("drops the button but keeps the message without an href", () => {
      render(<HangingBanner message={MESSAGE} />)

      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(screen.queryByText(LABEL)).not.toBeInTheDocument()
      expect(screen.getByText(MESSAGE)).toBeVisible()
      expect(screen.getByText("You can drag this banner around.")).toBeInTheDocument()
    })
  })

  describe("missing or bad data", () => {
    it.each([
      ["an empty string", ""],
      ["whitespace", "   \n "],
      ["no parts", []],
      ["only empty parts", [{ text: "" }, { text: "  " }]],
    ])("renders nothing for %s, not an empty bar", (_, message) => {
      const { container } = render(
        <HangingBanner message={message as string | MessagePart[]} href="/blog/a" />
      )

      expect(container).toBeEmptyDOMElement()
    })

    it.each([
      ["missing", undefined],
      ["empty", ""],
      ["whitespace", "   "],
    ])("falls back to Read article when the label is %s", (_, linkLabel) => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" linkLabel={linkLabel} />)

      expect(getButton()).toHaveTextContent(LABEL)
    })

    it("trims a padded label", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" linkLabel="  Go →  " />)

      expect(screen.getByRole("link", { name: "Go →" })).toBeVisible()
    })

    it.each([
      ["blank", "   "],
      ["a javascript: URL", "javascript:alert(1)"],
      ["a data: URL", "data:text/html,hi"],
    ])("shows no button and opens nothing when the href is %s", (_, href) => {
      const open = jest.spyOn(window, "open").mockReturnValue(null)
      render(<HangingBanner message={MESSAGE} href={href} />)

      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      drag(0, 500)
      expect(open).not.toHaveBeenCalled()
      expect(push).not.toHaveBeenCalled()
      open.mockRestore()
    })

    it("renders an unsafe link inside the message as plain text", () => {
      render(
        <HangingBanner
          message={[{ text: "Click", href: "javascript:alert(1)" }, { text: " here" }]}
        />
      )

      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(getBar()).toHaveTextContent("Click here")
    })

    it("keeps the full message available when tablet+ truncates it", () => {
      const long = `${"A very long announcement ".repeat(12)}end.`
      render(<HangingBanner message={long} href="/blog/a" />)

      expect(screen.getByTitle(long.trim())).toBeInTheDocument()
    })

    it("lets long unbroken words wrap instead of overflowing on mobile", () => {
      render(<HangingBanner message={`see ${"x".repeat(200)}`} href="/blog/a" />)

      expect(screen.getByTitle(/^see x+$/).className).toContain(
        "[overflow-wrap:anywhere]"
      )
    })
  })

  describe("links", () => {
    it("keeps internal links in the same tab", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

      expect(getButton()).toHaveAttribute("href", "/blog/medusa-smtp")
      expect(getButton()).not.toHaveAttribute("target")
    })

    it("opens external links in a new tab without leaking the opener", () => {
      render(<HangingBanner message={MESSAGE} href="https://example.com/post" />)

      expect(getButton()).toHaveAttribute("href", "https://example.com/post")
      expect(getButton()).toHaveAttribute("target", "_blank")
      expect(getButton()).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("renders every linked run in the message as its own link", () => {
      render(<HangingBanner message={PARTS} href="/blog/category/mdx" />)

      expect(screen.getByRole("link", { name: "Read" })).toHaveAttribute(
        "href",
        "/blog/category/mdx"
      )
      const external = screen.getByRole("link", {
        name: "Middlesex University, London",
      })
      expect(external).toHaveAttribute("href", "https://www.mdx.ac.uk")
      expect(external).toHaveAttribute("target", "_blank")
      expect(screen.getAllByRole("link")).toHaveLength(3)
    })

    it("keeps message links clickable even when there is no button", () => {
      render(<HangingBanner message={PARTS} />)

      expect(screen.getAllByRole("link")).toHaveLength(2)
      expect(clickFollows(screen.getByRole("link", { name: "Read" }))).toBe(true)
    })

    it("lets every link be clicked", () => {
      render(<HangingBanner message={PARTS} href="https://example.com/post" />)

      for (const link of screen.getAllByRole("link")) {
        expect(clickFollows(link)).toBe(true)
      }
    })

    it("puts the links in the tab order, message links first", () => {
      render(<HangingBanner message={PARTS} href="/blog/category/mdx" />)

      const links = screen.getAllByRole("link")
      expect(links.map(link => link.textContent)).toEqual([
        "Read",
        "Middlesex University, London",
        LABEL,
      ])
      for (const link of links) {
        link.focus()
        expect(link).toHaveFocus()
      }
    })

    it("stops the browser's native link drag so it can't fight the bar", () => {
      render(<HangingBanner message={PARTS} href="/blog/a" />)

      for (const link of screen.getAllByRole("link")) {
        expect(link).toHaveAttribute("draggable", "false")
      }
    })

    it.each([
      ["the button", () => getButton()],
      ["a message link", () => screen.getByRole("link", { name: "Read" })],
    ])("treats a press on %s as a click, never a drag", async (_, getLink) => {
      render(<HangingBanner message={PARTS} href="/blog/category/mdx" />)
      await ready()
      const capture = jest.spyOn(Element.prototype, "setPointerCapture")

      drag(0, 400, { target: getLink() })

      expect(capture).not.toHaveBeenCalled()
      expect(await isDisplaced()).toBe(false)
      expect(push).not.toHaveBeenCalled()
      expect(clickFollows(getLink())).toBe(true)
      capture.mockRestore()
    })

    it("still lets the button be clicked right after dragging the bar", () => {
      render(<HangingBanner message={MESSAGE} href="https://example.com/post" />)

      drag(120, 30)

      expect(clickFollows(getButton())).toBe(true)
    })
  })

  describe("dragging", () => {
    it("moves the bar and shows the grabbing cursor while dragging", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      await ready()

      drag(80, 60, { release: false })
      expect(await isDisplaced()).toBe(true)
      expect(document.body.style.cursor).toBe("grabbing")

      fireEvent.pointerUp(getBar(), { ...mouse, clientX: 480, clientY: 160 })
      expect(document.body.style.cursor).toBe("")
    })

    it("captures the pointer only once the press becomes a drag", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      const capture = jest.spyOn(Element.prototype, "setPointerCapture")

      fireEvent.pointerDown(getBar(), { ...mouse, ...START })
      expect(capture).not.toHaveBeenCalled()

      fireEvent.pointerMove(getBar(), { ...mouse, clientX: 400, clientY: 140 })
      expect(capture).toHaveBeenCalledTimes(1)
      capture.mockRestore()
    })

    it("ignores jitter below the drag threshold", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      await ready()

      fireEvent.pointerDown(getBar(), { ...mouse, ...START })
      fireEvent.pointerMove(getBar(), { ...mouse, clientX: 402, clientY: 102 })

      expect(await isDisplaced()).toBe(false)
      expect(document.body.style.cursor).toBe("")
    })

    it("ignores right and middle mouse buttons", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      await ready()

      for (const button of [1, 2]) {
        fireEvent.pointerDown(getBar(), { ...mouse, button, ...START })
        fireEvent.pointerMove(getBar(), { ...mouse, button, clientX: 400, clientY: 400 })
      }

      expect(await isDisplaced()).toBe(false)
    })

    it("follows only the pointer that started the drag", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      await ready()

      fireEvent.pointerDown(getBar(), { ...mouse, ...START })
      fireEvent.pointerMove(getBar(), { ...mouse, pointerId: 2, clientX: 400, clientY: 600 })
      fireEvent.pointerUp(getBar(), { ...mouse, pointerId: 2, clientX: 400, clientY: 600 })

      expect(await isDisplaced()).toBe(false)
      expect(push).not.toHaveBeenCalled()
    })

    it("works with touch as well as a mouse", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      const touch = { pointerId: 9, pointerType: "touch", buttons: 1 }

      fireEvent.pointerDown(getBar(), { ...touch, ...START })
      fireEvent.pointerMove(getBar(), { ...touch, clientX: 400, clientY: 300 })
      fireEvent.pointerMove(getBar(), { ...touch, clientX: 400, clientY: 520 })
      fireEvent.pointerUp(getBar(), { ...touch, clientX: 400, clientY: 520 })

      await waitFor(() => expect(push).toHaveBeenCalledWith("/blog/a"))
    })

    it("explains the pull while dragging down, then the release", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      drag(0, 120, { release: false })
      expect(getHint()).toHaveTextContent("Keep pulling to open it ↓")

      fireEvent.pointerMove(getBar(), { ...mouse, clientX: 400, clientY: 520 })
      expect(getHint()).toHaveTextContent("Let go to read it")

      // Easing back up clears the hint again.
      fireEvent.pointerMove(getBar(), { ...mouse, clientX: 400, clientY: 105 })
      expect(getHint()).toBeEmptyDOMElement()
    })

    it("shows no pull hints when pushed up", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      drag(0, -300, { release: false })

      expect(getHint()).toBeEmptyDOMElement()
    })

    it("shows no pull hints and opens nothing when there is no link", () => {
      const open = jest.spyOn(window, "open").mockReturnValue(null)
      render(<HangingBanner message={MESSAGE} />)

      drag(0, 500, { release: false })
      expect(getHint()).toBeEmptyDOMElement()

      fireEvent.pointerUp(getBar(), { ...mouse, clientX: 400, clientY: 600 })
      expect(push).not.toHaveBeenCalled()
      expect(open).not.toHaveBeenCalled()
      open.mockRestore()
    })

    it("springs back without navigating on a short or sideways drag", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      drag(160, 40)

      expect(push).not.toHaveBeenCalled()
      expect(getHint()).toBeEmptyDOMElement()
    })

    it("does not open when the drag is cancelled, however far it was pulled", () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      drag(0, 500, { release: false })
      fireEvent.pointerCancel(getBar(), { ...mouse, clientX: 400, clientY: 600 })

      expect(push).not.toHaveBeenCalled()
      expect(getHint()).toBeEmptyDOMElement()
      expect(document.body.style.cursor).toBe("")
    })

    it("forgets a press released off the bar, so hovering doesn't pick it up", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      await ready()
      const capture = jest.spyOn(Element.prototype, "setPointerCapture")

      // Press, then release somewhere else before the drag slop is crossed.
      fireEvent.pointerDown(getBar(), { ...mouse, ...START })
      fireEvent.pointerUp(document.body, { ...mouse, buttons: 0 })
      // Later the mouse just passes over the bar, then below it, no button held.
      fireEvent.pointerMove(getBar(), { ...mouse, buttons: 0, clientX: 420, clientY: 160 })
      fireEvent.pointerMove(getBar(), { ...mouse, buttons: 0, clientX: 420, clientY: 600 })
      // ...and clicks: nothing should open.
      fireEvent.pointerUp(getBar(), { ...mouse, buttons: 0, clientX: 420, clientY: 600 })

      expect(capture).not.toHaveBeenCalled()
      expect(document.body.style.cursor).toBe("")
      expect(await isDisplaced()).toBe(false)
      expect(push).not.toHaveBeenCalled()
      capture.mockRestore()
    })

    it("drops a drag whose button was released without a pointerup", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/a" />)
      await ready()

      drag(0, 300, { release: false })
      expect(getHint()).not.toBeEmptyDOMElement()

      fireEvent.pointerMove(getBar(), { ...mouse, buttons: 0, clientX: 400, clientY: 400 })

      expect(document.body.style.cursor).toBe("")
      expect(getHint()).toBeEmptyDOMElement()
      fireEvent.pointerUp(getBar(), { ...mouse, buttons: 0, clientX: 400, clientY: 400 })
      expect(push).not.toHaveBeenCalled()
    })

    it("resets the cursor if it unmounts mid-drag", () => {
      const { unmount } = render(<HangingBanner message={MESSAGE} href="/blog/a" />)

      drag(0, 80, { release: false })
      expect(document.body.style.cursor).toBe("grabbing")

      unmount()
      expect(document.body.style.cursor).toBe("")
    })
  })

  describe("pull down to open", () => {
    it("exports a threshold that a long pull reaches", () => {
      expect(OPEN_THRESHOLD).toBeGreaterThan(0)
    })

    it("opens an internal post once, in-app", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

      drag(0, 420)
      expect(getHint()).toHaveTextContent("Opening…")

      await waitFor(() => expect(push).toHaveBeenCalledWith("/blog/medusa-smtp"))
      expect(push).toHaveBeenCalledTimes(1)
    })

    it("comes back and works again if opening didn't leave the page", async () => {
      // e.g. a link to a section of the home page: router.push keeps it mounted.
      render(<HangingBanner message={MESSAGE} href="/#about" />)
      await ready()

      drag(0, 420)
      await waitFor(() => expect(push).toHaveBeenCalledWith("/#about"))
      expect(getBar().style.opacity).not.toBe("1")

      await waitFor(() => expect(getBar().style.opacity).toBe("1"), { timeout: 3000 })
      expect(getHint()).toBeEmptyDOMElement()

      drag(0, 420)
      await waitFor(() => expect(push).toHaveBeenCalledTimes(2))
    })

    it("ignores further drags while it is opening", async () => {
      render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

      drag(0, 420)
      drag(0, 420)
      drag(0, 420)

      await waitFor(() => expect(push).toHaveBeenCalled())
      expect(push).toHaveBeenCalledTimes(1)
    })

    it("opens an external post in a new tab, then springs back", async () => {
      const open = jest.spyOn(window, "open").mockReturnValue(null)
      render(<HangingBanner message={MESSAGE} href="https://example.com/post" />)

      drag(0, 420)

      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith(
        "https://example.com/post",
        "_blank",
        "noopener,noreferrer"
      )
      expect(push).not.toHaveBeenCalled()
      expect(getHint()).toHaveTextContent("Opened in a new tab")

      // The confirmation clears itself, and the bar can be used again.
      await waitFor(() => expect(getHint()).toBeEmptyDOMElement(), { timeout: 3000 })
      drag(0, 420)
      expect(open).toHaveBeenCalledTimes(2)
      open.mockRestore()
    })

    it("does not open on a long pull that started on a link", () => {
      const open = jest.spyOn(window, "open").mockReturnValue(null)
      render(<HangingBanner message={MESSAGE} href="https://example.com/post" />)

      drag(0, 500, { target: getButton() })

      expect(open).not.toHaveBeenCalled()
      open.mockRestore()
    })

    it("clears its pending timers on unmount", async () => {
      const open = jest.spyOn(window, "open").mockReturnValue(null)
      const clear = jest.spyOn(window, "clearTimeout")
      const { unmount } = render(
        <HangingBanner message={MESSAGE} href="https://example.com/post" />
      )

      drag(0, 420)
      act(() => unmount())

      expect(clear).toHaveBeenCalled()
      open.mockRestore()
      clear.mockRestore()
    })
  })
})
