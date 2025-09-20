"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"
import { apiConfig } from "@/config/envApi"

if (typeof window !== "undefined") {
  posthog.init(apiConfig.posthog_key, {
    api_host: apiConfig.posthog_host,
  })
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always", // or 'always' to create profiles for anonymous users as well
      defaults: "2025-05-24",
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
