import React from "react"
import { IceCream } from "react-kawaii"
import styled from "styled-components"
import { Link } from "gatsby"
import Header from "../../components/header"
import { IoMdCalendar } from "react-icons/io"
import media from "styled-media-query"
import data from '../../data/data.json'

import { HomeBackground, Button, Title, Text, IconHover } from "../../styles/"

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
  padding: 1rem 0.5rem;
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
  &:hover {
    cursor: pointer;
  }
`

const TitleHover = styled.a`
  text-decoration: none;
  color: orange;
  transition: all 300ms;
  padding: 0 0.5rem;
  &:hover {
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
            "Technical writing is a continuous process of learning ...."
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
            {data.blog.map(({ title, link, description, date }) => (
              <Card>
                <div style={{ display: "flex" }}>
                  <IconHover style={{ marginTop: "3px", marginRight: "5px" }}>
                    <IoMdCalendar />
                  </IconHover>

                  <Text small color="white">
                    {date}
                  </Text>
                </div>

                <TitleHover href={link}>
                  <Title color="white">{title}</Title>
                </TitleHover>
                <Text color="white">{description} </Text>

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
