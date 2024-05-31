import React from "react"
import Header from "@/components/headers"
import Layout from "@/styles/Layout"
// import { GetStaticProps, GetStaticPropsContext } from "next"
import { SanityClient } from "@/utils/Sanity"
import { ARTICLES_QUERY } from "@/data/gqols"
import { Article } from "@/data/schema"
import ArticleListComponent from "@/components/lists/ArticleList"

const getData = async () => {
  const AllBlogs = await SanityClient().fetch(ARTICLES_QUERY({ type: "all" }))

  return {
    articles: AllBlogs,
  }
}

const Page = async () => {
  const { articles }: { articles: Article[] } = await getData()

  return (
    <div>
      <Header />

      <Layout bg="#FFF8F0">
        {/* <H2Heading>All Stories</H2Heading> */}
        {/* <hr /> */}


        <ArticleListComponent articles={articles} />
      </Layout>
    </div>
  )
}

// export const getStaticProps: GetStaticProps<any> = async (
//   context: GetStaticPropsContext
// ) => {

// }

export default Page
