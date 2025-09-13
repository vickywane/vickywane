import React from "react"
import Header from "@/components/headers"
import { SanityClient } from "@/utils/Sanity"
import { GET_CATEGORY_QUERY } from "@/data/gqols"
import { BlogCategory } from "@/data/schema"
import ArticleListComponent from "@/components/lists/ArticleList"
import ArticleListHero from "@/components/heros/ArticleListHero"

interface PageProps {
  blogCategories: BlogCategory[]
}

const getData = async (): Promise<PageProps> => {
  const AllBlogCategories = await SanityClient().fetch(GET_CATEGORY_QUERY({}))

  return {
    blogCategories: AllBlogCategories.reverse(),
  }
}

const Page = async () => {
  const { blogCategories }: PageProps = await getData()

  return (
    <div>
      <Header />

      <ArticleListHero blogCategories={blogCategories} />

      <ArticleListComponent {...{ blogCategories }} />
    </div>
  )
}

export default Page
