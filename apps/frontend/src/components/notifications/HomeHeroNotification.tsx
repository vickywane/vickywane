import React from "react"
import { Notification } from "@/data/schema"
import HangingBanner from "@/components/heros/home/HangingBanner"
import {
  cleanHref,
  isSafeHref,
  type MessagePart,
} from "@/components/heros/home/announcement"

export { isSafeHref }

interface HomeHeroNotificationProps {
  notification?: Notification | null
}

type LinkMark = { _key?: string; _type?: string; href?: string }
type Span = { _type?: string; text?: string; marks?: string[] }
type Block = { markDefs?: LinkMark[]; children?: Span[] }

/**
 * This site's own domain: links to it stay in-app instead of a new tab.
 * Comes from NEXT_PUBLIC_DOMAIN (also used by the sitemap).
 */
const siteHost = (domain = process.env.NEXT_PUBLIC_DOMAIN) => {
  try {
    if (domain) return new URL(domain).hostname.replace(/^www\./, "")
  } catch {
    // Not a full URL: fall through to the default.
  }

  return "victory-nwani.dev"
}

const SITE_HOST = siteHost()

export const toSiteHref = (href: string) => {
  try {
    const url = new URL(href)
    if (url.hostname.replace(/^www\./, "") !== SITE_HOST) return href

    return `${url.pathname}${url.search}${url.hash}` || "/"
  } catch {
    return href
  }
}

/**
 * The notification as text runs, keeping its links so they stay clickable in
 * the banner. Blocks are joined into one line.
 */
export const getMessageParts = (
  text: Notification["notification_text"]
): MessagePart[] => {
  const parts: MessagePart[] = []

  // Merge neighbouring runs that share a link (or have none).
  const append = (text: string, href?: string) => {
    const last = parts[parts.length - 1]
    if (last && last.href === href) last.text += text
    else parts.push(href ? { text, href } : { text })
  }

  ;(text ?? []).forEach((value, blockIndex) => {
    const block = value as Block
    const links = new Map(
      (block.markDefs ?? [])
        .filter(mark => mark._type === "link" && mark._key && mark.href)
        .map(mark => [mark._key as string, mark.href as string])
    )

    if (blockIndex > 0 && parts.length) append(" ")

    for (const span of block.children ?? []) {
      const textRun = (span.text ?? "").replace(/\s+/g, " ")
      if (!textRun) continue

      const linked = span.marks?.map(key => links.get(key)).find(Boolean)
      const href =
        linked && isSafeHref(linked) ? toSiteHref(linked.trim()) : undefined
      append(textRun, href)
    }
  })

  const first = parts[0]
  const last = parts[parts.length - 1]
  if (first) first.text = first.text.trimStart()
  if (last) last.text = last.text.trimEnd()

  return parts.filter(part => part.text)
}

/** The Read article button goes to the first link, in reading order. */
export const getNotificationHref = (text: Notification["notification_text"]) =>
  getMessageParts(text).find(part => part.href)?.href

const toTime = (value?: string) => {
  const time = value ? Date.parse(value) : NaN

  return Number.isNaN(time) ? undefined : time
}

/**
 * Whether the notification's schedule includes `now`. Missing or unparseable
 * dates don't restrict it. Note the home page renders at build/request time,
 * so a schedule takes effect on the next render, like any Sanity edit.
 */
export const isScheduledNow = (
  notification?: Notification | null,
  now: number = Date.now()
) => {
  const startsAt = toTime(notification?.starts_at)
  const endsAt = toTime(notification?.ends_at)

  return (startsAt === undefined || now >= startsAt) && (endsAt === undefined || now < endsAt)
}

/** Whether a notification is in its schedule and has visible text. */
export const hasAnnouncement = (
  notification?: Notification | null,
  now: number = Date.now()
) =>
  isScheduledNow(notification, now) &&
  getMessageParts(notification?.notification_text).some(part => part.text.trim())

/**
 * The button's target: the "Button link" field when it is set and safe,
 * otherwise the first link in the text.
 */
export const getButtonHref = (notification?: Notification | null) => {
  const explicit = cleanHref(notification?.cta_url)

  return explicit
    ? toSiteHref(explicit)
    : getNotificationHref(notification?.notification_text)
}

/**
 * The first notification worth showing. References to deleted notifications
 * come back as null, so skip those and any without visible text.
 */
export const pickNotification = (
  notifications?: unknown,
  now: number = Date.now()
) =>
  (Array.isArray(notifications)
    ? (notifications as (Notification | null)[]).find(notification =>
        hasAnnouncement(notification, now)
      )
    : undefined) ?? null

const HomeHeroNotification = ({ notification }: HomeHeroNotificationProps) => {
  if (!notification || !hasAnnouncement(notification)) return null

  return (
    <div className="bg-cream">
      <HangingBanner
        message={getMessageParts(notification.notification_text)}
        href={getButtonHref(notification)}
        linkLabel={notification.cta_label}
        tagLabel={notification.tag_label}
      />
    </div>
  )
}

export default HomeHeroNotification
