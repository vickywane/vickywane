"use client"
import { Flex, H2Heading, Icon, Text } from "@/styles"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import React from "react"
import { WorkExperience } from "@/data/schema"

import { TypedObject } from "@sanity/types"
import Layout from "@/styles/Layout"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import RichTextComponent from "@/utils/RichTextComponent"
import Reviews from "../Reviews/Reviews"
import {
  BsArrowUpSquare,
  BsArrowUpRightSquare,
  BsArrowDownSquare,
} from "react-icons/bs"
import SectionIndicator from "../SectionIndicator"

const List = styled.ul`
  list-style: none;

  .work-list {
    margin: 64px 0;

    &:nth-child(1) {
        margin: 34px 0 34px;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .work-list {
      &:nth-child(1) {
          margin: 24px 0 24px;
      }
    }
  }
`

const SummaryContainer = styled(Flex)`
  .jobs-list {
    margin: 10px 20px;

    li {
      margin: 30px 0;
    }
  }

  .thumbnail {
    position: relative;
    height: 78px;
    width: 78px;
    min-width: 78px;
    margin-right: 20px;
    img {
      border-radius: 5px;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;

    .jobs-list {
      margin: 0 20px;
    }

    .thumbnail {
      position: relative;
      height: 65px;
      width: 65px;
      min-width: 55px;
      margin-right: 20px;
      margin-bottom: 10px;

      img {
        border-radius: 5px;
      }
    }
  }
`

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 18px;
  }
`

const IconContainer = styled(Flex)`
  transition: all 150ms;
  width: fit-content;
  padding: 10px 20px;
  border: 1.5px solid #131112;
  &:hover {
    background: #c1edcc;
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    border: 1px solid #131112;
    padding: 7px 15px;
  }
`

const ResponsiveFlex = styled(Flex)`
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    justify-content: center;
  }
`

const ResponsiveText = styled(Text)`
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 12px;
  }
`

const Summary = ({
  name,
  url,
  summary,
  description,
  start_date,
  end_date,
  thumbnail,
}: WorkExperience) => {
  const [isClamped, setClamper] = React.useState(true)

  return (
    <SummaryContainer>
      {thumbnail && (
        <div className={"thumbnail"}>
          <Image
            loader={ImageLoader}
            fill
            alt={name || ""}
            src={thumbnail?.public_id}
          />
        </div>
      )}

      <Flex direction={"column"}>
        <a target={"_blank"} href={url}>
          <Flex>
            <Title> {name} </Title>

            <Icon color="#115e65" ml={"7px"} placeItems={"center"}>
              <BsArrowUpRightSquare />
            </Icon>
          </Flex>
        </a>

        <Text mt="5px" mb="10px">
          {summary}{" "}
        </Text>

        <Flex>
          <Text fontWeight={500} mr={"8px"}>
            {new Date(start_date as string).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>

          <Text mr={"8px"}>to</Text>

          <Text fontWeight={500}>
            {!end_date
              ? "Present"
              : new Date(end_date).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
          </Text>
        </Flex>

        <div className={"jobs-list"}>
          <RichTextComponent
            richText={(description as unknown) as TypedObject}
            isClamped={isClamped}
          />
        </div>

        <ResponsiveFlex display="flex">
          <IconContainer onClick={() => setClamper(!isClamped)} display="flex">
            <Flex display="flex" placeItems="center">
              <ResponsiveText fontWeight={600}>
                View {!isClamped ? "Less" : "More"} Work Activities{" "}
              </ResponsiveText>
            </Flex>

          <Flex placeItems="center" >
          <Icon color="#115e65" ml="10px">
              {!isClamped ? <BsArrowUpSquare /> : <BsArrowDownSquare />}
            </Icon>
          </Flex>
            
          </IconContainer>
        </ResponsiveFlex>
      </Flex>
    </SummaryContainer>
  )
}

interface JobSummaryProp {
  experiences: Array<WorkExperience>
}

const JobSummary = ({ experiences }: JobSummaryProp) => {
  return (
    <Layout>
      <H2Heading>
        {" "}
        Life As A <span> Software Engineer </span>{" "}
      </H2Heading>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book
      </Text>
      <br />
      <br />

      <SectionIndicator text="Reviews From Colleagues" id="work-reviews" />

      <Reviews type="work_review" />
      <br />
      <br />

      <SectionIndicator text="Professional Work History" id="work-history" />
      <List>
        {experiences.map((item, idx) => (
          <li className="work-list" key={idx}>
            <Summary {...item} />
          </li>
        ))}
      </List>
    </Layout>
  )
}

export default JobSummary
