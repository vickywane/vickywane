"use client"
import { Flex, H3Heading, H4Heading, Text } from "@/styles"
import React from "react"
import Link from "next/link"
import CustomButton from "../Buttons"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import { IoLogoGithub } from "react-icons/io"
import { GoArrowUpRight } from "react-icons/go"
import styled from "styled-components"
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import RichTextComponent from "@/utils/RichTextComponent"
import { Projects } from "@/data/schema"

interface ProjectProps
  extends Pick<
    Projects,
    "name" | "cover" | "github_url" | "project_tools" | "description"
  > {
  order: number
}

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 0 62px;
  grid-template-columns: 50% 50%;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 32px 0;
  }
`
const ImageContainer = styled.div`
  position: relative;
  height: 800px;
  width: 100%;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    height: 400px;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 350px;
  }
`

const Project = ({
  name,
  description,
  order,
  project_tools,
  cover,
  github_url,
}: ProjectProps) => {
  return (
    <ContainerGrid>
      <Flex placeItems="center">
        <div>
          <Flex direction="row">
            <H3Heading fontWeight={600}>{name}</H3Heading>

            <Flex mt="6px" ml="6px">
              <GoArrowUpRight fontSize={26} color="#115e65" />
            </Flex>
          </Flex>

          <RichTextComponent richText={description} />

          <div>
            <br />
            <br />
            <br />
          </div>

          <hr />
          <br />

          <Flex direction="row" justify="space-betweeasn">
            <H4Heading fontWeight={600}>Project Components</H4Heading>
          </Flex>

          <ul style={{ color: "#115e65", marginLeft: "26px" }}>
            {project_tools?.map((item, idx) => (
              <li style={{ listStyle: "square" }} key={idx}>
                <Text>{item}</Text>
              </li>
            ))}
          </ul>

          <br />
          <hr />

          <Flex mt="40px">
            <a target="_blank" href={github_url}>
              <CustomButton
                clickAction={() => {}}
                icon={<IoLogoGithub size={24} />}
                text="View GitHub Repository"
              />
            </a>
          </Flex>
        </div>
      </Flex>

      <Flex placeItems="center" style={{ gridRow: order === 0 ? 1 : "" }}>
        <ImageContainer>
          <Image
            loader={ImageLoader}
            fill
            style={{ objectFit: "cover", position: "absolute" }}
            alt="Event-Driven Currency Predictor"
            src={cover?.public_id}
          />
        </ImageContainer>
      </Flex>
    </ContainerGrid>
  )
}

export default Project
