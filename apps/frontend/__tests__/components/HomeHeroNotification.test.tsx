import { render, screen } from "@testing-library/react"
import HomeHeroNotification, {
  getMessageParts,
  getNotificationHref,
  isSafeHref,
  toSiteHref,
} from "@/components/notifications/HomeHeroNotification"

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

type Span = [text: string, linkKey?: string, ...otherMarks: string[]]

let keySeed = 0
/** A Sanity block: spans as [text, linkKey?], links as { key: href }. */
const block = (spans: Span[], links: Record<string, string | undefined> = {}) => ({
  _key: `b${keySeed++}`,
  _type: "block",
  style: "normal",
  markDefs: Object.entries(links).map(([key, href]) => ({
    _key: key,
    _type: "link",
    href,
  })),
  children: spans.map(([text, link, ...other]) => ({
    _key: `s${keySeed++}`,
    _type: "span",
    marks: [...other, ...(link ? [link] : [])],
    text,
  })),
})

// The live notification: link annotations were added in the opposite order
// to how they read.
const LIVE = [
  block(
    [
      ["Read", "post"],
      [" my lab notes on Digital Media Engineering from "],
      ["Middlesex University, London", "uni"],
      ["!"],
    ],
    {
      uni: "https://www.mdx.ac.uk",
      post: "https://victory-nwani.dev/blog/category/middlesex-digital-media-engineering",
    }
  ),
]

const renderNotification = (text: unknown) =>
  render(<HomeHeroNotification notification={{ notification_text: text } as any} />)

describe("getMessageParts", () => {
  it("splits the live notification into plain and linked runs", () => {
    expect(getMessageParts(LIVE as any)).toEqual([
      { text: "Read", href: "/blog/category/middlesex-digital-media-engineering" },
      { text: " my lab notes on Digital Media Engineering from " },
      { text: "Middlesex University, London", href: "https://www.mdx.ac.uk" },
      { text: "!" },
    ])
  })

  it("returns nothing for missing or empty text", () => {
    expect(getMessageParts(undefined)).toEqual([])
    expect(getMessageParts([] as any)).toEqual([])
    expect(getMessageParts([block([["   "]])] as any)).toEqual([])
    expect(getMessageParts([{ _type: "block" }] as any)).toEqual([])
  })

  it("joins several blocks into one line with a single space", () => {
    expect(getMessageParts([block([["First."]]), block([["Second."]])] as any)).toEqual([
      { text: "First. Second." },
    ])
  })

  it("collapses runs of whitespace and newlines, and trims the ends", () => {
    expect(getMessageParts([block([["  Hello\n\n   there  "]])] as any)).toEqual([
      { text: "Hello there" },
    ])
  })

  it("merges neighbouring spans that share a link (e.g. bold inside a link)", () => {
    const text = [
      block([["Read ", "l"], ["this", "l", "strong"], [" now"]], { l: "/blog/a" }),
    ]

    expect(getMessageParts(text as any)).toEqual([
      { text: "Read this", href: "/blog/a" },
      { text: " now" },
    ])
  })

  it("keeps the text of non-link marks such as bold and italics", () => {
    const text = [block([["Plain "], ["bold", undefined, "strong"], [" end"]])]

    expect(getMessageParts(text as any)).toEqual([{ text: "Plain bold end" }])
  })

  it("treats a link annotation without an href as plain text", () => {
    const text = [block([["Broken", "l"]], { l: undefined })]

    expect(getMessageParts(text as any)).toEqual([{ text: "Broken" }])
  })

  it("never turns an unsafe URL into a link", () => {
    const text = [
      block([["click me", "x"], [" or "], ["data", "d"]], {
        x: "javascript:alert(1)",
        d: "data:text/html,<script>alert(1)</script>",
      }),
    ]

    const parts = getMessageParts(text as any)
    expect(parts.every(part => !part.href)).toBe(true)
    expect(parts.map(part => part.text).join("")).toBe("click me or data")
  })

  it("keeps a link that only differs from its neighbour by its target", () => {
    const text = [block([["One", "a"], ["Two", "b"]], { a: "/blog/one", b: "/blog/two" })]

    expect(getMessageParts(text as any)).toEqual([
      { text: "One", href: "/blog/one" },
      { text: "Two", href: "/blog/two" },
    ])
  })
})

