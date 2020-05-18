import React from "react"
import Image from "../components/image"
import styled from "styled-components"
import media from "styled-media-query"
import {
  BannerBody,
  BannerContain,
  Text,
  Name,
  Button,
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

const Banner = () => {
  return (
    <BannerContain>
      <BannerBody
        style={{
          transition: "all 450ms",
        }}
      >
        <StyledImg alt="My Avatar " src={require("../images/my_avatar.png")} />
        <div>
          <Name> Nwani Victory </Name>
          <Text white>
            {" "}
            <b style={{ fontWeight: "570" }}>FullStack developer</b> from
            Nigeria , Africa.{" "}
          </Text>

          <Link
            to="/#footer"
            style={{
              textDecoration: "none",
              transition: "all 450ms",
            }}
          >
            <Button>CONTACT ME </Button>
          </Link>
          <Button onClick={() => alert("Loading Download")}>
            View E-Resume
          </Button>
          <br />
        </div>
      </BannerBody>
      <CustomImage src={Wave} alt="wave" />
    </BannerContain>
  )
}

export default Banner
