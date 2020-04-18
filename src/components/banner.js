import React from "react"
import Image from "../components/image"
import { BannerBody, BannerContain, Text, Name, Button } from "../styles/styles"

import { Link } from "gatsby"
import Wave from "../assets/svg/wave.svg"

const Banner = () => {
  return (
    <BannerContain>
      <BannerBody>
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
            View E-Resume{" "}
          </Button>
          <br />
        </div>
      </BannerBody>
      <img
        src={Wave}
        alt="wave"
        style={{
          margin: "0",
          width: "100vw",
          position: "absolute",
          bottom: "-1px",
        }}
      />
    </BannerContain>
  )
}

export default Banner
