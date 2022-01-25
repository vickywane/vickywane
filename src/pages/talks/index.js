import React from "react"
import { Ghost } from "react-kawaii"
import styled from "styled-components"
import { Link } from "gatsby"

import Layout from '../../components/layout'
import Seo from '../../components/seo'
import TalkData from "../../data/data.json"
import Header from "../../components/header"

import { HomeBackground, PageContent, PageBody, Button, Text, Title, center, HoverLink, ProjectCard } from "../../styles/"

const Card = styled.div`
  background-color: #282c34;
  width: 30rem;
  height: auto;
  padding: 1rem 1rem;
  border-radius: 10px;
`

function index() {
  return (
    <Layout>
      <Seo />
      <Header />

      <PageBody>
        <PageContent>
          {TalkData.talks.map(({ title, summary, type, external_link }) => (
            <Card>
              <Title color="white" > {title} </Title>
              <br />
              <Text color="white" > {summary} </Text>

              <br />
              <a href={external_link} target="_blank" >
                 <Button> {type === "talk" ? "View Recorded Talk" : "Listen to Podcast"}  </Button>
              </a>
            </Card>
          ))}
        </PageContent>
      </PageBody>
    </Layout>
  )
}

export default index
