import React, { useEffect, useState } from "react"
import { Text, Flex, H3Heading } from "@/styles"
import styled from "styled-components"
import Link from "next/link"
import {
  useMediaQuery,
} from "@/styles/useStyleWidthQuery"

const CategoriesCard = styled(Flex)`
  position: fixed;
  background: white;
  width: 410px;
  left: 150px;
  margin-top: 24px;
  padding: 15px;
  border: .8px solid #000;
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

const QuickCategoriesCard = ({ blogCategories }: { blogCategories: any }) => {
  const [activeCategory, setActiveCategory] = useState("")

  useEffect(() => {
    setActiveCategory(blogCategories[0].slug.current)
  }, [])

  const isScreenSmall = useMediaQuery(2300)

  return (
    <div>
      {!isScreenSmall && (
        <CategoriesCard direction="column">
          <Flex direction="column">
            <H3Heading> Quick Categories </H3Heading>
            <hr />
            <br />
          </Flex>

          <ul style={{}}>
            {blogCategories?.map(({ name, slug }, idx) => (
              <LinkItem
                key={idx}
                active={activeCategory === slug.current}
                style={{ margin: "18px 0" }}
                onClick={() => setActiveCategory(slug.current)}
              >
                <Link href={`#${slug.current}`}>
                  <Text> {name} </Text>
                </Link>
              </LinkItem>
            ))}
          </ul>
        </CategoriesCard>
      )}
    </div>
  )
}

export default QuickCategoriesCard
