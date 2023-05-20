import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { reduxStore } from "@/state";

// import { GlobalStyle } from "@/styles/globalStyles";


export default function App({ Component, pageProps }: AppProps) {
  // const { store, props } = wrapper.useWrappedStore(rest);
  // console.log("app here =>", Component, process.env);

  return (
    <Provider store={reduxStore}>
      <React.Fragment>
        {/*<GlobalStyle />*/}
        <Component {...pageProps} />
      </React.Fragment>
    </Provider>
  );
}
