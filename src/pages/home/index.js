import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "gatsby"
import { DiStackoverflow, DiGithubBadge } from "react-icons/di"
import { FiLinkedin, FiTwitter, FiBookOpen, FiCode } from "react-icons/fi"
import { CSSTransition } from "react-transition-group"
import media from "styled-media-query"
import { FiMail } from "react-icons/fi"

import { CardData } from "../../data"
import { HomeBackground, Text, Title, Button, center } from "../../styles/"
import Experiences from "./experiences"
import Contact from "./contact"
import Emoji from "../../components/emoji"
import "../../styles/transitions.css"

const UserCard = styled.div`
  background-color: #282c34;
  height: 85%;
  transition: all 300ms;
  width: 75%;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 7px;
  box-shadow: 0 2px 3px black;
  ${media.lessThan("huge")`
    height: 95%;
    width: 95%;
  `};
  ${media.lessThan("large")`
    height: 90%;
    width: 90%;
  `};
`

const Image = styled.img`
  border-radius: 50%;
  width: 170px;
  height: 170px;
  object-fit: contain;
  ${media.lessThan("large")`
    width: 130px;
    height: 130px;
  `};
`

export const Header = styled.div`
  height: 60px;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #ffff;
  margin-bottom: 1rem;
  ${media.lessThan("medium")`
    padding: 0;
  `};
`

export const StyledHover = styled.div`
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 350ms;
  margin: 0 0.5rem;
  a {
    text-decoration: none;
    color: #fff;
  }
  &: hover {
    background: #141821;
    cursor: pointer;
  }
  ${media.lessThan("large")`
    padding: 0.3rem 0.4rem;
    margin: 0 0.4rem;
  `};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  grid-gap: 1rem 3rem;
  place-items: center;
  ${media.lessThan("large")`
      display : flex;
      flex-direction : column;
      align-items : center;
  `};
`

const Cards = styled.div`
  display: grid;
  grid-gap: 1rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  place-items: center;
  ${media.lessThan("large")`
    grid-gap: 1rem 1rem;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  `};
  ${media.lessThan("medium")`
      display : flex;
      flex-direction : column;
      align-items : center;
  `};
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  width: 20rem;
  border-radius: 4px;
  transition: all 350ms;
  background: #141821;
  border: 1px solid #141821;
  span {
    h3 {
      margin-top: 10px;
    }
  }
  &: hover {
    cursor: pointer;
    transform: translateY(-5%);
    box-shadow: 0 1px 2px black;
  }
  ${media.lessThan("large")`
    width: 16rem; 
    padding: 0.5rem 0.5rem;
  `};
  ${media.lessThan("medium")`
  height : 8vh;
  width: 25rem; 
  padding: 0.5rem 0.5rem;
  span {
    display : flex;
    flex-direction   : row;
    h3 {
      margin-top: 3px;
    }
    p {
      display : none;
    }
  }
`};
`

const WaveContainer = styled.div`
  margin: 2rem 0;
  span {
    font-size: 4rem;
  }
  ${media.lessThan("huge")`
  margin : 0;
  span {
     display : none;
  }
  `};
`

const StyledText = styled(Text)`
  padding: 0 5rem;
  ${media.lessThan("huge")`
  padding: 0 3rem;
`};
  ${media.lessThan("large")`
    padding: 0 5rem;
  `};
  ${media.lessThan("medium")`
  padding: 0 2rem;
`};
`

const Home = () => {
  const [CurrentView, setCurrentView] = useState("home")

  return (
    <div style={{ height: "100vh" }}>
      <HomeBackground>
        <UserCard>
          <CSSTransition
            in={CurrentView === "Contact"}
            unmountOnExit
            timeout={300}
            classNames={"contact"}
          >
            <Contact setView={val => setCurrentView(val)} />
          </CSSTransition>

          <CSSTransition
            in={CurrentView === "home"}
            unmountOnExit
            timeout={300}
            classNames={""}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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
                        <DiStackoverflow style={{ fontSize: "1.4rem" }} />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://github.com/vickywane"
                      >
                        <DiGithubBadge style={{ fontSize: "1.4rem" }} />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
                      >
                        <FiLinkedin style={{ fontSize: "1.4rem" }} />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a href="https://twitter.com/iamnwani01" target="_blank">
                        <FiTwitter style={{ fontSize: "1.4rem" }} />
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
                  <WaveContainer
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <span
                      className="emoji"
                      role="img"
                      aria-label={"hand"}
                      aria-hidden={true}
                    >
                      ✌🏽
                    </span>
                  </WaveContainer>
                  <Title
                    style={{ padding: "10px 0", margin: 0 }}
                    align="center"
                  >
                    Hi , I'm Nwani Victory
                  </Title>
                  <StyledText align="center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium numquam quidem autem, quisquam dicta eos
                    mollitia.
                  </StyledText>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      onClick={() => setCurrentView("Contact")}
                      style={{ padding: "0 3rem", ...center }}
                    >
                      <div style={{ margin: "0 .5rem", ...center }}>
                        <FiMail style={{ fontSize: "1.4rem" }} />
                      </div>
                      Contact Me
                    </Button>
                  </div>
                </div>
              </Grid>
              <br />
              <div>
                <div style={{ display: "flex" }}>
                  <Text style={{ paddingLeft: "3rem", margin: "0 .7rem" }}>
                    Outside my working hours, i do the following
                  </Text>

                  <Emoji label="down" symbol="👇🏽" size="1.6rem" />
                </div>
                <Cards>
                  {CardData.map(({ id, name, text, icon, link }) => {
                    return (
                      <Card key={id}>
                        <span>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {icon}
                          </div>

                          <div style={{ ...center }}>
                            <Link
                              to={`/${link}`}
                              style={{ color: "#fff", textDecoration: "none" }}
                            >
                              <Title
                                small
                                style={{ padding: "0 10px" }}
                                align="center"
                              >
                                {name}
                              </Title>
                            </Link>
                          </div>

                          <div>
                            <Text align="center"> {text} </Text>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Link to={`/${link}`} style={{ color: "#fff" }}>
                                <Text style={{ textTransform: "capitalize" }}>
                                  View {link}
                                </Text>
                              </Link>
                            </div>
                          </div>
                        </span>
                      </Card>
                    )
                  })}
                </Cards>
              </div>
            </div>
          </CSSTransition>

          <CSSTransition
            in={CurrentView === "experiences"}
            unmountOnExit
            timeout={300}
            classNames={"work"}
          >
            <Experiences setView={val => setCurrentView(val)} />
          </CSSTransition>
        </UserCard>
      </HomeBackground>
    </div>
  )
}

export default Home
