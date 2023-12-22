import { GET_CATEGORY_QUERY } from "@/data/gqols"
import { Article, BlogCategory } from "@/data/schema"
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next"
import { SanityClient } from "@/utils/Sanity"
import React from "react"
import Header from "@/components/headers"
import Layout from "@/styles/Layout"
import NextHeader from "@/components/headers/nextHead"
import ArticleCard from "@/components/Cards/ArticleCard"
import { H2Heading, ArticleList } from "@/styles"

const Page = ({ category }: { category: BlogCategory }) => {
  return (
    <div>
      <Header />
      <NextHeader name={"Victory Nwani | Blog"} />

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
