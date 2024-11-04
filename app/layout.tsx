import { Suspense } from "react"
import StyledComponentsRegistry from "../src/styles/StyledComponentsRegistry"
import { Space_Grotesk } from "next/font/google"
import PostHog from "@/providers/PostHog"
import StoreProvider from "@/state/StoreProvider"
import "@/styles/globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Metadata, ResolvingMetadata } from "next"
import LazyLoader from "@/framer/LazyLoader"

const font = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "400", "600", "700"],
  style: ["normal"],
})

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Victory Nwani | Home",
  }
}

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={<div>Loading...</div>}>
            <PostHog>
              <LazyLoader>
                <StoreProvider>
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
