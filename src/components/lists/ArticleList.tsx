"use client"
import React, { useRef } from "react"
import styled from "styled-components"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import QuickCategoriesCard from "@/components/Cards/QuickCategories"
import {
  H2Heading,
  FlexArticleList,
  Text,
  Flex,
  Icon,
  H3Heading,
} from "@/styles"

import { Article, BlogCategory, Company } from "@/data/schema"
import ArticleCard from "@/components/Cards/ArticleCard"
import Layout from "@/styles/Layout"
import CompaniesTickerList from "./CompaniesTickerList"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"

const ButtonContainer = styled.button`
  border: 1px solid #000;
  margin: 0 32px;
  padding: 0 16px;
  height: 45px;
  max-width: 100px;
  background: transparent;

  p {
    font-size: 14px;
  }

  &:hover {
    cursor: pointer;
    background: #fff8f0;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    border: 0.7px solid #000;
    height: 30px;
    padding: 0 8px;
    margin: 0;
    max-width: 80px;

    p {
      font-size: 12px;
    }
  }
`

const CustomFlex = styled(Flex)`
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
  }
`

interface ArticleListComponentProps {
  articles: Article[]
  companies: Company[]
  blogCategories: BlogCategory[]
}

const ArticleListComponent = async ({
  articles,
  companies,
  blogCategories,
}: ArticleListComponentProps) => {
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
      {/* <CompaniesTickerList companies={companies} /> */}

      <div>
        <QuickCategoriesCard blogCategories={blogCategories} />

        <Layout bg="#f9fafe">
          <Flex direction="column" style={{ position: "relative" }}>
            {blogCategories.map(({ name, slug, articles }, idx) => (
              <div key={idx} style={{ marginBottom: 72 }}>
                <Flex justify="space-between">
                  <CustomFlex>
                    <Flex justify="center">
                      <H3Heading id={slug?.current}>{name}</H3Heading>
                    </Flex>

                    <ButtonContainer>
                      <Link href={`blog/category/${slug?.current}`}>
                        <Text> View All </Text>
                      </Link>
                    </ButtonContainer>
                  </CustomFlex>

                  {articles && articles?.length >= 2 && (
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
                  )}
                </Flex>

                <br />
                <hr />
                <br />
                <br />
                <FlexArticleList ref={cardsTabListRef}>
                  {articles?.map((article, idx) => (
                    <li key={idx}>
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

export default ArticleListComponent
