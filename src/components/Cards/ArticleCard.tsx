import { Flex, Text, Icon } from "@/styles"
import {
  BsArrowRight,
  BsArrowUpRightSquare,
  BsCalendar4Event,
} from "react-icons/bs"
import React from "react"
import styled from "styled-components"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import Link from "next/link"
import { Article } from "@/data/schema"
import RichTextComponent from "@/utils/RichTextComponent"
import { getBlogUrl } from "@/utils/linkTransforms"

interface ArticleProps {
  articles: Article
}

const ArticleComponent = styled.div`
  background: #fff;
  /* max-width: 600px; */
  padding: 21px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  transition: all 300ms;
  /* filter: drop-shadow(7px 7px 0px #0d5c63); */

  /* -webkit-box-shadow: 13px 13px 0px -3px #0d5c63;
  -moz-box-shadow: 13px 13px 0px -3px #0d5c63; */
  /* box-shadow: 13px 24px 0px -2px #0d5c63; */

  transform: translateY(-10px);

  :hover {
    cursor: pointer;
    filter: unset;
    transform: translateY(0);
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    max-width: 100%;
    width: 100%;
    height: 350px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    max-width: 100%;
    width: 100%;
    height: 300px;

    filter: drop-shadow(4px 4px 0px #0d5c63);
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

const ArticleCard = ({ articles }: ArticleProps) => {
  return (
    <ArticleComponent>
      <CardHeader justify={"space-between"}>
        {articles.is_external ? (
          <Title mb="10px">
            <a target={"_blank"} rel="noopener" href={articles.url}>
              {articles.title}{" "}
            </a>
          </Title>
        ) : (
          <Link href={getBlogUrl(articles?.slug)}>
            <Title mb="10px">{articles.title} </Title>
          </Link>
        )}

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

      <RichTextComponent
        overrideStyle={{
          color: "#666666",
        }}
        richText={articles.summary}
        maxTextLength={25}
      />

      <br />

      {articles.is_external ? (
        <Flex>
          <Flex placeItems="center">
            <Text color={"#131112"} fontSize={"15px"}>
              <a target={"_blank"} rel="noopener" href={articles.url}>
                Read External Article
              </a>
            </Text>
          </Flex>

          <Icon ml={"10px"} placeItems={"center"}>
            <BsArrowUpRightSquare />
          </Icon>
        </Flex>
      ) : (
        <Link href={getBlogUrl(articles?.slug)}>
          <Flex>
            <Flex placeItems="center">
              <Text color={"#131112"} fontSize={"15px"}>
                Read Blog Article
              </Text>
            </Flex>

            <Icon ml="10px" placeItems={"center"}>
              <BsArrowRight color={"#131112"} />
            </Icon>
          </Flex>
        </Link>
      )}
    </ArticleComponent>
  )
}

export default ArticleCard
