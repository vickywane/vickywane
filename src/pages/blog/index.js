import React from "react"
import { IceCream } from "react-kawaii"
import styled from "styled-components"
import { Link } from "gatsby"
import Header from "../../components/header"
import { FiClock } from "react-icons/fi"
import media from "styled-media-query"

import {
  HomeBackground,
  Button,
  Title,
  Text,
  center,
  IconHover,
} from "../../styles/"

const Grid = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Card = styled.div`
  background-color: #282c34;
  width: 95%;
  height: auto;
  padding: 1rem 1rem;
  border-radius: 5px;
  margin: 1rem 0.5rem;
`

const Body = styled(HomeBackground)`
  padding: 1rem 1rem;
  height: calc(100vh - 60px);
  overflow: auto;
  display: flex;
  justify-content: center;
`

const BodyContent = styled.div`
  max-width: 1300px;
`

const Org = styled.div`
  padding: 0.7rem 1rem;
  border-radius: 15px;
  border: 1px dashed #fff;
  color: #fff;
  text-align: center;
  width: 15rem;
  &: hover {
    cursor: pointer;
  }
`

const data = [
  {
    id: 3,
    title:
      "Building A Conversational N.L.P Enabled Chatbot Using Google’s Dialogflow",
    description:
      "The 2019 Capgemini research institute’s report published after a research on the use of chat assistants showed a drastic 76% increase in customer satisfaction from organizations where chat assistants where built and incorporated into their services. But how does Dialogflow, a product from Google’s ecosystem aid developers in building chat assistants and contribute to this quota?.",
    link: "#",
    date: "Dec 10, 2020",
  },
  {
    id: 1,
    title:
      "Building Serverless Front-End Applications Using Google Cloud Platform",
    description:
      "The use of serverless applications by developers to handle the business logic of their applications in on the high increase, but how does the Google Cloud — a major service provider within the public cloud — allow developers to manage serverless applications? In this article, you will learn what serverless applications are, how they are used on the Google Cloud, and also scenarios in which they can be used in a front-end application.",
    link:
      "https://www.smashingmagazine.com/2020/11/serverless-frontend-applications-google-cloud-platform/",
    date: "Nov 6, 2020",
  },
  {
    id: 2,
    title:
      "How To Manage File Uploads In React With Google Storage And GraphQL",
    description:
      " From a user’s profile picture to other media assets, data collection and storage to cloud services through file uploads have become an essential feature for most modern applications. In this article, you will learn how file uploads can be implemented in a GraphQL application.",
    link:
      "https://www.smashingmagazine.com/2020/10/file-uploads-react-apollo-google-storage-graphql/",
    date: "Oct 8, 2020",
  },

  {
    id: 4,
    title: "Django Setup Tutorial",
    description:
      "After several years of constant updates and improvements, the Django [/dʒængʊ/] web framework has proven to be one of the most powerful and useful framework for building Database — Driven web applications due to its MVC-style architecture. It has been argued that Django follows the MVT pattern but for simplicity sake i would refer to it as MVC",
    link: "https://medium.com/@vickywane/django-setup-tutorial-2fb4b33da592",
    date: "Nov 15, 2018",
  },

  {
    id: 4,
    title: "Wireless Network Communities",
    description:
      "Ever since the invention of the internet, several factors have made the internet a bit inaccessible, due to high connection fees, poor connection speeds, security and several other hardware malfunctions. It is refreshing to note that solutions to these problems are being provided by well meaning individuals, organization and start-ups that have come together to provide a solution to these challenges through the invention of “Wireless Community Networks”",
    link:
      "https://medium.com/@vickywane/wireless-network-communities-d41a4a8a3657",
    date: "Nov 20, 2018",
  },
]

const TitleHover = styled.a`
  text-decoration: none;
  color: orange;
  transition: all 300ms;
  padding: 0.5rem;
  &: hover {
    text-decoration: underline;
  }
`

function index() {
  return (
    <div style={{ height: "100%" }}>
      <Header />

      <Body>
        <BodyContent>
          <Title color="white" align="center">
            " Technical writing is a continuous process of learning ...."
          </Title>

          <Text align="center" color="white">
            Through my written articles, i pen down my thought process for
            others to read, learn and argue upon thus refining what i think i
            know.
          </Text>

          {/* <div>
            <Org> Smashing Magazine </Org>
          </div> */}
          <hr style={{ background: "white" }} />

          <Grid>
            {data.map(({ title, link, description, date }) => (
              <Card>
                <div style={{ display: "flex" }}>
                  <IconHover style={{ marginTop: "3px", marginRight: "5px" }}>
                    <FiClock />
                  </IconHover>

                  <Text small color="white">
                    {date}
                  </Text>
                </div>
                <TitleHover href={link}>
                  <Title color="white">{title}</Title>
                </TitleHover>
                <Text color="white">{description} </Text>
                <br />

                <a href={link}>
                  <Button> Continue Reading ... </Button>
                </a>
              </Card>
            ))}
          </Grid>
        </BodyContent>
      </Body>
    </div>
  )
}

export default index
