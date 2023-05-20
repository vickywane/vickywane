import { ImageLoaderProps } from "next/image";

export const ImageLoader = ({ src, width }: ImageLoaderProps) => {
  const origin = "https://res.cloudinary.com/dkfptto8m/image/upload"

  return `${origin}/w_${width}/${src}`
}