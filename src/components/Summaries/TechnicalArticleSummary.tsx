"use client"
import { Flex, H2Heading, Text } from "@/styles"
import styled from "styled-components"
import React from "react"
import ArticleCard from "@/components/Cards/ArticleCard"
import Layout from "@/styles/Layout"
import { Article } from "@/data/schema"
import Reviews from "../Reviews/Reviews"

const ListContainer = styled.ul`
  list-style: none;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));

  li {
    margin: 32px 0;
  }

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
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
        <br />
        <H2Heading align="center" >
          Recent Published Articles
        </H2Heading>

        <ListContainer>
          {technicalArticles.map((article, idx) => (
            <li key={idx}>
              <ArticleCard articles={article} />
            </li>
          ))}
        </ListContainer>
      </div>
    </Layout>
  )
}

export default TechnicalWriterSummary
