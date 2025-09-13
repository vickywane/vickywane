"use client"
import { useCallback } from "react"
import { Article, BlogCategory } from "@/data/schema"
import { H2Heading, Flex, H4Heading, Text, H3Heading } from "@/styles"
import Layout from "@/styles/Layout"
import RichTextComponent from "@/utils/RichTextComponent"
import { SanityClient } from "@/utils/Sanity"
import { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import styled from "styled-components"
import Link from "next/link"
import debounce from "lodash.debounce"
import useKeyboardKey, { ESCAPE_KEY } from "@/hooks/useKeyboardKey"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"

const SearchContainer = styled.div`
  height: 55px;
  width: 100%;
  background: white;
  display: flex;
  place-items: center;
  padding: 0 16px;
  border-radius: 0;
  border: 1px solid #115e65;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 45px;
    border: 0.7px solid #115e65;
    padding: 0 8px;
  }
`

const SearchTextInput = styled.input`
  outline: 0;
  border: 0;
  font-size: 18px;
  color: #115e65;
  height: 100%;
  width: 100%;
  max-width: 100%;
  margin-left: 12px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-left: 8px;
    font-size: 15px;
  }
`

const searchQuery = `
  *[_type in ["article", 'blogCategory'] 
        && (
        title match $queryString + '*' 
        || name match $queryString + '*')] 
        | order(publishedAt desc){
          title,
          _id,
          name, 
          summary,
          'slug' : slug.current,
          'type': _type,
          
    }
`

const SearchResult = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  background: #fff;
  padding: 16px 16px;
  position: absolute;
  top: 55px;
  left: 0;
  z-index: 100;
  border: 1px solid #115e65;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    top: 45px;
    border: 0.7px solid #115e65;
    padding: 12px 12px;
  }
`

const SearchItem = styled.ul`
  li {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    li {
    margin-bottom: 18px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  }
`

interface ISearchResult {
  articles: null | Article[]
  blogCategories: null | BlogCategory[]
}

const CustomH2Heading = styled(H2Heading)`
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
  }
`

const ArticleListHero = (props: { blogCategories: BlogCategory[] }) => {
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState<ISearchResult>({
    blogCategories: null,
    articles: null,
  })

  const sanitySearch = async (text: string) => {
    const dataFetch = await SanityClient().fetch(searchQuery, {
      queryString: text,
    })

    const articles = dataFetch.filter((item: any) => item.type === "article")
    const blogCategories = dataFetch.filter(
      (item: any) => item.type === "blogCategory"
    )

    setSearchResult({ articles, blogCategories })
  }

  const executeSearch = useCallback(
    debounce((text: string) => {
      if (text && text.length >= 2) {
        sanitySearch(text)
      }
    }, 350),
    []
  )

  useEffect(() => {
    executeSearch(searchText)
  }, [executeSearch, searchText])

  const resetSearch = () => {
    setSearchText("")
    setSearchResult({ articles: null, blogCategories: null })
  }

  useKeyboardKey({ callback: resetSearch, keyMatch: ESCAPE_KEY })

  return (
    <div>
      <Layout bg="#FFF8F0">
        <CustomH2Heading style={{}} align="center">
          Products Of A{" "}
          <span style={{ marginLeft: "8px" }}>Technical Writer</span>
        </CustomH2Heading>

        <br />

        <div style={{ position: "relative" }}>
          <SearchContainer>
            <FiSearch size={"20px"} color="#115e65" />
            <SearchTextInput
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Find an article or category..."
            />
          </SearchContainer>

          {searchText.length >= 1 && searchResult?.blogCategories?.length >= 1 && (
            <SearchResult>
              <div>
                <Text fontSize="14">BLOG CATEGORIES</Text>
                <hr />
                <br />
              </div>

              <SearchItem>
                {searchResult &&
                  searchResult?.blogCategories?.map(({ _id, name, slug }) => (
                    <li key={_id}>
                      <Link href={`blog/${slug}`}>
                        <div>
                          <H3Heading fontWeight={600}> {name} </H3Heading>
                        </div>
                      </Link>
                    </li>
                  ))}
              </SearchItem>
            </SearchResult>
          )}

          {searchText.length >= 1 && searchResult?.articles?.length >= 1 && (
            <SearchResult>
              <div>
                <Text fontSize="14">ARTICLES</Text>
                <hr />
                <br />
              </div>

              <SearchItem>
                {searchResult &&
                  searchResult?.articles?.map(
                    ({ _id, title, summary, slug }) => (
                      <li key={_id}>
                        <Link href={`blog/${slug}`}>
                          <div>
                            <H4Heading fontWeight={600}> {title} </H4Heading>

                            <RichTextComponent
                              richText={summary}
                              maxTextLength={21}
                            />
                          </div>
                        </Link>
                      </li>
                    )
                  )}
              </SearchItem>
            </SearchResult>
          )}

          {searchText.length >= 1 &&
            searchResult?.articles?.length === 0 &&
            searchResult?.blogCategories?.length === 0 && (
              <SearchResult>
                <div>
                  <br />
                  <Text align="center" fontSize="14">
                    No search results for <b>{searchText}</b>. <br /> Try:{" "}
                    <i>Wales, React.js, AWS, CMS, Travel </i>
                  </Text>
                  <br />
                </div>
              </SearchResult>
            )}
        </div>
      </Layout>
    </div>
  )
}

export default ArticleListHero
