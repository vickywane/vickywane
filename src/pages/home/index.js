import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { DiStackoverflow, DiGithubBadge } from "react-icons/di"
import { FiLinkedin, FiTwitter } from "react-icons/fi"
import { CSSTransition } from "react-transition-group"

import { CardData } from "../data"
import { HomeBackground, Text, Title, Button, center } from "../../styles/"
import Experiences from "./experiences"

const UserCard = styled.div`
  background-color: #282c34;
  height: 80%;
  width: 60%;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 7px;
  box-shadow: 0 2px 3px black;
`

const Image = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: contain;
`

export const Header = styled.div`
  height: 60px;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #ffff;
  margin-bottom: 1rem;
`

export const StyledHover = styled.div`
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 350ms;
  margin: 0 0.7rem;
  &: hover {
    background: #141821;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  grid-gap: 1rem 3rem;
  place-items: center;
`

const Cards = styled.div`
  display: grid;
  grid-gap: 1rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  place-items: center;
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  width: 18rem;
  border-radius: 2px;
  transition: all 350ms;
  background: #141821;
  border: 1px solid #141821;
  &: hover {
    transform: translateY(-10%);
    box-shadow: 0 1px 2px black;
  }
`

const Wave = styled.img`
  height: 110px;
  width: 110px;
  object-fit: contain;
`

const Home = () => {
  const [CurrentView, setCurrentView] = useState("home")

  return (
    <HomeBackground style={{ height: window.innerHeight }}>
      <br />
      <UserCard>
        <CSSTransition
          in={CurrentView === "home"}
          unmountOnExit
          timeout={300}
          classNames={""}
        >
          <div>
            <Header>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <StyledHover>
                    <DiStackoverflow style={{ fontSize: "1.6rem" }} />
                  </StyledHover>

                  <StyledHover>
                    <DiGithubBadge style={{ fontSize: "1.6rem" }} />
                  </StyledHover>

                  <StyledHover>
                    <FiLinkedin style={{ fontSize: "1.6rem" }} />
                  </StyledHover>

                  <StyledHover>
                    <FiTwitter style={{ fontSize: "1.6rem" }} />
                  </StyledHover>
                </div>

                <Button onClick={() => setCurrentView("experiences")} up>
                  Work Experiences
                </Button>
              </div>
            </Header>
            <Grid>
              <div style={{ ...center }}>
                <Image
                  src={require("../../images/my_avatar.png")}
                  alt="an avatar of me"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Wave
                    alt="waving greet hand"
                    src={require("../../images/waving.png")}
                  />
                </div>

                <Title align="center"> Hi , I'm Nwani Victory </Title>
                <Text align="center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium numquam quidem autem, quisquam dicta eos mollitia.
                  Alias molestiae consequuntur iste saepe illo. Velit cum
                  corrupti quasi sed dolore, amet esse!
                </Text>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button style={{ padding: "0 3rem" }}> Contact Me </Button>
                </div>
              </div>
            </Grid>
            <br />
            <br />
            <Cards>
              {CardData.map(({ id, name, text }) => {
                return (
                  <Card key={id}>
                    <div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Wave
                          alt="reading lamp"
                          src={require("../../images/lamp.png")}
                        />
                      </div>

                      <Title
                        style={{ padding: "0 10px", margin: "0 10px" }}
                        align="center"
                      >
                        {" "}
                        {name}{" "}
                      </Title>
                      <Text align="center"> {text} </Text>
                    </div>
                  </Card>
                )
              })}
            </Cards>
          </div>
        </CSSTransition>

        <CSSTransition
          in={CurrentView === "experiences"}
          unmountOnExit
          timeout={300}
          classNames={""}
        >
          <Experiences setView={val => setCurrentView(val)} />
        </CSSTransition>
      </UserCard>
    </HomeBackground>
  )
}

export default Home
