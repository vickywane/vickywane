import React from "react"
import Image from "../components/image"
import {
  BannerBody,
  BannerContain,
  Text,
  Name,
  Button,
  CustomImage,
} from "../styles/styles"

import { Link } from "gatsby"
import Wave from "../assets/svg/wave.svg"

const Banner = () => {
  return (
    <BannerContain>
      <BannerBody>
        <img
          alt="My Avatar "
          style={{
            height: "auto",
            width: "10rem",
            borderRadius: "50%",
          }}
          src={require("../assets/images/my_avatar.png")}
        />
        <div>
          <Name> Nwani Victory </Name>
          <Text banner> Software Engineer from Lagos, Nigeria , Africa. </Text>

          <Link
            to="/#footer"
            style={{
              textDecoration: `none`,
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
