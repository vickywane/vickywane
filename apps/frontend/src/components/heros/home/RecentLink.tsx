import React from "react"
import Link from "next/link"
import { RecentItem } from "./recentItems"

interface RecentLinkProps {
  item: RecentItem
  className?: string
  children: React.ReactNode
}

/** Opens external work in a new tab and keeps blog posts in-app. */
const RecentLink = ({ item, className, children }: RecentLinkProps) => {
  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  )
}

export default RecentLink
