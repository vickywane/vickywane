import React from "react"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { reduxStore } from "@/state"
import PostHog from "@/providers/PostHog"
// import { GlobalStyle } from "@/styles/globalStyles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PostHog>
      <Provider store={reduxStore}>
        <React.Fragment>
          {/*<GlobalStyle />*/}
          <Component {...pageProps} />
        </React.Fragment>
      </Provider>
    </PostHog>
  )
}
