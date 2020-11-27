import React from "react"
import { IceCream } from "react-kawaii"
import styled from "styled-components"
import { Link } from "gatsby"
import Header from "../../components/header"

import { HomeBackground, Button, Title, Text, center } from "../../styles/"

const Card = styled.div`
  background-color: #282c34;
  width: 30rem;
  height: auto;
  padding: 1rem 1rem;
  border-radius: 10px;
`
function index() {
  return (
    <div style={{ height: "100%", overflow: "none" }}>
      <Header />

      <HomeBackground style={{ height: "calc(100vh - 60px)", ...center }}>
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
            This space is currently under development and would be rolled out
            soon{" "}
          </Title>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/">
              <Button> Back To Home </Button>
            </Link>
          </div>
        </Card>
      </HomeBackground>
    </div>
  )
}

export default index
