"use client"
import { H2Heading, Text } from "@/styles"
import styled from "styled-components"
import React from "react"
import TalkCard from "@/components/Cards/TalkCard"
import Layout from "@/styles/Layout"
import { Engagement } from "@/data/schema"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import PodcastCard from "@/components/Cards/PodcastCard"

const ListContainer = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;

  li {
    margin: 32px 0;
  }

  // @media (max-width: ${TABLET_BREAKPOINT}px) {
  //
  // }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    li {
      margin: 20px 0;
    }
  }
`

interface EngagementSummaryProps {
  engagements: Engagement[]
}

const EngagementSummary = ({ engagements }: EngagementSummaryProps) => (
  <Layout bg={"#fff8f0"}>
    <H2Heading id="engagements" align={"center"}>
      Life As A <span> Technical Speaker </span>{" "}
    </H2Heading>
    <Text align={"center"}>
      As an educational establishment located in Nigeria, Africa. Patfin High
      School.
    </Text>

    <ListContainer>
      {engagements.map((item, idx) => (
        <li key={item?._id}>
          {item?.type && item?.type[0] === "podcast" ? (
            <PodcastCard engagement={item} />
          ) : (
            <TalkCard engagement={item} />
          )}
        </li>
      ))}
    </ListContainer>
  </Layout>
)

export default EngagementSummary
