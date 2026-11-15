import React from "react"
import cn from "classnames"
import { Notification } from "@/data/schema"
import { getNotificationContent } from "./notificationContent"

interface HomeHeroNotificationProps {
  notification?: Notification | null
}

/** A nail and string that "hang" the banner from the header above it. */
const Hanger = ({ className }: { className: string }) => (
  <span
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute bottom-full flex h-5 w-2 flex-col items-center md:h-6",
      className
    )}
  >
    <span className="size-2 shrink-0 rounded-full bg-ink" />
    <span className="-mt-1 w-px flex-1 bg-ink" />
  </span>
)

/**
 * Hanging notification banner under the header. On mobile the "Read it" button
 * drops below the message; from tablet up it sits at the end of one row.
 */
const HomeHeroNotification = ({ notification }: HomeHeroNotificationProps) => {
  const content = getNotificationContent(notification)
  if (!content) return null

  const { message, href, isExternal } = content

  const body = (
    <>
      <span className="flex items-center gap-2.5 md:gap-3">
        <span className="shrink-0 bg-ink px-[7px] py-[3px] font-code text-[11px] font-bold uppercase leading-[1.4] tracking-[0.1em] text-white">
          New
        </span>
        <span className="font-display text-sm leading-[18px] font-medium tracking-[0.01em] text-ink md:text-base md:leading-5">
          {message}
        </span>
      </span>

      {href && (
        <span className="flex shrink-0 items-center justify-center bg-ink px-3.5 py-2 font-code text-[13px] font-bold uppercase leading-[1.4] tracking-[0.06em] whitespace-nowrap text-white">
          Read it <span aria-hidden="true">&nbsp;→</span>
        </span>
      )}
    </>
  )

  const barClass =
    "flex flex-col gap-2.5 border border-ink bg-white p-2.5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-1.5 md:pr-1.5 md:pl-2.5"

  return (
    <aside aria-label="Latest update" className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 pt-4 md:px-12 md:pt-5 lg:px-16 xl:px-[120px]">
        <div className="relative">
          <Hanger className="left-5 md:left-11" />
          <Hanger className="right-5 md:right-11" />

          {href ? (
            <a
              href={href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                barClass,
                "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-teal"
              )}
            >
              {body}
            </a>
          ) : (
            <div className={barClass}>{body}</div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default HomeHeroNotification
