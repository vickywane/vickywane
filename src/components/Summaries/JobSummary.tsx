"use client";
import { Flex, H2Heading, Text } from "@/styles";
import styled from "styled-components";
import Image from "next/image";
import { ImageLoader } from "@/utils/Cloudinary";
import React from "react";

const ContentLayout = styled.div`
  max-width: 1224px;
  margin: 0 auto;

  ul {
    list-style: none;

    li {
      margin: 32px 0;
    }
  }
`;

const mockData = [
  {
    name: "Ambianic",
    summary: "I work remotely as a web experience engineer with Ambianic.ai, an IoT company with a mission to make managing homes and workspaces easier. My key responsibilities include maintaining and implementing planned features to the Vue.js Progressive Web App.",
    date: "May 2018 - Jan 2022",
    thumbnail: ""
  },
  {
    name: "Outliant",
    summary: "I work remotely as a web experience engineer with Ambianic.ai, an IoT company with a mission to make managing homes and workspaces easier. My key responsibilities include maintaining and implementing planned features to the Vue.js Progressive Web App.",
    date: "May 2018 - Jan 2022",
    thumbnail: ""
  }
];

interface SummaryProps {
  name: string;
  summary: string;
  date: string;
  thumbnail: string;
}

const SummaryContainer = styled.div`
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
`;

const Summary = ({ name, summary, date, thumbnail }: SummaryProps) => (
  <SummaryContainer>
    <Flex>
      <div className={"thumbnail"}>
        <Image
          loader={ImageLoader}
          fill
          alt={"Victory Nwani"}
          src={"/personal-portfolio-app/my_picture.jpg"}
        />
      </div>

      <Flex direction={"column"}>
        <Text fontSize={"24px"}> {name} </Text>
        <br />
        <Text> {date} </Text>
        <br />
        <Text> {summary} </Text>
      </Flex>
    </Flex>
  </SummaryContainer>
);

const JobSummary = () => (
  <ContentLayout>
    <H2Heading> Life As A <span> Software Engineer </span> </H2Heading>
    <br />
    <br />
    <br />

    <ul>
      {
        mockData.map(({ name, summary, date, thumbnail }) => (
          <li>
            <Summary {...{ name, summary, date, thumbnail }} />
          </li>
        ))
      }
    </ul>

  </ContentLayout>
);

export default JobSummary;