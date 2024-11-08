"use client"
import { H2Heading, Text } from "@/styles"
import React, { useRef, useState } from "react"
import TalkCard from "@/components/Cards/TalkCard"
import Layout from "@/styles/Layout"
import { Engagement } from "@/data/schema"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import DotIndicator from "../Carousels/DotIndicator"
import { MOBILE_BREAKPOINT, useMediaQuery } from "@/styles/useStyleWidthQuery"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useNavigationStore } from "@/state/zustand/navigation"

interface EngagementSummaryProps {
  engagements: Engagement[]
}

const EngagementSummary = ({ engagements }: EngagementSummaryProps) => {
  const [activeItem, setActiveItem] = useState(0)
  let sliderRef = useRef(null)
  const isLargerThanMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const SliderSettings: Settings = {
    dots: false,
    autoplay: false,
    variableWidth: !isLargerThanMobile,
    autoplaySpeed: 200,
    slidesToShow: 1,
    centerMode: !isLargerThanMobile,
    swipeToSlide: true,
    arrows: false,
    draggable: true,
    centerPadding: !isLargerThanMobile ? "50px" : "70px",
    infinite: true,
    afterChange: slideNumber => setActiveItem(slideNumber),
  }

  const { setNavigationLinkItem } = useNavigationStore()

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    id: "engagements",
    callback: key => setNavigationLinkItem(key),
  })

  return (
    <Layout bg={"#fff8f0"}>
      <H2Heading ref={ref} id="engagements" align={"center"}>
        Life As A Part Of <span> Developer Communities </span>{" "}
      </H2Heading>
      <Text align={"center"} style={{ maxWidth: "750px", margin: "0 auto" }}>
        Over the past three years, I have spoken and volunteered at various
        software engineering conferences and meetups.
      </Text>
      <br />
      <br />

      <div style={{ height: "100%", width: "100%" }}>
        <Slider
          ref={slider => {
            sliderRef = slider
          }}
          className="slider-item"
          {...SliderSettings}
        >
          {engagements.map((item, idx) => (
            <li style={{ marginRight: "30px" }} key={item?._id}>
              <TalkCard engagement={item} />
            </li>
          ))}
        </Slider>
      </div>

      <DotIndicator
        count={engagements.length}
        activeItem={activeItem}
        clickAction={item => sliderRef?.slickGoTo(item)}
      />
    </Layout>
  )
}

export default EngagementSummary
