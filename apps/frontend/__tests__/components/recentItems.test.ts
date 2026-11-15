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
          url: "https://p.dev",
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

  it("falls back to the long copy when a teaser is blank", () => {
    const [project] = getRecentItems({
      projects: [
        { name: "P", url: "https://p.dev", teaser: "   ", description: block("First line! Second.") },
      ] as any,
    })

    expect(project.description).toBe("First line!")
  })

  it("skips a newer project that has no link to open", () => {
    const [project] = getRecentItems({
      projects: [
        { name: "Unlinked", publish_date: "2026-01-01" },
        { name: "Repo only", publish_date: "2024-01-01", github_url: "https://github.com/x" },
      ] as any,
    })

    expect(project).toMatchObject({
      title: "Repo only",
      href: "https://github.com/x",
      isExternal: true,
    })
  })

  it("leaves the project slot out when no project has a link", () => {
    const items = getRecentItems({
      projects: [{ name: "Unlinked", url: "", github_url: "" }] as any,
    })

    expect(items).toEqual([])
  })

  it("never puts a travel-featured article in the hero, even if newest", () => {
    const [article] = getRecentItems({
      articles: [
        {
          title: "Trip",
          is_travel_featured: true,
          publish_date: "2026-01-01",
          slug: { current: "trip" },
        },
        { title: "Tech", publish_date: "2020-01-01", slug: { current: "tech" } },
      ] as any,
    })

    expect(article.title).toBe("Tech")
  })

  it("ranks undated items below dated ones", () => {
    const [project] = getRecentItems({
      projects: [
        { name: "Undated", url: "https://a.dev" },
        { name: "Dated", publish_date: "2019-01-01", url: "https://b.dev" },
      ] as any,
    })

    expect(project.title).toBe("Dated")
  })

  it("links a talk to its session, then its event, then the talks section", () => {
    const talkHref = (talk: object) =>
      getRecentItems({
        engagements: [{ name: "T", type: ["talk"], ...talk }] as any,
      })[0]

    expect(
      talkHref({ session_link: "https://s.dev", event_link: "https://e.dev" })
    ).toMatchObject({ href: "https://s.dev", isExternal: true })
    expect(talkHref({ event_link: "https://e.dev" })).toMatchObject({
      href: "https://e.dev",
      isExternal: true,
    })
    expect(talkHref({})).toMatchObject({
      href: "#engagements",
      isExternal: false,
    })
  })

  it("counts an engagement tagged as both podcast and talk as a talk", () => {
    const items = getRecentItems({
      engagements: [{ name: "Both", type: ["podcast", "talk"] }] as any,
    })

    expect(items).toHaveLength(1)
    expect(items[0].type).toBe("talk")
  })

  it("skips empty collections", () => {
    expect(getRecentItems({})).toEqual([])
  })
})
