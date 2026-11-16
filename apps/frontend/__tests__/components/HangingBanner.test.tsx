import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import HangingBanner from "@/components/heros/home/HangingBanner"
import HomeHeroNotification, {
  getMessageParts,
  getNotificationHref,
  toSiteHref,
} from "@/components/notifications/HomeHeroNotification"

const push = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}))

const MESSAGE = "Sending emails in Medusa with medusa-plugin-smtp"

const getBar = () => screen.getByTestId("hanging-banner-bar")

/** Presses the bar, drags it by (dx, dy) in steps, and optionally lets go. */
const drag = (dx: number, dy: number, release = true) => {
  const bar = getBar()
  const start = { clientX: 400, clientY: 100 }
  const pointer = { pointerId: 1, pointerType: "mouse", button: 0 }

  fireEvent.pointerDown(bar, { ...pointer, ...start })
  for (let step = 1; step <= 5; step++) {
    fireEvent.pointerMove(bar, {
      ...pointer,
      clientX: start.clientX + (dx * step) / 5,
      clientY: start.clientY + (dy * step) / 5,
    })
  }
  if (release) {
    fireEvent.pointerUp(bar, {
      ...pointer,
      clientX: start.clientX + dx,
      clientY: start.clientY + dy,
    })
  }
}

describe("HangingBanner", () => {
  it("shows the NEW tag and message, with Read article as the link", () => {
    render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

    const link = screen.getByRole("link")
    expect(link).toHaveAccessibleName("Read article →")
    expect(link).toHaveAttribute("href", "/blog/medusa-smtp")
    expect(link).toHaveAttribute("draggable", "false")
    expect(getBar()).toHaveTextContent("New")
    expect(getBar()).toHaveTextContent(MESSAGE)
  })

  it("keeps links inside the announcement clickable", () => {
    render(
      <HangingBanner
        message={[
          { text: "Read my " },
          { text: "lab notes", href: "/blog/lab-notes" },
          { text: " from London" },
        ]}
        href="/blog/lab-notes"
      />
    )

    const inline = screen.getByRole("link", { name: "lab notes" })
    expect(inline).toHaveAttribute("href", "/blog/lab-notes")
    expect(getBar()).toHaveTextContent("Read my lab notes from London")
  })

  it("lets a press on a link click through instead of starting a drag", () => {
    render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)
    const button = screen.getByRole("link", { name: "Read article →" })
    const capture = jest.spyOn(Element.prototype, "setPointerCapture")

    fireEvent.pointerDown(button, { pointerId: 1, clientX: 10, clientY: 10 })
    fireEvent.pointerMove(getBar(), { pointerId: 1, clientX: 10, clientY: 300 })
    fireEvent.pointerUp(getBar(), { pointerId: 1, clientX: 10, clientY: 300 })

    expect(capture).not.toHaveBeenCalled()
    expect(getBar().style.transform).not.toContain("translateY")
    expect(push).not.toHaveBeenCalled()
    const click = new MouseEvent("click", { bubbles: true, cancelable: true })
    button.dispatchEvent(click)
    // Only Next's Link handler may cancel it (to route client-side).
    expect(screen.queryByText("Opening…")).not.toBeInTheDocument()
    capture.mockRestore()
  })

  it("opens external links in a new tab", () => {
    render(<HangingBanner message={MESSAGE} href="https://example.com/post" />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("drops the link and the Read article button when there is no href", () => {
    render(<HangingBanner message={MESSAGE} />)

    expect(screen.queryByRole("link")).not.toBeInTheDocument()
    expect(screen.queryByText("Read article →")).not.toBeInTheDocument()
    expect(screen.getByText(MESSAGE)).toBeInTheDocument()
  })

  it("explains the pull while dragging down, then the release", () => {
    render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

    drag(0, 120, false)
    expect(screen.getByText("Keep pulling to open it ↓")).toBeInTheDocument()

    fireEvent.pointerMove(getBar(), { pointerId: 1, clientX: 400, clientY: 520 })
    expect(screen.getByText("Let go to read it")).toBeInTheDocument()
  })

  it("navigates to the post on a long pull down", async () => {
    render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

    drag(0, 420)

    expect(screen.getByText("Opening…")).toBeInTheDocument()
    await waitFor(() => expect(push).toHaveBeenCalledWith("/blog/medusa-smtp"))
  })

  it("opens external posts in a new tab on a long pull down", () => {
    const open = jest.spyOn(window, "open").mockReturnValue(null)
    render(<HangingBanner message={MESSAGE} href="https://example.com/post" />)

    drag(0, 420)

    expect(open).toHaveBeenCalledWith(
      "https://example.com/post",
      "_blank",
      "noopener,noreferrer"
    )
    expect(screen.getByText("Opened in a new tab")).toBeInTheDocument()
    open.mockRestore()
  })

  it("springs back without navigating on a short or sideways drag", () => {
    render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

    drag(160, 40)

    expect(push).not.toHaveBeenCalled()
    expect(screen.queryByText("Opening…")).not.toBeInTheDocument()
  })

  it("still follows the link on a plain click", () => {
    render(<HangingBanner message={MESSAGE} href="/blog/medusa-smtp" />)

    fireEvent.pointerDown(getBar(), { pointerId: 1, clientX: 10, clientY: 10 })
    fireEvent.pointerUp(getBar(), { pointerId: 1, clientX: 11, clientY: 10 })

    const link = screen.getByRole("link")
    const click = new MouseEvent("click", { bubbles: true, cancelable: true })
    link.dispatchEvent(click)
    expect(click.defaultPrevented).toBe(false)
  })
})

describe("HomeHeroNotification", () => {
  const block = (text: string, href?: string) => ({
    _key: text,
    _type: "block",
    style: "normal",
    markDefs: href ? [{ _key: "l1", _type: "link", href }] : [],
    children: [
      { _key: `${text}-s`, _type: "span", marks: href ? ["l1"] : [], text },
    ],
  })

  it("takes the href from the first link in the notification text", () => {
    expect(
      getNotificationHref([
        block("Intro"),
        block("Read", "/blog/one"),
        block("More", "/blog/two"),
      ] as any)
    ).toBe("/blog/one")
    expect(getNotificationHref(undefined)).toBeUndefined()
  })

  it("points the button at the first link in reading order", () => {
    // Sanity lists markDefs in the order they were added, not text order.
    const text = [
      {
        _key: "b1",
        _type: "block",
        markDefs: [
          { _key: "uni", _type: "link", href: "https://www.mdx.ac.uk" },
          {
            _key: "post",
            _type: "link",
            href: "https://victory-nwani.dev/blog/category/mdx",
          },
        ],
        children: [
          { _key: "s1", _type: "span", marks: ["post"], text: "Read" },
          { _key: "s2", _type: "span", marks: [], text: " my notes from " },
          { _key: "s3", _type: "span", marks: ["uni"], text: "Middlesex" },
        ],
      },
    ]

    expect(getNotificationHref(text as any)).toBe("/blog/category/mdx")
  })

  it("keeps links to this site in-app and leaves others alone", () => {
    expect(toSiteHref("https://www.victory-nwani.dev/blog/a?x=1#h")).toBe(
      "/blog/a?x=1#h"
    )
    expect(toSiteHref("https://www.mdx.ac.uk")).toBe("https://www.mdx.ac.uk")
    expect(toSiteHref("/blog/a")).toBe("/blog/a")
  })

  it("keeps the notification's links as clickable runs", () => {
    const text = [
      {
        _key: "b1",
        _type: "block",
        markDefs: [{ _key: "l1", _type: "link", href: "/blog/lab" }],
        children: [
          { _key: "s1", _type: "span", marks: [], text: "Read my " },
          { _key: "s2", _type: "span", marks: ["l1"], text: "lab notes" },
          { _key: "s3", _type: "span", marks: [], text: " now!  " },
        ],
      },
    ]

    expect(getMessageParts(text as any)).toEqual([
      { text: "Read my " },
      { text: "lab notes", href: "/blog/lab" },
      { text: " now!" },
    ])
  })

  it("renders the notification text as the banner message", () => {
    render(
      <HomeHeroNotification
        notification={{ notification_text: [block(MESSAGE, "/blog/m")] } as any}
      />
    )

    expect(
      screen.getByRole("link", { name: "Read article →" })
    ).toHaveAttribute("href", "/blog/m")
    expect(screen.getByRole("link", { name: MESSAGE })).toHaveAttribute(
      "href",
      "/blog/m"
    )
    expect(screen.getByText(MESSAGE)).toBeInTheDocument()
  })

  it("renders nothing without notification text", () => {
    const { container } = render(<HomeHeroNotification notification={null} />)

    expect(container).toBeEmptyDOMElement()
  })
})