describe("getNotificationHref", () => {
  it("uses the first link in reading order, not annotation order", () => {
    expect(getNotificationHref(LIVE as any)).toBe(
      "/blog/category/middlesex-digital-media-engineering"
    )
  })

  it("looks past blocks without links", () => {
    const text = [block([["Intro."]]), block([["Read", "l"]], { l: "/blog/one" })]

    expect(getNotificationHref(text as any)).toBe("/blog/one")
  })

  it("is undefined when nothing safe is linked", () => {
    expect(getNotificationHref(undefined)).toBeUndefined()
    expect(getNotificationHref([block([["No links"]])] as any)).toBeUndefined()
    expect(
      getNotificationHref([block([["x", "l"]], { l: "javascript:void(0)" })] as any)
    ).toBeUndefined()
  })
})

describe("toSiteHref", () => {
  it.each([
    ["https://victory-nwani.dev/blog/a", "/blog/a"],
    ["https://www.victory-nwani.dev/blog/a?x=1#h", "/blog/a?x=1#h"],
    ["https://victory-nwani.dev", "/"],
    ["https://www.mdx.ac.uk", "https://www.mdx.ac.uk"],
    ["https://victory-nwani.dev.evil.com/x", "https://victory-nwani.dev.evil.com/x"],
    ["/blog/a", "/blog/a"],
    ["mailto:hi@example.com", "mailto:hi@example.com"],
  ])("maps %s to %s", (input, expected) => {
    expect(toSiteHref(input)).toBe(expected)
  })
})

describe("isSafeHref", () => {
  it.each([
    ["/blog/a", true],
    ["#about", true],
    ["?ref=banner", true],
    ["https://example.com", true],
    ["HTTP://EXAMPLE.COM", true],
    ["mailto:hi@example.com", true],
    ["tel:+441234", true],
    ["  /padded", true],
    ["javascript:alert(1)", false],
    [" JavaScript:alert(1)", false],
    ["data:text/html,hi", false],
    ["vbscript:msgbox(1)", false],
    ["//evil.example/path", false],
    ["", false],
  ])("%j is %s", (href, safe) => {
    expect(isSafeHref(href)).toBe(safe)
  })
})

describe("HomeHeroNotification", () => {
  it("renders the live notification with every link clickable", () => {
    renderNotification(LIVE)

    expect(screen.getByRole("link", { name: "Read article →" })).toHaveAttribute(
      "href",
      "/blog/category/middlesex-digital-media-engineering"
    )
    expect(screen.getByRole("link", { name: "Read" })).toHaveAttribute(
      "href",
      "/blog/category/middlesex-digital-media-engineering"
    )
    expect(
      screen.getByRole("link", { name: "Middlesex University, London" })
    ).toHaveAttribute("target", "_blank")
    expect(screen.getByText("New")).toBeVisible()
  })

  it("shows the message without a button when nothing is linked", () => {
    renderNotification([block([["Just saying hello."]])])

    expect(screen.getByText("Just saying hello.")).toBeVisible()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })

  it("renders an unsafe link as plain text and gives it no button", () => {
    renderNotification([block([["Click", "x"]], { x: "javascript:alert(1)" })])

    expect(screen.getByText("Click")).toBeVisible()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })

  it.each([
    ["no notification", null],
    ["no text", undefined],
    ["an empty text array", []],
    ["only whitespace", [block([["  \n "]])]],
  ])("renders nothing for %s", (_, text) => {
    const { container } =
      text === null
        ? render(<HomeHeroNotification notification={null} />)
        : renderNotification(text)

    expect(container).toBeEmptyDOMElement()
  })
})
