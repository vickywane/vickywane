import React from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { IoIosPaper } from "react-icons/io"
import { FiChevronRight } from "react-icons/fi"

import {
  BannerBody,
  BannerContain,
  Text,
  Name,
  Hover,
  CustomImage,
} from "../styles/styles"

import { Link } from "gatsby"
import Wave from "../images/wave.svg"

const StyledImg = styled.img`
  height: auto;
  width: 10rem;
  border-radius: 50%;
  ${media.lessThan("medium")`
  width: 8rem;
`};
  ${media.lessThan("small")`
  width: 7rem;
`};
`

const ArticleHover = styled.div`
  transition: all 300ms;
  span {
    opacity: 0;
    color: #fff;
  }
  &: hover {
    cursor: pointer;
    span {
      opacity: 1;
    }
  }
`

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const Banner = () => {
  return (
    <div>
      <BannerContain style={{ background: "#1b2f7d" }}>
        <br />
        <br />

        <Link to="/blog" style={{ textDecoration: "none" }}>
          <ArticleHover style={{ display: "flex", margin: "0 1rem" }}>
            <div>
              <IoIosPaper style={{ color: "white", fontSize: "1.9rem" }} />
            </div>
            <div style={{ ...center }}>
              <Text white style={{ margin: "0 0.5rem" }}>
                My Articles
              </Text>
            </div>
            <div style={{ ...center }}>
              <span>
                <FiChevronRight style={{ fontSize: "1.5rem" }} />
              </span>
            </div>
          </ArticleHover>
        </Link>

        <BannerBody
          style={{
            transition: "all 450ms",
          }}
        >
          <StyledImg
            alt="My Avatar "
            src={require("../images/my_avatar.png")}
          />
          <div>
            <Name> Nwani Victory </Name>
            <Text white>
              <b style={{ fontWeight: "570" }}>FullStack developer</b> from
              Nigeria , Africa.
            </Text>

            <br />
          </div>
        </BannerBody>
      </BannerContain>
      <CustomImage src={Wave} alt="wave" />
    </div>
  )
}

export default Banner
