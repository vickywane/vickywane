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

  it("prefers hand-written teasers and event dates from Sanity", () => {
    const [project, article, talk] = getRecentItems({
      projects: [
        {
          name: "P",
          teaser: "  Short   project line. ",
          description: block("Long description. More."),
        },
      ] as any,
      articles: [
        {
          title: "A",
          slug: { current: "a" },
          seo_summary: "SEO line.",
          summary: block("Summary sentence. More."),
        },
      ] as any,
      engagements: [
        { name: "Newer doc", type: ["talk"], _createdAt: "2025-06-01", event_date: "2022-01-01" },
        { name: "Later talk", type: ["talk"], _createdAt: "2021-01-01", event_date: "2024-03-01", teaser: "Talk line." },
      ] as any,
    })

    expect(project.description).toBe("Short project line.")
    expect(article.description).toBe("SEO line.")
    expect(talk).toMatchObject({ title: "Later talk", description: "Talk line." })
  })

  it("skips empty collections", () => {
    expect(getRecentItems({})).toEqual([])
  })
})
