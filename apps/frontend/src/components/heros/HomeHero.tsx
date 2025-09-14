"use client"

import React from "react"
import styled from "styled-components"
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
import { Typography } from "../ui/Typography"
import Layout from "@/styles/Layout"

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    display: flex;
    /* gap: 36px; */
    flex-direction: column-reverse;
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
  <Layout bg="#fff8f0">
    <Container className={"container "}>
      <div className={"grid gap-8 md:gap-4"}>
        <Typography as="h1" styleAs="heading_1">
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
        </Typography>

        <div>
          <RichTextComponent
            className="text-justify"
            richText={banner_description}
          />
        </div>
      </div>

      <div className="items-center justify-end hidden md:flex">
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
      </div>
    </Container>
  </Layout>
)

export default HomeHero
