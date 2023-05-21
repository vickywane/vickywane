import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"

const Container = styled.ul`
  position: absolute;
  height: auto;
  width: auto;
  background: green;
  top: -30px;
  left: 300px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    top: -30px;
     left: 140px;
  }
`

export interface StyledProps {
  active: any
  idx: any
  top: any
}

const Item = styled.li<StyledProps>`
  height: 300px;
  width: 300px;
  position: absolute;

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
    transform: scale(1.08);
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 180px;
    width: 180px;

    &:hover {
      transform: scale(1.08);
      cursor: pointer;
    }
  }
`

const mockImgs = [
  "personal-portfolio-app/IMG_3871.jpg",
  "personal-portfolio-app/okta-k8-cover.jpg",
  "personal-portfolio-app/kcd-thumbnail.jpg",
  "personal-portfolio-app/maureen-thumbnail.jpg",
  "personal-portfolio-app/axe-svelte.png",
]

const ImageCarousel = () => {
  return (
    <Container>
        {mockImgs.map((item, idx) => (
          <Item
            key={idx}
            idx={`-${(idx + 1) * 30}px`}
            top={`${(idx + 1) * 30}px`}
            active={1 === idx}
          >
            <Image loader={ImageLoader} fill alt={"CRAZY ALT"} src={item} />
          </Item>
        ))}
    </Container>
  )
}

export default ImageCarousel
