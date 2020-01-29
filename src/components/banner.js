import React from "react"
import Image from "../components/image"
import { BannerBody, BannerContain, Text, Name, Button } from "../styles/styles"

const Banner = () => {
  return (
    <BannerContain>
      <BannerBody>
        <div>
          <Name> Nwani Victory </Name>
          <Text> Software Engineer from Lagos, Nigeria , Africa. </Text>
          <Button onClick={() => alert("work in progress")}>CONTACT ME </Button>
        </div>
      </BannerBody>
      <Image />
    </BannerContain>
  )
}

export default Banner
