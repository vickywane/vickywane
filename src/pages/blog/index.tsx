import React, { useEffect, useRef, useState } from "react"
import Header from "@/components/headers"
import Layout from "@/styles/Layout"
import { GetStaticProps, GetStaticPropsContext } from "next"
import { SanityClient } from "@/utils/Sanity"
import {
  ARTICLES_QUERY,
  COMPANIES_QUERY,
  GET_CATEGORY_QUERY,
} from "@/data/gqols"
import ArticleCard from "@/components/Cards/ArticleCard"
import {
  H2Heading,
  FlexArticleList,
  Text,
  Flex,
  Icon,
  H3Heading,
} from "@/styles"
import { FiSearch } from "react-icons/fi"
import NextHeader from "@/components/headers/nextHead"
import styled from "styled-components"
import Ticker from "react-ticker"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import QuickCategoriesCard from "@/components/Cards/QuickCategories"

const SearchTextInput = styled.input`
  outline: 0;
  border: 0;
  font-size: 22px;
  color: #115e65;
  height: 100%;
  width: 100%;
`

const SearchContainer = styled.div`
  height: 65px;
  width: 100%;
  background: white;
  display: flex;
  place-items: center;
  padding: 0 32px;
  border-radius: 30px;

  -webkit-box-shadow: -3px 3px 18px -2px rgba(0, 0, 0, 0.54);
  -moz-box-shadow: -3px 3px 18px -2px rgba(0, 0, 0, 0.54);
  box-shadow: -3px 3px 18px -2px rgba(0, 0, 0, 0.54);
`

const ButtonContainer = styled.button`
  border: 1px solid #000;
  margin: 0 32px;
  padding: 0 16px;
  height: 45px;
  background: transparent;

  &:hover {
    cursor: pointer;
    background: #fff8f0;
  }
`

const LinkItem = styled(Flex)<{ active: boolean }>`
  padding: 6px 8px;
  border-left: ${props => (props.active ? "7px solid #000" : "")};
  background: ${props => (props.active ? "#fff8f0" : "")};

  &:hover {
    cursor: pointer;
    background: #fff8f0;
    border-left: 7px solid #000;
  }
`

const Blog = ({
  companies,
  blogCategories,
}: {
  companies: any
  blogCategories: any
}) => {
  const cardsTabListRef = useRef<HTMLUListElement>(null)

  const handleShiftButton = (type: "right" | "left") => {
    if (!cardsTabListRef.current) return

    if (type === "left") {
      return (cardsTabListRef.current.scrollLeft += 150)
    }

    return (cardsTabListRef.current.scrollLeft += -150)
  }

  return (
    <div>
      <Header />
      <NextHeader name={"Victory Nwani | Blog"} />
      <Layout bg="#FFF8F0">
        <H2Heading align="center">
          Writings On <b>Frontend Engineering</b>
        </H2Heading>

        <br />

        <SearchContainer>
          <FiSearch size={"26px"} color="#115e65" />
          <Flex ml="16px">
            <SearchTextInput placeholder="Find an article..." />
          </Flex>
        </SearchContainer>

        <br />

        <br />
      </Layout>
      <div
        style={{
          backgroundColor: "#FFF8F0",
          borderTop: "2px solid #115e65",
          padding: "26px 0",
          borderBottom: "2px solid #115e65",
        }}
      >
        <Ticker speed={10}>
          {({ index }) => (
            <Flex>
              {companies.map((items, idx) => (
                <Flex
                  key={idx}
                  mr="16px"
                  ml="16px"
                  style={{
                    position: "relative",
                    height: "60px",
                    width: "250px",
                  }}
                >
                  <Image
                    alt={items.name}
                    fill
                    src={items.thumbnail.public_id}
                    loader={ImageLoader}
                    style={{ position: "absolute", objectFit: "contain" }}
                  />
                </Flex>
              ))}
            </Flex>
          )}
        </Ticker>
      </div>

      <div>
        <QuickCategoriesCard blogCategories={blogCategories} />

        <Layout bg="#f9fafe">
          <Flex direction="column" style={{ position: "relative" }}>
            {blogCategories.map(({ name, slug, articles }, idx) => (
              <div key={idx} style={{ marginBottom: 72 }}>
                <Flex justify="space-between">
                  <Flex>
                    <Flex justify="center">
                      <H2Heading id={slug.current}>{name}</H2Heading>
                    </Flex>

                    <div>
                      <ButtonContainer>
                        <Link href={`blog/category/${slug?.current}`}>
                          <Text fontSize="15px"> See All </Text>
                        </Link>
                      </ButtonContainer>
                    </div>
                  </Flex>

                  <Flex>
                    <div>
                      <ButtonContainer
                        onClick={() => handleShiftButton("left")}
                      >
                        <Icon ml="10px" placeItems={"center"}>
                          <BsArrowLeft color={"#131112"} />
                        </Icon>
                      </ButtonContainer>
                    </div>

                    <div>
                      <ButtonContainer
                        onClick={() => handleShiftButton("right")}
                      >
                        <Icon ml="10px" placeItems={"center"}>
                          <BsArrowRight color={"#131112"} />
                        </Icon>
                      </ButtonContainer>
                    </div>
                  </Flex>
                </Flex>

                <br />
                <hr />
                <br />
                <br />
                <FlexArticleList ref={cardsTabListRef}>
                  {articles.map((article, idx) => (
                    <li
                      style={{
                        width: "450px",
                        minWidth: "450px",
                        margin: "0 32px 0 0",
                      }}
                      key={idx}
                    >
                      {" "}
                      <ArticleCard articles={article} />{" "}
                    </li>
                  ))}
                </FlexArticleList>
              </div>
            ))}
          </Flex>
        </Layout>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<any> = async (
  context: GetStaticPropsContext
) => {
  const AllBlogs = await SanityClient().fetch(ARTICLES_QUERY({ type: "all" }))
  const AllBlogCategories = await SanityClient().fetch(GET_CATEGORY_QUERY({}))
  const Companies = await SanityClient().fetch(COMPANIES_QUERY)

  return {
    props: {
      articles: AllBlogs,
      companies: Companies,
      blogCategories: AllBlogCategories,
    },
    revalidate: 3600,
  }
}

export default Blog
