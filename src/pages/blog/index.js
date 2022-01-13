import React from "react"
import { IceCream } from "react-kawaii"
import styled from "styled-components"
import Header from "../../components/header"
import { IoMdCalendar } from "react-icons/io"
import data from "../../data/data.json"
import Seo from "../../components/seo"
import media from "styled-media-query"
import Layout from '../../components/layout'

import {
  HomeBackground,
  HoverLink,
  Button,
  Title,
  Text,
  IconHover,
} from "../../styles/"

const Grid = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.lessThan("medium")`
    padding: .4rem .2rem;
   `};
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

const BrandsList = styled.div`
  display: grid;
  grid-gap: 1rem 2rem;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  img {
    width: 8rem;
    height: 40px;
    object-fit: contain;
  }
  ${media.lessThan("medium")`
      img {
        width: 6rem;
        height: 35px;
      }
  `};
`

function index() {
  return (
    <Layout style={{ height: "100%" }}>
      <Seo title={"Blog"} />
      <Header />

      <Body>
        <BodyContent>
          <Title color="white" align="center">
            "Technical writing is a continuous process of learning ...."
          </Title>

          <Text align="center" color="white">
            Through my written articles, i pen down my thought process as a
            Technical Author <br /> for the Organizations below, for others to
            read, learn and argue upon thus refining what i think i know.
          </Text>

          <BrandsList id={"brands-list"}>
            <img src={require("../../images/brands/strapi-logo-light.svg")} />
            <img src={require("../../images/brands/smashingmag-logo.svg")} />
            <img src={require("../../images/brands/webiny-.png")} />
            <img
              src={require("../../images/brands/rancher-logo-horiz-color.png")}
            />
            <img src={require("../../images/brands/egghead.png")} />
            <img src={require("../../images/brands/ContentLab-logo.png")} />
          </BrandsList>
          <br />
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

                <HoverLink>
                  <a href={link}>
                    <Title color="white">{title}</Title>{" "}
                  </a>
                </HoverLink>
                <Text color="white">{description} </Text>

                <Button>
                  <a href={link}>Continue Reading ...</a>
                </Button>
              </Card>
            ))}
          </Grid>
        </BodyContent>
      </Body>
    </Layout>
  )
}

export default index
