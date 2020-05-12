import React from "react"
import styled from "styled-components"

import Quote from "./quote"
import Layout from "../../components/layout"
import Header from "../../components/header"
import { Body, Title, Text } from "../../styles/styles"

const Ref = styled.a`
  transition: all 400ms;
  text-decoration: none;
  padding: 0.2rem 0.2rem;
  color: green;
  &: hover {
    border-bottom: 2px solid blue;
    cursor: pointer;
  }
`

const Article = () => {
  return (
    <Layout>
      <Header title="Articles" link="blog" />
      <Quote
        showTags={true}
        maintext="Leveraging Google Cloud Run"
        quote="A Test Deployment of Oasis to the cloud"
        tags={[
          "GCP",
          "Golang",
          "Postgres",
          "Gqlgen",
          "Cloud Run",
          "Containerization",
          "Docker",
          "DevOps",
        ]}
      />
      <br />
      <Body>
        <Body>
          <Text>
            Recently, i spent some time working on a fun side project of called
            <Ref
              style={{ textDecoration: "none" }}
              href="https://my-event.netlify.com"
            >
              Oasis
            </Ref>
            and i felt the backend part was ready for some live testing. Since
            the backend graphql api was written with
            <Ref style={{ textDecoration: "none" }} href="">
              Golang
            </Ref>
            using
            <Ref href=" " style={{ textDecoration: "none" }}>
              Gqlgen
            </Ref>
            and storing into a
            <Ref style={{ textDecoration: "none" }} href="">
              Postgres Database
            </Ref>
            ,
            <Ref style={{ textDecoration: "none" }} href="">
              Containerization
            </Ref>
            of the entire layer was something i did to make my workflow easier.
          </Text>

          <Text>
            Next, was where to deploy the entire image to without much expenses
          </Text>
        </Body>
      </Body>
      <br />
      <br />
    </Layout>
  )
}

export default Article
