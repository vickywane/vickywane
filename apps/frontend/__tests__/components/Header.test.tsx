import { fireEvent, render, screen, within } from "@testing-library/react"
import Header from "@/components/headers"
import { social_links } from "@/data/static"
import { mockMatchMedia } from "../../test-utils/browserMocks"
import { MENU_TOGGLE_EVENT } from "@/components/headers/menuEvents"

const addSection = (id: string) => {
  const section = document.createElement("section")
  section.id = id
  document.body.appendChild(section)
  return section
}

beforeEach(() => {
  mockMatchMedia([])
})

afterEach(() => {
  document.body.innerHTML = ""
})

const menuButton = () => screen.getByRole("button", { name: /menu/i })

describe("Header", () => {
  it("links the brand to the home page", () => {
    render(<Header />)

    expect(screen.getByRole("link", { name: "Victory Nwani" })).toHaveAttribute(
      "href",
      "/"
    )
  })

  it("shows the contact buttons instead of nav links", () => {
    render(<Header />)

    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      social_links.contact
    )
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      social_links.github
    )
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      social_links.linkedin
    )
  })

  it("opens and closes the mobile menu", () => {
    render(<Header />)

    const button = menuButton()
    const menu = document.getElementById(button.getAttribute("aria-controls")!)!
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(menu).not.toBeVisible()

    fireEvent.click(button)
    expect(menuButton()).toHaveAttribute("aria-expanded", "true")
    expect(menuButton()).toHaveAccessibleName("Close menu")
    expect(menu).toBeVisible()

    fireEvent.click(menuButton())
    expect(menu).not.toBeVisible()
  })

  it("puts the contact links in the mobile menu, under the sections", () => {
    render(<Header />)
    fireEvent.click(menuButton())

    const menu = document.getElementById(
      menuButton().getAttribute("aria-controls")!
    )!
    const links = within(menu).getAllByRole("link")

    expect(links.slice(-3).map(link => link.getAttribute("href"))).toEqual([
      social_links.contact,
      social_links.github,
      social_links.linkedin
    ])
  })

  it("closes the menu on Escape", () => {
    render(<Header />)

    fireEvent.click(menuButton())
    fireEvent.keyDown(window, { key: "Escape" })

    expect(menuButton()).toHaveAttribute("aria-expanded", "false")
  })

  it("lists the home sections, without About, and links them back to Home", () => {
    render(<Header />)
    fireEvent.click(menuButton())

    const nav = screen.getByRole("navigation", { name: "Page sections" })
    const links = within(nav).getAllByRole("link")

    expect(links.map(link => link.textContent)).toEqual([
      "Experience",
      "Projects",
      "Writing",
      "Talks"
    ])
    expect(links[0]).toHaveAttribute("href", "/#experience")
  })

  it("closes the menu when a section link is followed", () => {
    addSection("about")
    const experience = addSection("experience")
    // The menu must already be collapsed when the scroll starts, or the
    // section lands under the header by the menu's height.
    let expandedWhenScrolled: string | null = null
    experience.scrollIntoView = jest.fn(() => {
      expandedWhenScrolled = menuButton().getAttribute("aria-expanded")
    })
    render(<Header />)

    fireEvent.click(menuButton())
    fireEvent.click(screen.getByRole("link", { name: "Experience" }))

    expect(experience.scrollIntoView).toHaveBeenCalled()
    expect(expandedWhenScrolled).toBe("false")
    expect(menuButton()).toHaveAttribute("aria-expanded", "false")
  })

  it("has no caption above the section links", () => {
    render(<Header />)
    fireEvent.click(menuButton())

    expect(screen.queryByText(/on this page/i)).not.toBeInTheDocument()
  })

  it("lets Get in touch fill the menu row beside the icon links", () => {
    render(<Header />)
    fireEvent.click(menuButton())

    const menu = document.getElementById(
      menuButton().getAttribute("aria-controls")!
    )!
    const [contact, github, linkedin] = within(menu).getAllByRole("link").slice(-3)

    expect(contact).toHaveClass("flex-1")
    expect(contact.parentElement).toHaveClass("w-full")
    expect(github).not.toHaveClass("flex-1")
    expect(linkedin).not.toHaveClass("flex-1")
  })

  it("announces each open and close, but not the first render", () => {
    const seen: boolean[] = []
    const listener = (event: Event) =>
      seen.push((event as CustomEvent<{ open: boolean }>).detail.open)
    window.addEventListener(MENU_TOGGLE_EVENT, listener)

    render(<Header />)
    expect(seen).toEqual([])

    fireEvent.click(menuButton())
    fireEvent.keyDown(window, { key: "Escape" })
    expect(seen).toEqual([true, false])

    window.removeEventListener(MENU_TOGGLE_EVENT, listener)
  })

  it("shows a pointer over the menu button", () => {
    render(<Header />)

    expect(menuButton()).toHaveClass("cursor-pointer")
  })

  it("slides the menu open and shut by animating its row", () => {
    render(<Header />)
    const menu = document.getElementById(
      menuButton().getAttribute("aria-controls")!
    )!

    expect(menu).toHaveStyle({ gridTemplateRows: "0fr" })
    expect(menu).toHaveClass("transition-[grid-template-rows,visibility]")

    fireEvent.click(menuButton())
    expect(menu).toHaveStyle({ gridTemplateRows: "1fr" })
    expect(menu).not.toHaveClass("transition-none")
  })

  it("closes without the slide when a section link is followed", () => {
    addSection("experience").scrollIntoView = jest.fn()
    render(<Header />)
    const menu = document.getElementById(
      menuButton().getAttribute("aria-controls")!
    )!

    fireEvent.click(menuButton())
    fireEvent.click(screen.getByRole("link", { name: "Experience" }))
    expect(menu).toHaveClass("transition-none")

    // Opening again slides as usual.
    fireEvent.click(menuButton())
    expect(menu).not.toHaveClass("transition-none")
  })

  it("leaves the border off the last section link", () => {
    render(<Header />)
    fireEvent.click(menuButton())

    const items = within(
      screen.getByRole("navigation", { name: "Page sections" })
    ).getAllByRole("listitem")

    // jsdom applies no CSS, so check the class that removes it.
    expect(items.at(-1)).toHaveClass("last:border-b-0")
  })
})
