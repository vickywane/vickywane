import { Html, Head, Main, NextScript } from "next/document"
import { GoogleTagManager } from '@next/third-parties/google'

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER

console.log("TAG ID =>", gtmId)

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>

      <GoogleTagManager gtmId={gtmId} />
    </Html>
  )
}
