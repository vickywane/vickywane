"use client";
import { Flex, H2Heading, Text } from "@/styles";
import styled from "styled-components";
import React from "react";
import { FiArrowRight } from "react-icons/all";
import ArticleCard from "@/components/Cards/ArticleCard";

const ContentLayout = styled.div`
  background: #c1edcc;
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

const TechnicalWriterSummary = () => (
  <ContentLayout>
    <div className={"container"}>
      <H2Heading>
        {" "}
        Life As A <span> Technical Writer </span>{" "}
      </H2Heading>
      <br />
      <br />
      <br />

      <ul>
        {mockData.map(({ title, summary, date, thumbnail }) => (
          <li>
            <ArticleCard {...{ title, summary, date, thumbnail }} />
          </li>
        ))}
      </ul>
    </div>
  </ContentLayout>
);

export default TechnicalWriterSummary;
