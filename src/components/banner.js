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
import Wave from "../images/wave.svg"

const Banner = () => {
  return (
    <BannerContain>
      <BannerBody
        style={{
          transition: "all 450ms",
        }}
      >
        <img
          alt="My Avatar "
          style={{
            height: "auto",
            width: "10rem",
            borderRadius: "50%",
          }}
          src={require("../images/my_avatar.png")}
        />
        <div>
          <Name> Nwani Victory </Name>
          <Text>
            {" "}
            <b style={{ fontWeight: "570" }}>FullStack developer</b> from Lagos,
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
