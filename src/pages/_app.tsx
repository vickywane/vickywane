import React from "react"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { reduxStore } from "@/state"
import PostHog from "@/providers/PostHog"
import { Space_Grotesk } from "next/font/google"
// import { GlobalStyle } from "@/styles/globalStyles";

const font = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "400", "600", "700"],
  style: ["normal"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PostHog>
      <Provider store={reduxStore}>
        <div className={font.className}>
          <React.Fragment>
            {/*<GlobalStyle />*/}
            <Component {...pageProps} />
          </React.Fragment>
        </div>
      </Provider>
    </PostHog>
  )
}
