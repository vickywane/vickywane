import { Suspense } from "react"
import StyledComponentsRegistry from "../src/styles/StyledComponentsRegistry"
import { Roboto_Flex, Roboto_Mono, Space_Grotesk } from "next/font/google"
import PostHog from "@/providers/PostHog"
import StoreProvider from "@/state/StoreProvider"
import "@/styles/globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Metadata, ResolvingMetadata } from "next"
import LazyLoader from "@/framer/LazyLoader"
import PostHogProvider from "@/providers/PostHog"
import * as Sentry from "@sentry/nextjs"

const font = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-space-grotesk",
})

// Used by the v2 `type-body` / `type-mono` utilities (see globals.css).
// Exposed as variables only, so existing text keeps its current font.
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex-loaded",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
})

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Victory Nwani | Home",
    other: {
      ...Sentry.getTraceData(),
    },
  }
}

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${font.variable} ${robotoFlex.variable} ${robotoMono.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={<div>Loading...</div>}>
            <PostHog>
              <LazyLoader>
                <StoreProvider>
                  <PostHogProvider>
                    <div
                      style={{
                        height: "100vh",
                        overflow: "auto",
                        width: "100%",
                      }}
                      className={font.className}
                    >
                      {children}
                    </div>
                  </PostHogProvider>
                </StoreProvider>
              </LazyLoader>
            </PostHog>
          </Suspense>
        </StyledComponentsRegistry>
      </body>

      {gtmId && <GoogleAnalytics gaId={gtmId} />}
    </html>
  )
}
