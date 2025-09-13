"use client"

import React from "react"
import styled from "styled-components"
import { Text } from "@/styles"
import Typewriter from "typewriter-effect"
import { GREETING_WORDS } from "../../data"
import GraphemeSplitter from "grapheme-splitter"

import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"

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

const Heading = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 116px;
  line-height: 130px;
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
  position: relative;
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

const HomeHero = ({ banner_description }: HomeHeroProps) => (
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

            <BannerText color={"#131112"}>{banner_description}</BannerText>
          </div>
        </div>

        <div className={"right-section"}>
          <p> .</p>
        </div>
      </div>
    </div>
  </Hero>
)

export default HomeHero
