"use client"
import { Flex, H2Heading, Text } from "@/styles"
import styled from "styled-components"
import React from "react"
import ArticleCard from "@/components/Cards/ArticleCard"
import Layout from "@/styles/Layout"
import { Article } from "@/data/schema"
import Reviews from "../Reviews/Reviews"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  useMediaQuery,
} from "@/styles/useStyleWidthQuery"
import { BsArrowRight } from "react-icons/bs"
import CustomButton from "../Buttons"
import SectionIndicator from "../SectionIndicator"
import Link from "next/link"

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 0 60px;

  li {
    margin: 32px 0px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    display: flex;
    flex-direction: column;

    li {
      margin: 16px 0;
    }
  }
`

const ResponsiveButton = styled(Flex)`
  justify-content: flex-end;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    justify-content: center;
  }
`

interface TechnicalArticlesProps {
  articles: Article[]
}

const TechnicalWriterSummary = ({ articles }: TechnicalArticlesProps) => {
  const technicalArticles = React.useMemo(
    () => articles.filter(item => !item.is_travel_featured),
    [articles]
  )

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  return (
    <Layout bg={"#c1edcc"}>
      <div className={"container"}>
        <H2Heading>
          {" "}
          Life As A <span> Technical Writer </span>{" "}
        </H2Heading>

        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </Text>

        <Reviews type="technical_writing_review" />
        <br />

        <SectionIndicator
          text="Latest Published Articles"
          id="featured-articles"
        />

        <br />
        <Text align="left">
          {" "}
          My latest articles hot off the press for your comsumption!{" "}
        </Text>

        <br />

        <ListContainer>
          {technicalArticles.slice(0, isMobile ? 3 : 4).map((article, idx) => (
            <li key={idx}>
              <ArticleCard articles={article} />
            </li>
          ))}
        </ListContainer>

        <ResponsiveButton mt="20px">
          <Link href={"/blog"}>
            <CustomButton
              clickAction={() => {}}
              icon={<BsArrowRight size={24} />}
              text="View All Articles Within Blog"
            />
          </Link>
        </ResponsiveButton>
      </div>
    </Layout>
  )
}

export default TechnicalWriterSummary
