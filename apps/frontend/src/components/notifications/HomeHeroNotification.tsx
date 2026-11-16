import React from "react"
import { Notification } from "@/data/schema"
import HangingBanner from "@/components/heros/home/HangingBanner"
import { plainText } from "@/components/heros/home/recentItems"

interface HomeHeroNotificationProps {
  notification?: Notification | null
}

type LinkMark = { _type?: string; href?: string }

/** The banner links to the first link annotated in the notification text. */
export const getNotificationHref = (
  text: Notification["notification_text"]
) => {
  for (const block of text ?? []) {
    const marks = (block as { markDefs?: LinkMark[] }).markDefs ?? []
    const link = marks.find(mark => mark._type === "link" && mark.href)
    if (link?.href) return link.href
  }

  return undefined
}

const HomeHeroNotification = ({ notification }: HomeHeroNotificationProps) => {
  const text = notification?.notification_text
  const message = plainText(text).replace(/\s+/g, " ").trim()

  if (!message) return null

  return (
    <div className="bg-cream">
      <HangingBanner message={message} href={getNotificationHref(text)} />
    </div>
  )
}

export default HomeHeroNotification
