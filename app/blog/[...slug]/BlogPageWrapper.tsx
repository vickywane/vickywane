"use client"
import Layout from "@/styles/Layout"
import Breadcrumb from "@/components/headers/breadcrumb"
import { H2Heading } from "@/styles"
import { Flex, Text } from "@/styles"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import styled from "styled-components"
import RichTextComponent from "@/utils/RichTextComponent"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import RecommendationCard from "@/components/Cards/RecommendationCard"

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

const BlogPageWrapper = async ({ article }) => {
  return (
    <div>
      <Layout bg="#FFF8F0">
        <Flex direction="column" mb="20px">
          <Breadcrumb />

          <H2Heading fontWeight={600}> {article?.title} </H2Heading>
          <SubTitle color={"#666666"}>
            Published on{" "}
            <span style={{ fontWeight: 600 }}>
              {new Date(article?._createdAt).toLocaleDateString("en-us", {
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

            <ul style={{ listStyle: "none" }}>
              <Flex direction="column" mt="20px">
                {article.recommended?.map((item, idx) => (
                  <li key={idx}>
                    {/* @ts-ignore */}
                    <RecommendationCard article={item} />
                  </li>
                ))}
              </Flex>
            </ul>
          </div>
        </Flex>
      </Layout>
    </div>
  )
}

export default BlogPageWrapper
