import React from "react"
import { Quote, QuoteContainer, Text, Tag } from "../../styles/styles"

import hooks from "../hooks"

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
      <Text center white>
        {" "}
        {text}{" "}
      </Text>
    </QuoteContainer>
  )
}

export default QuoteComponent
