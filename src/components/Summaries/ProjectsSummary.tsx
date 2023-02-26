"use client";
import { Flex, H2Heading, Text } from "@/styles";
import styled from "styled-components";
import React from "react";
import Layout from "@/styles/Layout";

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
  <Layout bg={"#fff8f0"}>
    <H2Heading>
      My <span> Engineering Projects </span>{" "}
    </H2Heading>
    <Text>
      As an educational establishment located in Nigeria, Africa. Patfin High School.
    </Text>
  </Layout>
);

export default ProjectSummary;
