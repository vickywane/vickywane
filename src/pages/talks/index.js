import React from "react"
import { Ghost } from "react-kawaii"
import styled from "styled-components"
import { Link } from "gatsby"

import { HomeBackground, Button, Text, Title, center , HoverLink } from "../../styles/"

const Card = styled.div`
  background-color: #282c34;
  width: 30rem;
  height: auto;
  padding: 1rem 1rem;
  border-radius: 10px;
`

function index() {
  return (
    <HomeBackground style={{ height: "100vh", ...center }}>
      <Card>
        <div>
          <Link to="/">
            <Button> Back To Home </Button>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ghost size={220} mood="excited" />
        </div>
        <br />
        <Title align="center" small color="white">
          Ooops, i haven't spoken at any event just yet.
        </Title>

        <div>
          <Text style={{ padding: 0, margin: 0 }} color="white" align="center">
            Do you organize technical events ?
          </Text>
          <Text color="white" align="center">
            Please
            <span style={{ textDecorationStyle: "wavy" }}> drop a line </span>,
            i would love to give a talk based on my
            <Link style={{textDecoration : "none"}} to="/blog"> <HoverLink> written articles </HoverLink></Link>
          </Text>
        </div>
      </Card>
    </HomeBackground>
  )
}

export default index
