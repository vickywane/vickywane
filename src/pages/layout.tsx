import StyledComponentsRegistry from "@/styles/StyledComponentsRegistry"

// import { GoogleTagManager } from '@next/third-parties/google'
// const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ background: "green" }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

{
  /* <GoogleTagManager gtmId={gtmId} /> */
}
