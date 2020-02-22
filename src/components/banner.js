import React from "react"
import Image from "../components/image"
import { BannerBody, BannerContain, Text, Name, Button } from "../styles/styles"

import Wave from "../assets/svg/wave.svg"

const Banner = () => {
  return (
    <BannerContain>
      <BannerBody>
        <div>
          <Name> Nwani Victory </Name>
          <Text banner> Software Engineer from Lagos, Nigeria , Africa. </Text>
          <Button onClick={() => alert("work in progress")}>CONTACT ME </Button>
          <Button onClick={() => alert("work in progress")}>
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
