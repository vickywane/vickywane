import { Flex, Text } from "@/styles"
import { BsArrowRight } from "react-icons/bs"
import React from "react"
import styled from "styled-components"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import { Article } from "@/data/schema"
import RichTextComponent from "@/utils/RichTextComponent"

interface ArticleProps {
  articles: Article
}

const ArticleComponent = styled.div`
  background: #fff;
  max-width: 600px;
  padding: 21px;
  overflow: auto;
  transition: all 300ms;
  filter: drop-shadow(7px 7px 0px #0d5c63);
  transform: translateY(-10px);

  :hover {
    cursor: pointer;
    filter: unset;
    transform: translateY(0);
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    max-width: 100%;
    width: 100%;
  }
`

const CardHeader = styled(Flex)`
  flex-direction: column;
`

const Title = styled(Text)`
  font-size: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 18px;
  }
`

const SubTitle = styled(Text)`
  font-size: 18px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 14px;
  }
`

const ArticleCard = ({ articles }: ArticleProps) => (
  <ArticleComponent>
    <CardHeader justify={"space-between"}>
      <Title mb="10px"> {articles.title} </Title>

      <Flex placeItems={"center"}>
        <SubTitle color={"#666666"}>
          {new Date(articles._createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            day: "2-digit",
            month: "long",
          })}
        </SubTitle>
      </Flex>
    </CardHeader>

    <br />

    <RichTextComponent richText={articles.summary} maxTextLength={30} />

    <br />

    <Flex>
      <Text color={"#131112"} fontSize={"14px"}>
        {" "}
        Read More{" "}
      </Text>

      <Flex ml="10px" placeItems={"center"}>
        <BsArrowRight color={"#131112"} size={"20px"} />
      </Flex>
    </Flex>
  </ArticleComponent>
)

export default ArticleCard
