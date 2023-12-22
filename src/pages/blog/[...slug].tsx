import { ARTICLES_QUERY } from "@/data/gqols"
import { SanityClient } from "@/utils/Sanity"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import React from "react"
import Header from "@/components/headers"
import Layout from "@/styles/Layout"
import { Article } from "@/data/schema"
import { Flex, H2Heading, Text } from "@/styles"
import RichTextComponent from "@/utils/RichTextComponent"
import Image from "next/image"
import styled from "styled-components"
import { ImageLoader } from "@/utils/Cloudinary"
import RecommendationCard from "@/components/Cards/RecommendationCard"
import NextHeader from "@/components/headers/nextHead"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import Breadcrumb from "@/components/headers/breadcrumb"

type Props = {
  preview: boolean
  article: Article
}

const ImageContainer = styled.div`
  position: relative;

  height: 650px;
  width: 100%;
  margin: 60px 0;

  image {
    display: absolute;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 350px;
  }
`

const SubTitle = styled(Text)`
  font-size: 18px;
  color: #115e65;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 14px;
  }
`

const CoverContainer = styled.div`
  max-width: 1450px;
  position: relative;
  height: 400px;
  margin: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 130px;
  }
`

const Page = ({ article }: Props) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header />
      <NextHeader name={`Blog | ${article?.title}`} />

      <Layout bg="#FFF8F0">
        <Flex direction="column" mb="20px">
          <Breadcrumb />

          <H2Heading fontWeight={600}> {article?.title} </H2Heading>
          <SubTitle color={"#666666"}>
            Published on{" "}
            <span style={{ fontWeight: 600 }}>
              {new Date(article._createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                day: "2-digit",
                month: "long",
              })}
            </span>
            .
          </SubTitle>
        </Flex>

        {/* @ts-ignore */}
        <RichTextComponent richText={article.summary} />

        {/* Push image down for intersection */}
        <div style={{ height: "200px" }} />
      </Layout>

      {article?.cover && (
        <CoverContainer>
          <div
            style={{
              position: "absolute",
              height: "500px",
              width: "100%",
              top: "-280px",
            }}
          >
            <ImageContainer>
              <Image
                loader={ImageLoader}
                fill
                style={{ objectFit: "cover" }}
                src={article?.cover?.public_id}
                alt={`${article?.title}`}
              />
            </ImageContainer>
          </div>
        </CoverContainer>
      )}

      <Layout>
        {/* @ts-ignore */}
        <RichTextComponent richText={article.body} />

        <Flex mt="70px">
          <div>
            <H2Heading fontWeight={600}> Want To Read More? </H2Heading>
            <hr />

            <Flex direction="column" mt="20px">
              {article.recommended?.map((item, idx) => (
                <li key={idx}>
                  {/* @ts-ignore */}
                  <RecommendationCard article={item} />
                </li>
              ))}
            </Flex>
          </div>
        </Flex>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<any> = async (
  context: GetStaticPropsContext
) => {
  const article = await SanityClient().fetch(
    ARTICLES_QUERY({ slug: `${context?.params?.slug}` })
  )

  return {
    props: {
      article: article[0],
    },
    revalidate: 3600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allArticles: Article[] = await SanityClient().fetch(
    ARTICLES_QUERY({ type: "all" })
  )

  const filteredItems = allArticles.filter(
    item => !item.slug && !item.is_external
  )

  const paths = filteredItems.map(article => {
    return {
      params: {
        slug: [`${article?.slug?.current}`],
      },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export default Page
