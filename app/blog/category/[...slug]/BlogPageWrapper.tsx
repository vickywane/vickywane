"use client"
import { Article, BlogCategory } from "@/data/schema"
import React from "react"
import Layout from "@/styles/Layout"
import ArticleCard from "@/components/Cards/ArticleCard"
import { H2Heading, ArticleList } from "@/styles"

const BlogPageWrapper = ({ category }: { category: BlogCategory }) => {
  return (
    <div>
      <Layout bg="#FFF8F0">
        <H2Heading>
          All articles for <span>{category?.name}</span>
        </H2Heading>
        <hr />

        <ArticleList>
          {category?.articles?.map((article, idx) => (
            <li key={idx}>
              <ArticleCard articles={(article as unknown) as Article} />{" "}
            </li>
          ))}
        </ArticleList>
      </Layout>
    </div>
  )
}

export default BlogPageWrapper
