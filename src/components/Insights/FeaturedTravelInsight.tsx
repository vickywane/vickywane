"use client"
import styled from "styled-components"
import { Flex, Text } from "@/styles"
import React, { useMemo } from "react"
import { Article } from "@/data/schema"
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

// @ts-ignore
import InsightsArrow from "@/assets/svg/stretch-arrow.svg"

const Container = styled.div`
  .image-ctn {
    height: 400px;
    width: 450px;
    margin-right: 100px;
    min-width: 450px;
    position: relative;
    justify-content: center;
    display: flex;
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
      height: 400px;

      img {
        border-radius: 6px;
      }
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

      img {
        border-radius: 6px;
      }
    }
  }
`

interface FeaturedTravelInsightProps {
  articles: Article[]
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

const FeaturedTravelInsight = ({ articles }: FeaturedTravelInsightProps) => {
  const travelInsight = useMemo(
    () => articles.find(item => item.is_travel_featured),
    [articles]
  )

  return (
    <Layout bg={"#fff8f0"}>
      <SectionIndicator
        text="Vacation Jornal Around Earth"
        id="travel-insight"
      />
      <br />
      <br />

      <Container>
        <div className={"container"}>
          <div className={"contents"}>
            <div className={"image-ctn"}>
              <ImageCarousel />
            </div>

            <Flex direction={"column"}>
              <br />

              <CTAText fontWeight={600}> {travelInsight?.title} </CTAText>

              <br />
              <RichTextComponent
                richText={travelInsight!.summary}
                maxTextLength={35}
              />

              <Flex mt="40px" justify="flex-start">
                <CustomButton
                  clickAction={() => {}}
                  icon={<BsArrowRight size={24} />}
                  text="Read My Travel Insight"
                />
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
    </Layout>
  )
}

export default FeaturedTravelInsight
