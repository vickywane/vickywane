"use client"

import React from "react"
import styled, { keyframes } from "styled-components"
import { Flex, Text } from "@/styles"
import CustomButton from "@/components/Buttons"
import HeroStats from "@/components/heros/HeroStats"
// @ts-ignore
import ArrowDown from "@/assets/svg/arrow-down.svg"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import { posthog } from "posthog-js"

const Hero = styled.section`
  background: #fff8f0;
  position: relative;

  .hero-stats-section {
    overflow: hidden;
    height: 218px;
  }

  .hero-details-section {
    height: 854px;
    display: flex;
    place-items: center;

    @media (max-width: ${TABLET_BREAKPOINT}px) {
      padding: 0 40px;
    }
    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      padding: 0 20px;
    }
  }

  .hero-stats-bottom {
    background: #131112;
    height: 118px;
    width: 100%;
    position: absolute;
    bottom: -35px;
  }

  span {
    text-decoration: underline;
    text-decoration-color: #d0db97;
    text-decoration-thickness: 20px;

    animation: growSpan 1700ms;
    animation-iteration-count: 2;
    animation-delay: 500ms;

    @keyframes growSpan {
      0% {
        text-decoration-thickness: 0;
      }
      50% {
        text-decoration-thickness: 20px;
      }
      100% {
        text-decoration-thickness: 0;
      }
    }
  }

  .container {
    max-width: 1224px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 60% 40%;

    .buttons-ctn {
      display: flex;
    }

    .details {
      position: relative;

      img {
        object-fit: contain;
        top: 0;
        position: absolute;
        z-index: 0;
      }
    }
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    .hero-stats-section {
      height: 195px;
    }

    span {
      text-decoration-thickness: 13px;
      animation: growSpan 1500ms;
      animation-iteration-count: 2;
      animation-delay: 500ms;

      @keyframes growSpan {
        from {
          text-decoration-thickness: 0px;
        }
        to {
          text-decoration-thickness: 10px;
        }
      }
    }

    .hero-details-section {
      height: 650px;
    }

    .hero-stats-bottom {
      height: 20px;
      bottom: 0;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .container {
      grid-template-columns: 100%;

      .buttons-ctn {
        justify-content: center;
      }
    }

    .right-section {
      display: none;
    }

    .hero-details-section {
      height: 470px;
    }

    .hero-stats-bottom {
      height: 20px;
      bottom: 0;
    }
  }
`

const moveArrow = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(50px);
  }

  100% {
    transform: translateY(0);
  }
`

const ArrowContainer = styled.div`
  margin-top: 4rem;
  animation: ${moveArrow} 1500ms;
  animation-iteration-count: infinite;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    margin-top: 1rem;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 1rem;
  }

  &:hover {
    cursor: pointer;
  }
`

const Heading = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 128px;
  line-height: 130px;
  z-index: 5;
  position: relative;
  color: ${props => props.color || "#115e65"};
  text-align: ${(props: any) => props.align};

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 94px;
    line-height: 100px;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 64px;
    line-height: 70px;
    text-align: center;
  }
`

interface HomeHeroProps {
  banner_description: string
}

const BannerText = styled(Text)`
  margin-top: 30px;
  margin-bottom: 60px;
  z-index: 5;
  position: relative;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: center;
  }
`

const HeroStar = ({ size = 82 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 82 82`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M42.6006 0.0598232L56.243 26.3592L81.0217 42.6006L54.7224 56.243L38.4809 81.0217L24.8385 54.7224L0.0598066 38.481L26.3591 24.8386L42.6006 0.0598232Z"
      fill="#D0DB97"
    />
  </svg>
)

const HomeHero = ({ banner_description }: HomeHeroProps) => (
  <>
    <Hero>
      <div className={"hero-details-section"}>
        <div className={"container"}>
          <div>
            <div className={"details"}>
              {/* <Flex style={{ position: "relative" }}> */}
              {/* <Flex style={{ position: "absolute", right: 150 }}>
                  <HeroStar />
                </Flex>

                <Flex style={{ position: "absolute", left: 150, top: 120 }}>
                  <HeroStar size={52} />
                </Flex>

                <Flex style={{ position: "absolute", right: 120, bottom: 20 }}>
                  <HeroStar size={62} />
                </Flex> */}

              <Heading>
                Hello, <br /> I&apos;m <span>Nwani</span> <br /> Victory
              </Heading>
              {/* </Flex> */}

              <BannerText style={{ zIndex: 999 }} color={"#131112"}>
                {banner_description}
              </BannerText>

              {/* <Image
                fill
                loader={ImageLoader}
                alt={"floating stars"}
                src={"/personal-portfolio-app/float-stars.png"}
              /> */}
            </div>

            <div className={"buttons-ctn"}>
              <CustomButton clickAction={() => {}} text={"Got A Project?"} />

              <CustomButton
                clickAction={() => {}}
                text={"Let's Talk!!"}
                color={"#131112"}
                background={"#fff"}
              />
            </div>
          </div>

          <div className={"right-section"}>
            <p> RIGHT ELEMENT HERE </p>
          </div>
        </div>
      </div>

      {posthog.__loaded && posthog.isFeatureEnabled("home-hero-stats") && (
        <div className={"hero-stats-section"}>
          <div className={"hero-stats-bottom"} />

          <HeroStats />
        </div>
      )}
    </Hero>

    <Flex justify={"center"}>
      <ArrowContainer>
        <ArrowDown />
      </ArrowContainer>
    </Flex>
  </>
)

export default HomeHero
