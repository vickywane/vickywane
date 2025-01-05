"use client"
import Link from "next/link"
import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Flex, Text } from "@/styles"
import HeroStats from "@/components/heros/HeroStats"
import Typewriter from "typewriter-effect"
import { GREETING_WORDS } from "../../data"
import GraphemeSplitter from "grapheme-splitter"

// @ts-ignore
import ArrowDown from "@/assets/svg/arrow-down.svg"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import { posthog } from "posthog-js"

const DashContainer = styled(Flex)`
  .dash {
    margin: 0;
    height: 3px;
    width: 70px;
    background: #0d5c63;

    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      width: 40px;
    }
  }
`

const CTAFlexContainer = styled(Flex)`
  justify-content: flex-start;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    justify-content: center;
  }
`

const IconContainer = styled.div`
  color: #000;
  font-size: 54px;
  margin-top: 8px;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 34px;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 36px;
  }
`

const Hero = styled.section`
  background: #fff8f0;
  position: relative;

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

  .right-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    max-width: 1404px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 60% 40%;

    /* background: red; */

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
    .container {
      padding: 0 15px;
    }

    .hero-stats-section {
      height: 295px;
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
  font-size: 116px;
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

const SectionContainer = styled.div`
  border: 1px solid #115e65;
  margin: 25px 0;
  padding: 10px;

  &:hover {
    cursor: pointer;
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

  max-width: 600px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: center;
  }
`

const stringSplitter = (value: string): string => {
  const splitter = new GraphemeSplitter()

  return splitter.splitGraphemes(value)
}

interface HeroSectionProps {
  title: string
  text: string
  active: boolean
}

const HeroInfoSection = ({ title, text, active }: HeroSectionProps) => {
  return (
    <SectionContainer>
      <Text fontSize="18px">{title}</Text>

      {active && <Text fontSize="15px">{text}</Text>}
    </SectionContainer>
  )
}

const HomeHero = ({ banner_description }: HomeHeroProps) => {
  const [activeSection, setActiveSection] = useState(1)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => {
        if (prev === 3) {
          return 1
        }

        return prev + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Hero>
        <div className={"hero-details-section"}>
          <div className={"container"}>
            <div>
              <div className={"details"}>
                <Heading>
                  <Typewriter
                    options={{
                      strings: GREETING_WORDS.map(
                        word => `${word.greeting} ${word.flag},`
                      ),
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      stringSplitter,
                    }}
                  />
                  I&apos;m Nwani <br /> Victory
                </Heading>

                <BannerText style={{ zIndex: 999 }} color={"#131112"}>
                  {banner_description}
                </BannerText>
              </div>

              {/* <CTAFlexContainer mt="0">
              <Flex mt="12px" justify="center" > 
                <a
                  target="_blank"
                  href="mailto:Vickywane@gmail.com?subject=Let's%20talk%20from%20your%20Personal%20Website"
                >
                  <Button
                    color={"#131112"}
                    background={"#fff"}
                    style={{ border: "1.5px solid #131112" }}
                  >
                    <Text fontSize="18px"> Contact Me </Text>
                  </Button>
                </a>
              </Flex>

              <DashContainer placeItems="center">
                <div className="dash" />
              </DashContainer>

              <Flex placeItems="center">
                <Flex>
                  <a
                    target="_blank"
                    rel="no-opener"
                    href="https://www.linkedin.com/in/victory-nwani/"
                  >
                    <IconContainer>
                      <IoLogoLinkedin />
                    </IconContainer>
                  </a>
                </Flex>

                <div
                  style={{
                    margin: "0 8px",
                    height: "8px",
                    width: "8px",
                    background: "#0d5c63",
                  }}
                />

                <Flex>
                  <a
                    href="https://github.com/vickywane"
                    target="_blank"
                    rel="no-opener"
                  >
                    <IconContainer>
                      <FaGithub />
                    </IconContainer>
                  </a>
                </Flex>
              </Flex>
            </CTAFlexContainer> */}
            </div>

            <div className={"right-section"}>
              <ul>
                <li>
                  <HeroInfoSection
                    title="Life As A Human"
                    text="My frontend career started in the early days of dynamic
                      SPAs when Class-Based components were the norm. Six years
                      past, I have worked on engineering teams across Africa."
                    active={activeSection === 1}
                  />
                </li>

                <li style={{ marginLeft: "84px" }}>
                  <HeroInfoSection
                    title="Life As A Software Engineer"
                    text="My frontend career started in the early days of dynamic
                      SPAs when Class-Based components were the norm. Six years
                      past, I have worked on engineering teams across Africa."
                    active={activeSection === 2}
                  />
                </li>

                <li>
                  <HeroInfoSection
                    title="Life As A Technical Writer"
                    text="My frontend career started in the early days of dynamic
                      SPAs when Class-Based components were the norm. Six years
                      past, I have worked on engineering teams across Africa."
                    active={activeSection === 3}
                  />
                </li>
              </ul>
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
}

export default HomeHero
