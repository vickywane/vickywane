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

  .items-container {
    position: relative;
    display: grid;
    grid-template-columns: 80% 10%;
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

const CTAContainer = styled(Flex)`
  position: relative;
  writing-mode: vertical-rl;
  right: 0;

  background-color: green;
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

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    display: none;
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
    rtl: true,
    arrows: false,
    afterChange: slideNumber => setActiveInsight(slideNumber),
  }

  return (
    <Layout bg={"#fff8f0"}>
      <SectionIndicator
        text="Vacation Jornals Around Earth"
        id="travel-insight"
      />

      <br />
      <br />

      <div style={{ display: "grid", gridTemplateColumns: "100% auto" }}>
        <Slider
          ref={slider => {
            sliderRef = slider
          }}
          {...SliderSettings}
        >
          {previews?.map((items, idx) => (
            <Container
              key={items?._id}
              style={{
                width: "100%",
                minWidth: "100%",
                right: 0,
              }}
            >
              <div className={"items-container"}>
                <div className={"contents"}>
                  {items?.images && (
                    <Flex>
                      <div className={"image-ctn"}>
                        <ImageCarousel images={items?.images} />
                      </div>
                    </Flex>
                  )}

                  <Flex direction={"column"}>
                    <CTAText fontWeight={600}>
                      {" "}
                      {items?.article?.title}{" "}
                    </CTAText>

                    <br />
                    <RichTextComponent
                      richText={items?.article?.summary}
                      maxTextLength={35}
                      overrideStyle={{
                        color: "#666666",
                      }}
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
              </div>
            </Container>
          ))}
        </Slider>

        <CTAContainer>
          <Flex
            style={{
              zIndex: 2,
              position: "absolute",
              backgroundColor: "#fff8f0",
            }}
          >
            <CTAText color={"#333333"}>
              What do you think of <br /> <span> Travelling? </span>
            </CTAText>
          </Flex>

          <Arrow />
        </CTAContainer>
      </div>

      <DotIndicator
        count={previews.length}
        clickAction={item => sliderRef?.slickGoTo(item)}
        activeItem={activeInsight}
      />
    </Layout>
  )
}

export default FeaturedTravelInsight
