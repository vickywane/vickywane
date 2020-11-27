import React from "react"
import { IceCream } from "react-kawaii"
import styled from "styled-components"
import { Link } from "gatsby"
import Header from "../../components/header"
import media from "styled-media-query"

import { HomeBackground, Button, Title, Text, center } from "../../styles/"

const Grid = styled.div`
  padding: 1rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
  grid-gap: 2rem 2rem;
  ${media.lessThan("large")`
    grid-gap: 3rem 1rem;
    padding: 1rem .5rem;
     grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  `};
`

const Card = styled.div`
  background-color: #282c34;
  width: 25rem;
  height: auto;
  padding: 1rem 1rem;
  border-radius: 10px;
`

const Body = styled(HomeBackground)`
  padding: 1rem 1rem;
  height: calc(100vh - 60px);
  overflow: auto;
  display: flex;
  justify-content: center;
`

const BodyContent = styled.div`
  max-width: 1000px;
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

function index() {
  return (
    <div style={{ height: "100%" }}>
      <Header />

      <Body>
        <BodyContent>
          <Title color="white">Lorem Ipsum Generator Generated</Title>
          <Text align="left" color="white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            voluptate minima temporibus recusandae totam magni error quia nemo
            quaerat consequuntur.
          </Text>
          <div>
            <Org> Smashing Magazine </Org>
          </div>
          <br />

          <Grid>
            {Array(5)
              .fill("")
              .map(() => (
                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IceCream size={220} />
                  </div>

                  <Title align="center" small color="white">
                    This space is currently under development and would be
                    rolled out soon{" "}
                  </Title>
                  <br />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/">
                      <Button> Back To Home </Button>
                    </Link>
                  </div>
                </Card>
              ))}
          </Grid>
        </BodyContent>
      </Body>
    </div>
  )
}

export default index
