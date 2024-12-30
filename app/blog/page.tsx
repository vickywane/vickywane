import React from "react"
import Header from "@/components/headers"
import { SanityClient } from "@/utils/Sanity"
import {
  ARTICLES_QUERY,
  COMPANIES_QUERY,
  GET_CATEGORY_QUERY,
} from "@/data/gqols"
import { Article, Company, BlogCategory } from "@/data/schema"
import ArticleListComponent from "@/components/lists/ArticleList"
import ArticleListHero from "@/components/heros/ArticleListHero"

interface PageProps {
  articles: Article[]
  companies: Company[]
  blogCategories: BlogCategory[]
}

const getData = async (): Promise<PageProps> => {
  const AllBlogs = await SanityClient().fetch(ARTICLES_QUERY({ type: "all" }))
  const Companies = await SanityClient().fetch(COMPANIES_QUERY)
  const AllBlogCategories = await SanityClient().fetch(GET_CATEGORY_QUERY({}))

  return {
    articles: AllBlogs,
    companies: Companies,
    blogCategories: AllBlogCategories.reverse(),
  }
}

const Page = async () => {
  const { articles, companies, blogCategories }: PageProps = await getData()

  return (
    <div>
      <Header />

      <ArticleListHero blogCategories={blogCategories} />

      <ArticleListComponent {...{ articles, companies, blogCategories }} />
    </div>
  )
}

export default Page
