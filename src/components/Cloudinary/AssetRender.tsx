import React from "react"
import Image from "next/image"
import { Text } from "@/styles"
import { ImageLoader } from "@/utils/Cloudinary"

const extractNameFromUrl = (url: string): string => {
  const slashes = url.split("/")

  return slashes[slashes.length - 1]
}

const CloudinaryAssetRenderer = ({ value }: any) => {
  switch (value.format) {
    case "mp3":
      return (
        <div style={{ margin: "20px 0" }}>
          <audio style={{ width: "100%" }} controls>
            <source src={value.secure_url} />
          </audio>

          <Text align="center">
            <i> {extractNameFromUrl(value.secure_url)} </i>
          </Text>
        </div>
      )
    case "mp4":
      return (
        <div style={{ margin: "20px 0" }}>
          <video controls width="100%">
            <source src={value.secure_url} type="video/webm" />
          </video>
        </div>
      )
    case "png":
    case "jpeg":
    case "jpg":
      return (
        <div
          style={{
            height: `550px`,
            margin: "26px 0",
            width: "100%",
            position: "relative",
          }}
        >
          <Image
            fill
            style={{ position: "absolute", objectFit: "contain" }}
            loader={ImageLoader}
            alt={value?.title}
            src={value?.public_id}
          />
        </div>
      )

    default:
      return <div />
  }
}

export default CloudinaryAssetRenderer
