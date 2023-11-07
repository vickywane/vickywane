import React from "react"
import Header from "@/components/headers"
import Layout from "@/styles/Layout"
import { GetStaticProps, GetStaticPropsContext } from "next"
import { SanityClient } from "@/utils/Sanity"
import { ARTICLES_QUERY } from "@/data/gqols"
import { Article } from "@/data/schema"
import ArticleCard from "@/components/Cards/ArticleCard"
import styled from "styled-components"
import { H2Heading } from "@/styles"
import NextHeader from "@/components/headers/nextHead"

const ArticleList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 60px 50px;
  list-style: none;
  margin-top: 40px;
`

const Blog = ({ articles }: { articles: Article[] }) => (
  <div>
    <Header />
    <NextHeader name={"Victory Nwani | Blog"} />

    <Layout bg="#FFF8F0">
      <H2Heading>All Stories</H2Heading>
      <hr />

      <ArticleList>
        {articles.map((article, idx) => (
          <li key={idx} >
            {" "}
            <ArticleCard articles={article} />{" "}
          </li>
        ))}
      </ArticleList>
    </Layout>
  </div>
)

export const getStaticProps: GetStaticProps<any> = async (
  context: GetStaticPropsContext
) => {
  const AllBlogs = await SanityClient().fetch(ARTICLES_QUERY({ type: "all" }))

  return {
    props: {
      articles: AllBlogs,
    },
    revalidate: 3600,
  }
}

export default Blog
