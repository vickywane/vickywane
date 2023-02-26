const withOptimizedImage = require("next-optimized-images")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    loader: "cloudinary",
    domains: ["res.cloudinary.com"],
    formats: ["image/webp", "image/avif"],
    path: "https://res.cloudinary.com/dkfptto8m/image/upload",
  },
  experimental: {
    appDir: true,
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

module.exports = withOptimizedImage(nextConfig)
