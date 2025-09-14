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
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import RichTextComponent from "@/utils/RichTextComponent"
import { Projects } from "@/data/schema"
import { Video } from "../Video/index"
import { Typography } from "../ui/Typography"

interface ProjectProps
  extends Pick<
    Projects,
    "name" | "cover" | "github_url" | "project_tools" | "description"
  > {
  order: number
}

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 0 55px;
  grid-template-columns: 48% 48%;

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
          <a target="_blank" href={github_url}>
            <Flex className="items-center" direction="row">
              <div>
                <Typography as="h3" styleAs="heading_3">
                  {name}
                </Typography>
              </div>

              <Flex ml="6px">
                <GoArrowUpRight fontSize={26} color="#115e65" />
              </Flex>
            </Flex>
          </a>

          <RichTextComponent richText={description} />

          <hr className="text-semi-transparent-grey" style={{ margin: "32px 0" }} />

          <Typography as="p" styleAs="heading_4">
            Technologies
          </Typography>

          <ul style={{ color: "#115e65", marginLeft: "26px" }}>
            {project_tools?.map((item, idx) => (
              <li style={{ listStyle: "square" }} key={idx}>
                <Typography as="p" styleAs="body">
                  {item}
                </Typography>
              </li>
            ))}
          </ul>

          <Flex mt="40px">
            <a target="_blank" href={github_url}>
              <CustomButton
                clickAction={() => {}}
                icon={<IoLogoGithub size={24} />}
                text="GitHub Repository"
              />
            </a>
          </Flex>
        </div>
      </Flex>

      <Flex placeItems="center" style={{ gridRow: order === 0 ? 1 : "" }}>
        {cover?.resource_type === "image" ? (
          <ImageContainer className="rounded-3xl">
            <Image
              loader={ImageLoader}
              fill
              className="rounded-3xl object-cover absolute"
              alt="Event-Driven Currency Predictor"
              src={cover?.public_id}
            />
          </ImageContainer>
        ) : (
          <Video source={cover?.secure_url} />
        )}
      </Flex>
    </ContainerGrid>
  )
}

export default Project
