import React from "react"
import { Link } from "gatsby"

import Quote from "./quote"
import Layout from "../../components/layout"
import Header from "../../components/header"
import { Body, Title, Text, CardBody, ArticleGrid } from "../../styles/styles"

const Articles = [
  {
    id: 1,
    title: "Optimising Google Cloud Run For Individual Use",
    summary:
      " The Google Cloud Run provides a way to deploy stateless containers to the cloud while minimising the cost by only keeping it running in presence of http traffic. Here is an example of how i leveraged this feature for my individual use ",
  },
]

const Blog = () => {
  return (
    <Layout>
      <Header title="Articles" />

      <Quote
        maintext='"The best way to learn is by Practicing "'
        quote="Someone learning PHP somewhere"
        text="All articles written here are drawn from real - life engineering
          expreriences and experiments."
      />
      <br />
      <br />
      <Body>
        <ArticleGrid>
          {Articles.map(({ id, title, summary }) => {
            return (
              <CardBody key={id}>
                <Link
                  to="/blog/article"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Title small colored>
                    {title}
                  </Title>
                </Link>
                <br />
                <Text style={{ color: "#090e3a" }}>{summary}</Text> <hr />{" "}
                <Text center> 12 - 12 - 12 </Text>
              </CardBody>
            )
          })}
        </ArticleGrid>
      </Body>
      <br />
      <br />
    </Layout>
  )
}

export default Blog
