"use client"

import React from "react"
import styled from "styled-components"
import { Flex, Text } from "@/styles"
import Typewriter from "typewriter-effect"
import { GREETING_WORDS } from "../../data"
import GraphemeSplitter from "grapheme-splitter"

import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import RichTextComponent from "@/utils/RichTextComponent"

const Hero = styled.section`
  background: #fff8f0;
  position: relative;

  .hero-details-section {
    height: auto;
    display: flex;
    place-items: center;
    padding: 120px 0px;

    @media (max-width: ${TABLET_BREAKPOINT}px) {
      padding: 80px 40px;
    }
    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      padding: 80px 40px;
    }
  }

  .hero-stats-bottom {
    background: #131112;
    height: 118px;
    width: 100%;
    position: absolute;
    bottom: -35px;
  }

  .container {
    max-width: 1404px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;

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

    .container {
      display: flex;
      flex-direction: column-reverse;
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
  font-size: 82px;
  line-height: 90px;
  position: relative;
  color: ${props => props.color || "#115e65"};
  text-align: ${(props: any) => props.align};

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 64px;
    line-height: 74px;
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

const stringSplitter = (value: string): string => {
  const splitter = new GraphemeSplitter()

  return splitter.splitGraphemes(value)
}

const ImageContainer = styled.div`
  position: relative;
  height: 350px;
  width: 350px;

  img {
    filter: grayscale(1);
    transition: all 100ms ease-in-out;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    margin-top: 48px;
    height: 250px;
    width: 250px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 48px;
    height: 350px;
    width: 100%;
  }

  &:hover {
    cursor: pointer;

    img {
      filter: grayscale(0);
    }
  }
`

const HomeHero = ({ banner_description }: HomeHeroProps) => (
  <Hero>
    <div className={"hero-details-section"}>
      <div className={"container"}>
        <div className={"details"}>
          <Heading style={{ marginBottom: "18px" }}>
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
            I&apos;m Victory <br /> Nwani
          </Heading>

          <RichTextComponent
            overrideStyle={{
              color: "#131112",
            }}
            richText={banner_description}
          />
        </div>

        <div className={"right-section"}>
          <Flex placeItems="center" justify="center" style={{ height: "100%" }}>
            <ImageContainer>
              <Image
                src="/v1721832258/personal-portfolio-app/my-picture.jpg"
                alt="Victory Nwani"
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  position: "absolute",
                }}
                loader={ImageLoader}
                fill
              />
            </ImageContainer>
          </Flex>
        </div>
      </div>
    </div>
  </Hero>
)

export default HomeHero
