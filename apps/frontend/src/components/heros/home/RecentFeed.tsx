import React from "react"
import cn from "classnames"
import ArrowRight from "@/assets/svg/icons/arrow-right-20.svg"
import RecentLink from "./RecentLink"
import { RecentItem } from "./recentItems"

interface RecentFeedProps {
  items: RecentItem[]
  className?: string
}

/** Tablet and desktop: a stacked text list of the latest project, article and talk. */
const RecentFeed = ({ items, className }: RecentFeedProps) => (
  <section aria-labelledby="hero-recent-heading" className={className}>
    <h2 id="hero-recent-heading" className="type-mono pb-6 font-bold text-ink">
      Recent
    </h2>

    <ul>
      {items.map((item, idx) => (
        <li
          key={item.type}
          className={cn(idx === 0 ? "pb-7" : "border-t border-hairline py-7")}
        >
          <RecentLink
            item={item}
            className="group flex items-center gap-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-teal"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="type-mono-caption text-dark-teal">{item.type}</p>
              <h3 className="type-peek-title text-ink transition-colors group-hover:text-dark-teal">
                {item.title}
              </h3>
              {item.description && (
                <p className="type-peek-body line-clamp-2 text-body">
                  {item.description}
                </p>
              )}
              {item.meta && (
                <p className="type-mono-caption text-body">{item.meta}</p>
              )}
            </div>

            <span
              aria-hidden="true"
              className="flex size-[22px] shrink-0 items-center justify-center text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <ArrowRight />
            </span>
          </RecentLink>
        </li>
      ))}
    </ul>
  </section>
)

export default RecentFeed
