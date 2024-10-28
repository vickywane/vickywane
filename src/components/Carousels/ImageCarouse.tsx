import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Flex, Text } from "@/styles"
import { LiaInfoSolid } from "react-icons/lia"

const Container = styled.ul`
  height: 100%;
  width: 100%;
`

export interface StyledProps {
  active: any
  idx: any
  top: any
}

const Item = styled.div<StyledProps>`
  height: ${props =>
    props.stack === 1 ? "250px" : props.stack === 4 ? "250px" : "200px"};
  width: 220px;

  list-style: none;
  -webkit-transform-style: preserve-3d;
  transition: all 0.4s ease;
  right: ${props => props.idx};
  top: ${props => props.top};
  transform: scale(1);

  img {
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    width: 100%;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: ${props =>
      props.stack === 1 ? "165px" : props.stack === 4 ? "165px" : "130px"};

    width: 100%;

    &:hover {
      transform: scale(1);
      cursor: pointer;
    }
  }
`

const AltContainer = styled(Flex)<{ active: boolean }>`
  position: absolute;
  bottom: 0;
  height: ${props => (props.active ? "auto" : "30px")};
  width: ${props => (props.active ? "100%" : "auto")};
  padding: 0 12px;
  z-index: 5;
  background-color: #131112;
  justify-content: center;
  place-items: center;
  opacity: 0.87;
  transition: all 3500ms;

  p {
    font-size: 12px;
    line-height: 25px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    height: ${props => (props.active ? "auto" : "20px")};
    padding: 0 4px;

    p {
      font-size: 10px;
    }
  }
`

const CustomImage = styled(Image)<{ blur: boolean }>`
  transition: filter 0.3s ease-in;
  height: 100%;
  width: 100%;
  background-color: inherit; 
`

const ImageCarousel = ({ images }: { images: any }) => {
  const [isImageLoading, setImageLoading] = useState(false)
  const [isShowingAlt, showAlt] = useState(false)

  return (
    <Container>
      <ResponsiveMasonry
        style={{ width: "100%" }}
        columnsCountBreakPoints={{ 750: 2 }}
      >
        <Masonry style={{ width: "100%" }} gutter=".5rem">
          {images.map((image, idx) => (
            <li style={{ width: "100%", listStyle: "none" }} key={idx}>
              <Item
                onClick={() => showAlt(!isShowingAlt)}
                key={idx}
                stack={idx + 1}
              >
                {image?.context?.custom?.alt && (
                  <AltContainer active={isShowingAlt}>
                    <Flex placeItems="center">
                      <Text color="white">
                        {isShowingAlt ? image?.context?.custom?.alt : "ALT"}
                      </Text>
                    </Flex>

                    {!isShowingAlt && (
                      <Flex justify="center">
                        <LiaInfoSolid color="white" size={16} />
                      </Flex>
                    )}
                  </AltContainer>
                )}

                <CustomImage
                  blur={isImageLoading}
                  loader={ImageLoader}
                  fill
                  alt={image?.context?.custom?.alt}
                  onLoad={() => setImageLoading(true)}
                  src={image?.public_id}
                />
              </Item>
            </li>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  )
}

export default ImageCarousel
