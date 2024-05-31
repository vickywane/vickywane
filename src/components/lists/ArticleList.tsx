"use client"
import React from "react"
import { Article } from "@/data/schema"
import ArticleCard from "@/components/Cards/ArticleCard"
import { ArticleList } from "@/styles"

const ArticleListComponent = async ({ articles }: { articles: Article[] }) => {
  return (
    <ArticleList>
      {articles.map((article, idx) => (
        <li key={idx}>
          {" "}
          <ArticleCard articles={article} />{" "}
        </li>
      ))}
    </ArticleList>
  )
}

export default ArticleListComponent
