import { Article, Engagement, Projects } from "@/data/schema"
import { getBlogUrl } from "@/utils/linkTransforms"

export type RecentItemType = "project" | "article" | "talk"

export interface RecentItem {
  type: RecentItemType
  title: string
  description: string
  meta: string
  href: string
  isExternal: boolean
}

interface TextBlock {
  children?: Array<{ text?: string }>
}

type RichTextOrString = string | readonly object[] | undefined

/** Plain text of Sanity block content (or a string), paragraphs joined by a blank line. */
export const plainText = (value: RichTextOrString): string => {
  if (!value) return ""
  if (typeof value === "string") return value

  return (value as TextBlock[])
    .map(block => (block.children || []).map(child => child.text || "").join(""))
    .filter(Boolean)
    .join("\n\n")
}

/** First sentence of a block of copy, so feed items stay one or two lines. */
export const firstSentence = (value: RichTextOrString): string => {
  const text = plainText(value).replace(/\s+/g, " ").trim()
  const match = text.match(/^.+?[.!?](?=\s|$)/)

  return (match ? match[0] : text).trim()
}

/** A hand-written teaser from Sanity, else the first sentence of the long copy. */
const teaserOr = (teaser: string | undefined, fallback: RichTextOrString) =>
  teaser?.replace(/\s+/g, " ").trim() || firstSentence(fallback)

const byNewest =<T>(getDate: (item: T) => string | undefined) => (a: T, b: T) =>
  new Date(getDate(b) || 0).getTime() - new Date(getDate(a) || 0).getTime()

const formatMonth = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : ""

const tidy = (value?: string) => (value || "").trim().replace(/[.,\s]+$/, "")

const joinMeta = (...parts: Array<string | undefined>) =>
  parts.map(tidy).filter(Boolean).join(" · ")

interface RecentItemsInput {
  projects?: Projects[]
  articles?: Article[]
  engagements?: Engagement[]
}

/**
 * Picks the newest project, article and talk from the homepage document
 * to feed the hero's "Recent" list.
 */
export const getRecentItems = ({
  projects = [],
  articles = [],
  engagements = [],
}: RecentItemsInput): RecentItem[] => {
  const items: RecentItem[] = []

  // A project with no live or GitHub link has nowhere to send the reader
  // (href="" would just reopen the home page), so the newest *linked* one wins.
  const project = projects
    .filter(p => p.url || p.github_url)
    .sort(byNewest<Projects>(p => p.publish_date))[0]

  if (project) {
    const href = (project.url || project.github_url) as string

    items.push({
      type: "project",
      title: tidy(project.name),
      description: teaserOr(project.teaser, project.description),
      meta: joinMeta(...(project.project_tools || []).slice(0, 3)),
      href,
      isExternal: true,
    })
  }

  const article = [...articles]
    .filter(a => !a.is_travel_featured)
    .sort(byNewest<Article>(a => (a as any).publish_date))[0]

  if (article) {
    const isExternal = Boolean(article.is_external && article.url)

    items.push({
      type: "article",
      title: tidy(article.title),
      description: teaserOr(article.seo_summary, article.summary),
      meta: joinMeta(
        formatMonth((article as any).publish_date),
        article.tags?.[0]
      ),
      href: isExternal ? (article.url as string) : getBlogUrl(article.slug),
      isExternal,
    })
  }

  const talk = [...engagements]
    .filter(e => e.type?.includes("talk"))
    // Talks without an event date fall back to when the document was created.
    .sort(byNewest<Engagement>(e => e.event_date || e._createdAt))[0]

  if (talk) {
    items.push({
      type: "talk",
      title: tidy(talk.name),
      description: teaserOr(talk.teaser, talk.summary),
      meta: tidy(talk.event_name),
      href: (talk as any).session_link || talk.event_link || "#engagements",
      isExternal: Boolean((talk as any).session_link || talk.event_link),
    })
  }

  return items
}
