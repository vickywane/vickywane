import { GET_CATEGORY_QUERY } from "@/data/gqols"
import { Article, BlogCategory } from "@/data/schema"
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next"
import { SanityClient } from "@/utils/Sanity"
import React from "react"
import Header from "@/components/headers"
import Layout from "@/styles/Layout"
import NextHeader from "@/components/headers/nextHead"
import ArticleCard from "@/components/Cards/ArticleCard"
import { H2Heading, ColumnArticleList } from "@/styles"
import Breadcrumb from "@/components/headers/breadcrumb"

const Page = ({ category }: { category: BlogCategory }) => {
  return (
    <div>
      <Header />
      <NextHeader name={"Victory Nwani | Blog"} />

      <Layout bg="#FFF8F0">
        <Breadcrumb />
        <br />
        <H2Heading>
          All articles for <span>{category?.name}</span>
        </H2Heading>
        <hr />

        <ColumnArticleList>
          {category?.articles?.map((article, idx) => (
            <li key={idx}>
              <ArticleCard articles={(article as unknown) as Article} />{" "}
            </li>
          ))}
        </ColumnArticleList>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<any> = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug as string

  const category: BlogCategory[] = await SanityClient().fetch(
    GET_CATEGORY_QUERY({ slug })
  )

  // TODO: rewrite query to return single category object.
  return {
    props: {
      category: category[0],
    },
    revalidate: 3600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryArticles: BlogCategory[] = await SanityClient().fetch(
    GET_CATEGORY_QUERY({})
  )

  const paths = categoryArticles.map(category => {
    return {
      params: {
        slug: [`${category?.slug?.current}`],
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export default Page
