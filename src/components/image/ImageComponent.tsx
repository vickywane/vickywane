import React from "react"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import styled from "styled-components"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

const ImageContainer = styled.div<{ isFullScreen: boolean }>`
  height: ${props => (props.isFullScreen ? "100%" : "550px")};
  margin: 26px 0;
  width: 100%;
  position: relative;

  &:hover {
    cursor: ${props => (props.isFullScreen ? "zoom-out" : "zoom-in")};
  }
`

interface ImageComponentProps {
  title: string
  public_id: string
}

const ImageComponent = ({ title, public_id }: ImageComponentProps) => {
  const handle = useFullScreenHandle()

  const toggleFullScreenView = () => {
    if (!handle.active) {
      return handle.enter()
    }

    handle.exit()
  }

  return (
    <FullScreen handle={handle}>
      <ImageContainer
        isFullScreen={handle.active}
        onClick={toggleFullScreenView}
      >
        <Image
          fill
          style={{ position: "absolute", objectFit: "contain" }}
          loader={ImageLoader}
          alt={title}
          src={public_id}
        />
      </ImageContainer>
    </FullScreen>
  )
}

export default ImageComponent
