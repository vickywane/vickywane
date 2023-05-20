const withOptimizedImage = require("next-optimized-images");

if (!process.env.SKIP_DOTENV) {
  const dotEnvResult = require("dotenv").config({
    path: `.env.${process.env.CUSTOM_ENV}`
  });

  if (dotEnvResult.error) {
    throw dotEnvResult.error;
  }

} else {
  console.warn("Skipping loading .env file");
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    loader: "cloudinary",
    domains: ["res.cloudinary.com", "cdn.sanity.io"],
    formats: ["image/webp", "image/avif"],
    path: "https://res.cloudinary.com/dkfptto8m/image/upload"
  },
  // experimental: {
  //   appDir: true,
  // },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]"
          }
        }
      ]
    });
    return config;
  },
  handleImages: ["jpeg", "png", "webp"]
};

module.exports = withOptimizedImage(nextConfig);
