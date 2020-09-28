import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "gatsby"
import { DiStackoverflow, DiGithubBadge } from "react-icons/di"
import { FiLinkedin, FiTwitter, FiBookOpen, FiCode } from "react-icons/fi"
import { CSSTransition } from "react-transition-group"

import { CardData } from "../../data"
import { HomeBackground, Text, Title, Button, center } from "../../styles/"
import Experiences from "./experiences"

const UserCard = styled.div`
  background-color: #282c34;
  height: 85%;
  width: 70%;
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
  a {
    text-decoration: none;
    color: #fff;
  }
  &: hover {
    background: #141821;
    cursor: pointer;
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
  padding: 2rem 1rem;
  width: 18rem;
  border-radius: 4px;
  transition: all 350ms;
  background: #141821;
  border: 1px solid #141821;
  &: hover {
    transform: translateY(-5%);
    box-shadow: 0 1px 2px black;
  }
`

const WavingHand = keyframes`
from {
  transform: rotate(30deg);
}
to {
  transform: rotate(0deg);
}
`

const Wave = styled.img`
  height: 110px;
  width: 110px;
  object-fit: contain;
  animation: ${WavingHand} 1000ms ease-in-out 0s 300ms;
`

const StyledText = styled(Text)`
  padding: 0 5rem;
`

const Home = () => {
  const [CurrentView, setCurrentView] = useState("home")

  return (
    <div style={{ height: "100vh" }}>
      <HomeBackground>
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
                      <a
                        href="https://stackoverflow.com/users/9141305/wane01"
                        target="_blank"
                        rel="noopener"
                      >
                        <DiStackoverflow style={{ fontSize: "1.5rem" }} />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://github.com/vickywane"
                      >
                        <DiGithubBadge style={{ fontSize: "1.5rem" }} />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
                      >
                        <FiLinkedin style={{ fontSize: "1.5rem" }} />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a href="" target="_blank">
                        <FiTwitter style={{ fontSize: "1.5rem" }} />
                      </a>
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
                  <StyledText align="center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium numquam quidem autem, quisquam dicta eos
                    mollitia. Alias molestiae consequuntur iste saepe illo.
                    Velit cum corrupti quasi sed dolore, amet esse!
                  </StyledText>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={{ padding: "0 3rem" }}> Contact Me </Button>
                  </div>
                </div>
              </Grid>
              <br />
              <br />

              <Text style={{ paddingLeft: "3rem" }}>
                {" "}
                Outside my working hours, i do the following :{" "}
              </Text>
              <Cards>
                {CardData.map(({ id, name, text, icon }) => {
                  return (
                    <Card key={id}>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "15px",
                          }}
                        >
                          {icon}
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
    </div>
  )
}

export default Home
