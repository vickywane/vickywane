import React from "react"
import styled from "styled-components"
import { Quote, QuoteContainer, Text } from "../../styles/styles"
import media from "styled-media-query"

import hooks from "../hooks"

const Tag = styled.div`
  padding: 0.5rem 1rem;
  height: auto;
  transition: all 400ms;
  border-top: 2px solid #fff;
  border-style: dashed;
  width: 70rem;
  justify-content: center;
  div {
    display: flex;
  }
  ${media.lessThan("large")`
    width : 70rem;
    height: auto;
      div {
    display: flex;
  }
  `};
  ${media.lessThan("medium")`
    width : auto;
    height: auto;
    div {
    display: grid;
    grid-gap: 1rem 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    }
    margin : 0rem 0.5rem;
  `};
  ${media.lessThan("small")`
    width : auto;
    margin : 0rem 1rem;
    height: auto;
    div {
    display: grid;
    grid-gap: 1rem 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
    }
    `};
`

const QuoteComponent = props => {
  const { maintext, quote, text, showTags, tags } = props

  const Width = hooks()

  return (
    <QuoteContainer>
      <Quote>{maintext}</Quote>
      <Text>
        <i> - {quote} </i>
      </Text>

      <br />
      <br />
      {showTags ? (
        <div
          style={{
            display: Width >= 800 ? "flex" : null,
            justifyContent: Width >= 800 ? "center" : null,
          }}
        >
          <Tag>
            <div>
              {tags.map(tag => {
                return (
                  <Text
                    style={{ textAlign: "center", margin: "0rem 1rem" }}
                    white
                  >
                    {tag}
                  </Text>
                )
              })}
            </div>
          </Tag>
        </div>
      ) : null}
      <Text center> {text} </Text>
    </QuoteContainer>
  )
}

export default QuoteComponent
