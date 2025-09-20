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
import { Typography } from "@/components/ui/Typography"

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
      <div className="flex flex-col">
        <Typography as="p" styleAs="heading_2" className="text-base md:text-xl">
          {articles.is_external ? (
            <a target={"_blank"} rel="noopener" href={articles.url}>
              {articles.title}{" "}
            </a>
          ) : (
            <Link href={getBlogUrl(articles?.slug)}>{articles.title}</Link>
          )}
        </Typography>

        <Flex placeItems={"center"}>
          <Typography
            as="p"
            styleAs="span"
            className="text-neutral-gray text-xs md:text-base"
          >
            {new Date(articles._createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              day: "2-digit",
              month: "long",
            })}
          </Typography>
        </Flex>
      </div>

      <RichTextComponent
        richText={articles.summary}
        maxTextLength={35}
      />

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
