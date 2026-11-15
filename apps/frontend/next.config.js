require("dotenv").config({ quiet: true })
const { withSentryConfig } = require("@sentry/nextjs/config")

/** @type {import("next").NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true,
    loader: "cloudinary",
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    formats: ["image/webp", "image/avif"],
    path: "https://res.cloudinary.com/dkfptto8m/image/upload",
  },
  // Next 16 builds with Turbopack by default: import .svg files as React components
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Same rule for `next dev --webpack` / `next build --webpack`
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}

module.exports = withSentryConfig(nextConfig, {
  org: "victory-engineering",
  project: "portfolio",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  reactComponentAnnotation: {
    enabled: true,
  },
})
