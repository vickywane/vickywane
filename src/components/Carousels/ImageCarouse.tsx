import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Container = styled.ul`
  height: 100%;
  width: 100%;
`

export interface StyledProps {
  active: any
  idx: any
  top: any
}

const Item = styled.li<StyledProps>`
  height: ${props => (props.stack === 1 ? "250px" : props.stack === 4 ? "250px" : props.stack === 5 ? "150px" : "200px")};
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
    transform: scale(1.08);
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 150px;
    width: 100%;

    &:hover {
      transform: scale(1.08);
      cursor: pointer;
    }
  }
`

const mockImgs = [
  "personal-portfolio-app/blog/travel-journal/ghana/oraotun1uywuoa4bmxlu.jpg",
  "personal-portfolio-app/blog/travel-journal/ghana/zuyglkptgvylyyqezloz.jpg",
  "personal-portfolio-app/blog/travel-journal/ghana/uprl9qsvruxtvbiyxop7.jpg",
  "personal-portfolio-app/blog/travel-journal/ghana/lu0gwcduzf0nwdzixgyq.jpg",
]

const ImageCarousel = () => {
  return (
    <Container>
      <ResponsiveMasonry style={{width: "100%"}} columnsCountBreakPoints={{ 750: 2}}>
        <Masonry style={{width: "100%"}} gutter="1rem">
          {mockImgs.map((item, idx) => (
            <li style={{width: "100%", listStyle: "none"}} key={idx}>
              <Item key={idx} stack={idx + 1}>
                <Image loader={ImageLoader} fill alt={"CRAZY ALT"} src={item} />
              </Item>
            </li>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  )
}

export default ImageCarousel
