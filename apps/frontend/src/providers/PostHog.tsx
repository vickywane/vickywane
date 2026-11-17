"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { apiConfig } from "@/config/envApi"

// Init once, on the client, before the first render so early `capture`
// calls are not dropped. posthog-js ignores a second `init`, so this is the
// only config that ever applied.
if (typeof window !== "undefined") {
  posthog.init(apiConfig.posthog_key, {
    api_host: apiConfig.posthog_host,
  })
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
