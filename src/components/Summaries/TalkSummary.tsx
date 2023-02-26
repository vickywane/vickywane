"use client";
import { Flex, H2Heading, Text } from "@/styles";
import styled from "styled-components";
import React from "react";
import TalkCard from "@/components/Cards/TalkCard";

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
    type: "Podcast"
  },
  {
    type: "Podcast"
  }
];

const TalkSummary = () => (
  <ContentLayout>
    <div className={"container"}>
      <H2Heading align={"center"}>
        Life As A <span> Technical Speaker </span>{" "}
      </H2Heading>
      <br />
      <br />
      <Text align={"center"}>
        As an educational establishment located in Nigeria, Africa. Patfin High School.
      </Text>

      <ul>
        {
          mockData.map(({ type }) => (
            <li>
              <TalkCard type={type} />
            </li>
          ))
        }
      </ul>

    </div>
  </ContentLayout>
);

export default TalkSummary;
