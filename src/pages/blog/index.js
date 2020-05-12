import React from "react"
import { Link } from "gatsby"

import Quote from "./quote"
import Layout from "../../components/layout"
import Header from "../../components/header"
import { Articles } from "./mockData"
import { Body, Title, Text, CardBody, ArticleGrid } from "../../styles/styles"

const Blog = () => {
  return (
    <Layout>
      <Header title="Articles" />

      <Quote
        maintext='"The best way to learn is by Practicing "'
        quote=" Rob pike, Concatenate Conf 2020"
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
                <Text style={{ color: "#090e3a" }}>{summary}</Text>
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
