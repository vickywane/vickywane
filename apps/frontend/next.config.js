const withOptimizedImage = require("next-optimized-images")
require("dotenv").config()
const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  org: "victory-engineering",
  project: "portfolio",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  images: {
    disableStaticImages: true,
    loader: "cloudinary",
    domains: ["res.cloudinary.com", "cdn.sanity.io"],
    formats: ["image/webp", "image/avif"],
    path: "https://res.cloudinary.com/dkfptto8m/image/upload",
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    })
    return config
  },
  handleImages: ["jpeg", "png", "webp"],
}

module.exports = withSentryConfig(withOptimizedImage(nextConfig), {
  reactComponentAnnotation: {
    enabled: true,
  },
})
