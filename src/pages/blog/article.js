import React from "react"
import styled from "styled-components"
import media from "styled-media-query"

import Quote from "./quote"
import Layout from "../../components/layout"
import Header from "../../components/header"
import { Body, Title, Text, Ref } from "../../styles/styles"
import Gist from "./embed"

const QuoteText = styled.div`
  padding: 1rem 1rem;
  margin: 1rem 0rem;
  word-spacing: 0.2rem;
  height: auto;
  width: auto;
  background: #f3f3f3;
  border-right: 7px solid #591af7;
  h5 {
    font-weight: 400;
    line-height: 2.7rem;
    font-size: 1.55rem;
  }
  p {
    color: #1b2f7d;
    text-align: center;
  }
  ${media.lessThan("medium")`
     h5 {
    font-weight: 400;
    line-height: 2.3rem;
    font-size: 1.4rem;
  }
`};
  ${media.lessThan("small")`
     h5 {
    font-weight: 400;
    line-height: 2rem;
    font-size: 1.3rem;
  }
`};
`

const Label = styled.label`
  font-size: 1.7rem;
  font-weight: 550;
  list-style: round;
  padding: 2rem 1rem 0rem;
  ${media.lessThan("medium")`
      font-size: 1.5rem;
  font-weight: 500;
`};
  ${media.lessThan("small")`
       font-size: 1.4rem;
  font-weight: 450;
`};
`

const CodeBody = styled.code`
  padding: 2rem 1rem;
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
      <Body article>
        <Body article>
          <section>
            <Text article>
              I recently spent some time building a Golang written backend for
              <Ref
                style={{ textDecoration: "none" }}
                href="https://my-event.netlify.com"
              >
                Oasis
              </Ref>
              and when it was ready for live testing I came across an article
              written by{" "}
              <Ref
                style={{ textDecoration: "none" }}
                href="https://my-event.netlify.com"
              >
                Timothy Okeke{" "}
              </Ref>{" "}
              on Google Cloud Run. Here is my usecase on how I used it for a
              Golang written Graphql API connected to a Postgres Cloud Instance
              and also did tracing using{" "}
              <Ref style={{ textDecoration: "none" }} href="/">
                Datadog{" "}
              </Ref>{" "}
              .
            </Text>
            <br /> <Label> What is the Google Cloud Run ? </Label>{" "}
            <QuoteText>
              <h5>
                &quot; Cloud Run is a fully managed compute platform that
                automatically scales your stateless containers. Cloud Run is
                serverless: it abstracts away all infrastructure management, so
                you can focus on what matters most—building great applications.
                &quot;
              </h5>
              <p> - Google Cloud Docs </p>{" "}
            </QuoteText>
            <Text article>
              Simply put, it is a way to host stateless containers and it takes
              a way infrastructure management such as [[[]]]. It supports any
              programming language on which the image is built. These seemed
              great, however here is what exactly drew me to Cloud Run;
            </Text>
            <br />
            <Label> Benefits </Label>
            <QuoteText>
              <h5>
                &quot; It automatically scales up and down from zero depending
                on traffic almost instantaneously. Cloud Run only charges you
                for the exact resources you use. &quot;
              </h5>{" "}
              <p> - Google Cloud Docs </p>
            </QuoteText>
            <Text article>
              This means it freezes the container in absence of http traffic or
              when the container is not serving any request, such as people
              making requests to the endpoint. This made a lot of sense for me.
              Since it was only for testing, I didn’t want to get billed;
              considering I would only test for some few hours. More
              documentation can be found at the{" "}
              <Ref
                style={{ textDecoration: "none" }}
                href="https://cloud.google.com/run."
              >
                Google Cloud Docs{" "}
              </Ref>
              Asides this, Cloud Run also integrates with partner technologies.
              In my usecase, I needed Datadog to perform tracing on the graphql
              Api. List of supported technologies that can be integrated are
              listed within the Cloud Run{" "}
              <Ref
                style={{ textDecoration: "none" }}
                href="https://cloud.google.com/run#partners"
              >
                {" "}
                Documentation{" "}
              </Ref>
            </Text>
            <br />
            <Label> Deployment </Label>
            <Text article>
              Containers can be fired up on Cloud Run after they have been
              deployed to the{" "}
              <Ref
                style={{ textDecoration: "none" }}
                href="https://cloud.google.com/run#partners"
              >
                Google Container Registry
              </Ref>
              , this also makes it easy to add existing images here is a link on
              how to deploy local images to the container registry using the
              cloud sdk . [[]] I used docker-compose to build the images into
              multi-stage containers and here is a copy of my dockerfile; Also
              my docker-compose.yml
            </Text>
            <Gist id="vickywane/7b28555c61f35b2697a3f347a7162059" />{" "}
            <Text> Here is a copy of my docker-compose file</Text>
            <Gist id="vickywane/9b28f6b64cd481c4ca57c9028ffe96ed" /> <br />
            <CodeBody> cos </CodeBody>
            <br />
            <Label> Using Datadog </Label>
          </section>
        </Body>
      </Body>
      <br />
      <br />
    </Layout>
  )
}

export default Article
