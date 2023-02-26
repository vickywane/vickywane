"use client";
import { Flex, H2Heading, Text } from "@/styles";
import styled from "styled-components";
import React from "react";

const ContentLayout = styled.div`
  background: #fff8f0;
  padding: 100px 0;

  .container {
    max-width: 1224px;
    margin: 0 auto;

    ul {
      list-style: none;

      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));

      li {
        margin: 32px 0;
      }
    }
  }
`;

const mockData = [
  {
    title: "How To Deploy To Netlify",
    summary:
      "I work remotely as a web experience engineer with Ambianic.ai, an IoT company with a mission to make managing homes and workspaces easier.",
    date: "May 2018 - Jan 2022",
    thumbnail: ""
  },
  {
    title: "How To Deploy To Netlify",
    summary:
      "I work remotely as a web experience engineer with Ambianic.ai, an IoT company with a mission to make managing homes and workspaces easier.",
    date: "May 2018 - Jan 2022",
    thumbnail: ""
  },
  {
    title: "How To Deploy To Netlify",
    summary:
      "I work remotely as a web experience engineer with Ambianic.ai, an IoT company with a mission to make managing homes and workspaces easier.",
    date: "May 2018 - Jan 2022",
    thumbnail: ""
  },
  {
    title: "How To Deploy To Netlify",
    summary:
      "I work remotely as a web experience engineer with Ambianic.ai, an IoT company with a mission to make managing homes and workspaces easier.",
    date: "May 2018 - Jan 2022",
    thumbnail: ""
  }
];

const ProjectSummary = () => (
  <ContentLayout>
    <div className={"container"}>
      <H2Heading>
        My <span> Engineering Projects </span>{" "}
      </H2Heading>
      <br />
      <br />
      <Text>
        As an educational establishment located in Nigeria, Africa. Patfin High School.
      </Text>
    </div>
  </ContentLayout>
);

export default ProjectSummary;
