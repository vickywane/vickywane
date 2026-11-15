import {
  firstSentence,
  getRecentItems,
} from "@/components/heros/home/recentItems"

const block = (text: string) => [
  {
    _key: "a",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: "b", _type: "span", marks: [], text }],
  },
]

describe("firstSentence", () => {
  it("returns the first sentence of rich text", () => {
    expect(firstSentence(block("One thing. Another thing.") as any)).toBe(
      "One thing."
    )
  })

  it("handles plain strings and empty values", () => {
    expect(firstSentence("No full stop here")).toBe("No full stop here")
    expect(firstSentence(undefined)).toBe("")
  })
})

describe("getRecentItems", () => {
  const items = getRecentItems({
    projects: [
      { name: "Old", publish_date: "2020-01-01", url: "https://old.dev" },
      {
        name: "New",
        publish_date: "2025-09-12",
        github_url: "https://github.com/new",
        description: block("Builds tickets. More text."),
        project_tools: ["A", "B", "C", "D"],
      },
    ] as any,
    articles: [
      {
        title: "Internal ",
        publish_date: "2025-01-01T20:45:00.000Z",
        slug: { current: "internal" },
        tags: ["Medusa"],
      },
      {
        title: "External",
        publish_date: "2023-01-01",
        is_external: true,
        url: "https://example.com",
      },
    ] as any,
    engagements: [
      { name: "Podcast", type: ["podcast"], _createdAt: "2025-01-01" },
      {
        name: "Talk",
        type: ["talk"],
        _createdAt: "2024-05-15",
        event_name: "Meetup, London. ",
        session_link: "https://youtube.com/x",
      },
    ] as any,
  })

  it("returns project, article and talk in order", () => {
    expect(items.map(item => item.type)).toEqual(["project", "article", "talk"])
  })

  it("picks the newest project and builds its meta", () => {
    expect(items[0]).toMatchObject({
      title: "New",
      description: "Builds tickets.",
      meta: "A · B · C",
      href: "https://github.com/new",
      isExternal: true,
    })
  })

  it("links internal articles to the blog", () => {
    expect(items[1]).toMatchObject({
      title: "Internal",
      meta: "Jan 2025 · Medusa",
      href: "/blog/internal",
      isExternal: false,
    })
  })

  it("only uses talks for the talk slot", () => {
    expect(items[2]).toMatchObject({
      title: "Talk",
      meta: "Meetup, London",
      href: "https://youtube.com/x",
    })
  })

  it("skips empty collections", () => {
    expect(getRecentItems({})).toEqual([])
  })
})
