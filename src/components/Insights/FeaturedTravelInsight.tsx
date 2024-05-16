"use client"
import styled from "styled-components"
import { Flex, Text } from "@/styles"
import React, { useState, useRef } from "react"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import Layout from "@/styles/Layout"
import RichTextComponent from "@/utils/RichTextComponent"
import CustomButton from "../Buttons"
import { BsArrowRight } from "react-icons/bs"
import ImageCarousel from "../Carousels/ImageCarouse"
import SectionIndicator from "../SectionIndicator"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { VacationPreview } from "@/data/schema"

// @ts-ignore
import InsightsArrow from "@/assets/svg/stretch-arrow.svg"
import Link from "next/link"
import DotIndicator from "../Carousels/DotIndicator"

const Container = styled.div`
  .image-ctn {
    width: 450px;
    margin-right: 100px;
    min-width: 450px;
  }

  .container {
    position: relative;
    display: grid;
    grid-template-columns: 80% 10%;
  }

  .cta-container {
    display: flex;
    position: absolute;
    writing-mode: vertical-rl;
    right: 0;
  }

  .contents {
    display: flex;
  }
  @media (max-width: ${TABLET_BREAKPOINT}px) {
    .image-ctn {
      width: 100%;
      min-width: 100%;
      margin-bottom: 28px;
      height: 100%;
    }

    .contents {
      flex-direction: column;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .image-ctn {
      width: 100%;
      min-width: 100%;
      height: 300px;
    }
  }
`

interface FeaturedTravelInsightProps {
  previews: Array<VacationPreview>
}

const CTAText = styled(Text)`
  font-size: 30px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 20px;
  }
`

const ArrowFlex = styled(Flex)`
  position: absolute;
  bottom: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    right: -20px;
  }
`

const Arrow = () => (
  <ArrowFlex justify="center" style={{}}>
    <InsightsArrow />
  </ArrowFlex>
) 

const FeaturedTravelInsight = ({ previews }: FeaturedTravelInsightProps) => {
  const [activeInsight, setActiveInsight] = useState(0)
  let sliderRef = useRef(null)

  const SliderSettings: Settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 6500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    draggable: false,
    afterChange: slideNumber => setActiveInsight(slideNumber),
  }

  return (
    <Layout bg={"#fff8f0"}>
      <Flex>
        <SectionIndicator
          text="Vacation Jornals Around Earth"
          id="travel-insight"
        />
      </Flex>

      <br />
      <br />

      <Slider
        ref={slider => {
          sliderRef = slider
        }}
        {...SliderSettings}
      >
        {previews.map((items, idx) => (
          <Container
            key={items?._id}
            style={{
              width: "100%",
              minWidth: "100%",
              background: idx === 0 ? "red" : "",
            }}
          >
            <div className={"container"}>
              <div className={"contents"}>
                {items?.images && (
                  <Flex>
                    <div className={"image-ctn"}>
                      <ImageCarousel images={items?.images} />
                    </div>
                  </Flex>
                )}

                <Flex direction={"column"}>
                  <CTAText fontWeight={600}> {items?.article?.title} </CTAText>

                  <br />
                  <RichTextComponent
                    richText={items?.article?.summary}
                    maxTextLength={35}
                  />

                  <Flex mt="40px">
                    <Link href={`/blog/${items?.article?.slug?.current}`}>
                      <CustomButton
                        clickAction={() => {}}
                        icon={<BsArrowRight size={24} />}
                        text="Read The Travel Insight"
                      />
                    </Link>
                  </Flex>
                </Flex>
              </div>

              <div
                style={{ height: "100%", position: "relative" }}
                className={"cta-container"}
              >
                <Flex
                  justify={"center"}
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    right: "-40px",
                    background: "#fff8f0",
                  }}
                  placeItems={"center"}
                >
                  <CTAText color={"#333333"}>
                    What do you think of <br /> <span> Travelling? </span>
                  </CTAText>
                </Flex>

                <Arrow />
              </div>
            </div>
          </Container>
        ))}
      </Slider>

      <DotIndicator
        count={previews.length}
        clickAction={(item) => sliderRef?.slickGoTo(item)}
        activeItem={activeInsight}
      />
    </Layout>
  )
}

export default FeaturedTravelInsight
