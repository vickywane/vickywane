/*
  Announcement helpers shared by the server page (which decides whether a
  banner shows) and the client banner. Keep this file free of "use client"
  and React so both sides can import it.
*/

/** A run of announcement text; runs with an href render as inline links. */
export interface MessagePart {
  text: string
  href?: string
}

export const DEFAULT_LINK_LABEL = "Read article →"
export const DEFAULT_TAG_LABEL = "New"

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

/** A usable href, or undefined for blank and unsafe ones. */
export const cleanHref = (href?: string) =>
  href && isSafeHref(href) ? href.trim() : undefined
