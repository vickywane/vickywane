"use client"

import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { apiConfig } from "@/config/envApi"

if (typeof window !== "undefined") {
  posthog.init(apiConfig.posthog_key, {
    api_host: apiConfig.posthog_host,
    // Enable debug mode in development
    loaded: posthog => {
      if (process.env.NODE_ENV === "development") posthog.debug()
    },
  })
}

export default function PostHog({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    let url = window.origin + pathname
    if (searchParams.toString()) {
      // Track page views
      const handleRouteChange = () =>
        posthog?.capture("$pageview", {
          $current_url: url,
        })

      router.events.on("routeChangeComplete", handleRouteChange)

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange)
      }
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
