import { Notification } from "@/data/schema"
import { plainText } from "@/components/heros/home/recentItems"

export interface NotificationContent {
  message: string
  href?: string
  isExternal: boolean
}

interface LinkMarkDef {
  _type?: string
  href?: string
}

/**
 * Flattens the notification's rich text into the banner's one-line message and
 * pulls out the first link in it, which the whole banner then points to.
 */
export const getNotificationContent = (
  notification?: Notification | null
): NotificationContent | null => {
  const blocks = notification?.notification_text
  if (!blocks?.length) return null

  const message = plainText(blocks as any)
    .replace(/\s+/g, " ")
    .trim()
  if (!message) return null

  const href = blocks
    .flatMap(block => ((block as any).markDefs ?? []) as LinkMarkDef[])
    .find(def => def._type === "link" && def.href)?.href

  return {
    message,
    href,
    isExternal: !!href && /^https?:\/\//.test(href),
  }
}
