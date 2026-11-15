import { act, fireEvent, render, screen } from "@testing-library/react"
import HeroPortrait from "@/components/heros/home/HeroPortrait"

const ALT = "Portrait of Victory Nwani, a software engineer."

const setViewport = (width: number, height: number) => {
  Object.defineProperty(document.documentElement, "clientWidth", {
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: height,
  })
}

const setup = () => {
  render(<HeroPortrait src="/portrait.jpg" alt={ALT} />)

  return {
    portrait: screen.getByRole("button", { name: /portrait/i }),
    chip: screen.getByRole("button", { name: "Show image description" }),
    image: screen.getByRole("img", { name: ALT }),
  }
}

/** Opens the ALT popover with the chip at `chipRect` and the popover `height` tall. */
const openAlt = (chip: HTMLElement, chipRect: Partial<DOMRect>, height = 120) => {
  chip.getBoundingClientRect = () => chipRect as DOMRect
  const offsetHeight = jest
    .spyOn(HTMLElement.prototype, "offsetHeight", "get")
    .mockReturnValue(height)

  act(() => {
    fireEvent.click(chip)
  })
  offsetHeight.mockRestore()

  return screen.getByRole("dialog", { name: "Alt text" })
}

beforeEach(() => {
  setViewport(1440, 900)
})

describe("HeroPortrait", () => {
  describe("enlarging", () => {
    it("toggles between thumbnail and enlarged on click", () => {
      const { portrait } = setup()

      expect(portrait).toHaveAttribute("aria-expanded", "false")
      expect(portrait).toHaveAccessibleName("Enlarge portrait")

      fireEvent.click(portrait)

      expect(portrait).toHaveAttribute("aria-expanded", "true")
      expect(portrait).toHaveAccessibleName("Reduce portrait")
    })

    it("shows no 'Click to reduce' label when enlarged", () => {
      const { portrait } = setup()

      fireEvent.click(portrait)

      expect(screen.queryByText(/click to reduce/i)).toBeNull()
    })

    it("keeps the photo grayscale in every state", () => {
      const { portrait, image } = setup()

      expect(image).toHaveClass("grayscale")
      fireEvent.click(portrait)
      expect(image).toHaveClass("grayscale")
      expect(image.className).not.toMatch(/grayscale-0/)
    })

    it("reduces on Escape", () => {
      const { portrait } = setup()
      fireEvent.click(portrait)

      fireEvent.keyDown(document, { key: "Escape" })

      expect(portrait).toHaveAttribute("aria-expanded", "false")
    })
  })

  describe("ALT popover", () => {
    it("shows the image's alt text", () => {
      const { chip } = setup()

      const dialog = openAlt(chip, { left: 200, top: 300, bottom: 320 })

      expect(chip).toHaveAttribute("aria-expanded", "true")
      expect(dialog).toHaveTextContent(ALT)
    })

    it("closes on Escape before reducing an enlarged portrait", () => {
      const { portrait, chip } = setup()
      fireEvent.click(portrait)
      openAlt(chip, { left: 200, top: 300, bottom: 320 })

      fireEvent.keyDown(document, { key: "Escape" })

      expect(screen.queryByRole("dialog")).toBeNull()
      expect(portrait).toHaveAttribute("aria-expanded", "true")
      expect(chip).toHaveFocus()

      fireEvent.keyDown(document, { key: "Escape" })

      expect(portrait).toHaveAttribute("aria-expanded", "false")
    })

    it("closes on an outside click but not on a click inside it", () => {
      const { chip } = setup()
      const dialog = openAlt(chip, { left: 200, top: 300, bottom: 320 })

      fireEvent.pointerDown(dialog)
      expect(screen.getByRole("dialog")).toBeInTheDocument()

      fireEvent.pointerDown(document.body)
      expect(screen.queryByRole("dialog")).toBeNull()
    })

    it("returns focus to the chip when closed with the × button", () => {
      const { chip } = setup()
      openAlt(chip, { left: 200, top: 300, bottom: 320 })

      fireEvent.click(screen.getByRole("button", { name: "Close" }))

      expect(screen.queryByRole("dialog")).toBeNull()
      expect(chip).toHaveFocus()
    })
  })

  // The popover is positioned in JS from the viewport size, so this is the
  // part of the hero's responsive behaviour that can be checked without a browser.
  describe("ALT popover position", () => {
    it("spans the content width on mobile", () => {
      setViewport(375, 812)
      const { chip } = setup()

      const dialog = openAlt(chip, { left: 90, top: 140, bottom: 158 })

      expect(dialog.style.left).toBe("24px")
      expect(dialog.style.width).toBe("327px") // 375 - 2 * 24 gutter
      expect(dialog.style.top).toBe("166px") // 8px below the chip
    })

    it("treats 767px as mobile and 768px as tablet", () => {
      setViewport(767, 1024)
      const mobile = setup()
      expect(openAlt(mobile.chip, { left: 90, top: 140, bottom: 158 }).style.width).toBe("719px")
      fireEvent.click(screen.getByRole("button", { name: "Close" }))
      document.body.innerHTML = ""

      setViewport(768, 1024)
      const tablet = setup()
      expect(openAlt(tablet.chip, { left: 90, top: 140, bottom: 158 }).style.width).toBe("304px")
    })

    it("anchors a fixed-width popover to the chip on desktop", () => {
      const { chip } = setup()

      const dialog = openAlt(chip, { left: 200, top: 300, bottom: 320 })

      expect(dialog.style.left).toBe("200px")
      expect(dialog.style.width).toBe("304px")
      expect(dialog.style.top).toBe("328px")
    })

    it("keeps the popover inside the viewport when the chip is near the right edge", () => {
      setViewport(1024, 800)
      const { chip } = setup()

      const dialog = openAlt(chip, { left: 900, top: 300, bottom: 320 })

      expect(dialog.style.left).toBe(`${1024 - 24 - 304}px`)
    })

    it("flips above the chip when there is no room below", () => {
      setViewport(1440, 600)
      const { chip } = setup()

      const dialog = openAlt(chip, { left: 200, top: 500, bottom: 520 }, 150)

      expect(dialog.style.top).toBe(`${500 - 8 - 150}px`)
    })

    it("stays below when there is no room above either", () => {
      setViewport(1440, 300)
      const { chip } = setup()

      const dialog = openAlt(chip, { left: 200, top: 100, bottom: 120 }, 250)

      expect(dialog.style.top).toBe("128px")
    })
  })
})
