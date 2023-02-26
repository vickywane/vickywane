import { Flex, Text } from "@/styles";
import { FiArrowRight } from "react-icons/fi";
import React from "react";
import styled from "styled-components";

interface ArticleProps {
  title: string;
  summary: string;
  date: string;
  thumbnail: string;
}

const Article = styled.div`
  background: #fff;
  max-width: 463px;
  max-height: 170px;
  padding: 21px;
  overflow: auto;
  transition: all 300ms;
  filter: drop-shadow(7px 7px 0px #0D5C63);
  transform: translateY(-10px);

  :hover {
    cursor: pointer;
    filter: unset;
    transform: translateY(0);
  }
`;

const ArticleCard = ({ title, summary, date }: ArticleProps) => (
  <Article>
    <Flex justify={"space-between"}>
      <Text fontSize={"20px"}> {title} </Text>

      <Flex placeItems={"center"}>
        <Text padding={0} fontSize={"18px"} color={"#666666"}> . </Text>
      </Flex>

      <Flex placeItems={"center"}>
        <Text fontSize={"14px"} color={"#666666"}> {date} </Text>
      </Flex>
    </Flex>

    <br />

    <Text fontSize={"16px"} color={"#131112"}>
      {summary}{" "}
    </Text>

    <br />

    <Flex>
      <Text color={"#131112"} fontSize={"14px"}> Read More </Text>

      <Flex placeItems={"center"}>
        <FiArrowRight color={"#131112"} size={"20px"} />
      </Flex>
    </Flex>
  </Article>
);

export default ArticleCard;