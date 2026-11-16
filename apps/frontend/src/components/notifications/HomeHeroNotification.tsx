import React from "react"
import { Notification } from "@/data/schema"
import HangingBanner, {
  type MessagePart,
} from "@/components/heros/home/HangingBanner"

interface HomeHeroNotificationProps {
  notification?: Notification | null
}

type LinkMark = { _key?: string; _type?: string; href?: string }
type Span = { _type?: string; text?: string; marks?: string[] }
type Block = { markDefs?: LinkMark[]; children?: Span[] }

/** This site's own domain: links to it stay in-app instead of a new tab. */
const SITE_HOST = "victory-nwani.dev"

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
 * Only web, mail and phone links (or paths on this site) become clickable.
 * Anything else, such as a `javascript:` URL typed into Sanity, renders as
 * plain text.
 */
export const isSafeHref = (href: string) => {
  const value = href.trim()
  if (/^[/?#]/.test(value) && !value.startsWith("//")) return true

  return /^(https?:|mailto:|tel:)/i.test(value)
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

const HomeHeroNotification = ({ notification }: HomeHeroNotificationProps) => {
  const text = notification?.notification_text
  const message = getMessageParts(text)

  if (!message.length) return null

  return (
    <div className="bg-cream">
      <HangingBanner message={message} href={getNotificationHref(text)} />
    </div>
  )
}

export default HomeHeroNotification
