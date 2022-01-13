import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { DiStackoverflow, DiGithubBadge } from "react-icons/di"
import { FiLinkedin, FiTwitter } from "react-icons/fi"
import { CSSTransition } from "react-transition-group"
import media from "styled-media-query"
import { useStaticQuery, graphql } from "gatsby"
import { UserCard, Cards, Card, WaveContainer, SectionText, StyledText, ResponsiveEmoji,  } from '../../styles/home-styles'

import Seo from "../../components/seo"
import GatsbyImage from "../../components/image"
import { CardData } from "../../data"
import {
  HomeBackground,
  Text,
  Title,
  Button,
  center,
  HoverLink,
  Flex,
  StyledIconHover,
} from "../../styles/"
import Contact from "./contact"
import "../../styles/transitions.css"

export const Header = styled.div`
  height: 60px;
  padding: 0 .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #ffff;
  margin-bottom: 1rem;
  ${media.lessThan("medium")`
    padding: 0;
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


const Home = () => {
  const [CurrentView, setCurrentView] = useState("home")

  const data = useStaticQuery(
    graphql`
      query HomeQuery {
        file(relativePath: { eq: "my_avatar.png" }) {
          childImageSharp {
            fixed(height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  return (
    <div style={{ height: "100%" }}>
      <Seo title={"Victory Nwani"} />
      <HomeBackground
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserCard data-testid={"home-card"}>
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
                height: "100%",
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
                  <Flex direction="row">
                    <StyledIconHover>
                      <a
                        href="https://stackoverflow.com/users/9141305/wane01"
                        target="_blank"
                        rel="noopener"
                      >
                        <DiStackoverflow />
                      </a>
                    </StyledIconHover>

                    <StyledIconHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://github.com/vickywane"
                      >
                        <DiGithubBadge />
                      </a>
                    </StyledIconHover>

                    <StyledIconHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
                      >
                        <FiLinkedin />
                      </a>
                    </StyledIconHover>

                    <StyledIconHover>
                      <a href="https://twitter.com/iamnwani01" target="_blank">
                        <FiTwitter />
                      </a>
                    </StyledIconHover>
                  </Flex>

                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/home/experiences"
                  >
                    <Button up>Work Experiences</Button>
                  </Link>
                </div>
              </Header>

              <Grid>
                <div style={{ ...center }}>
                  <GatsbyImage
                    fixed={data?.file?.childImageSharp?.fixed}
                    alt="an avatar of me"
                  />
                </div>

                <div>
                  <WaveContainer
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
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
                    Hello, I'm <b>Nwani Victory</b>
                  </Title>
                  <StyledText align="center">
                    I work as a Frontend Engineer and also an advocate for Cloud
                    Engineering through written articles on Cloud Services as a
                    Technical Author.
                  </StyledText>

                  <StyledText
                    style={{ display: "flex", justifyContent: "center" }}
                    align="center"
                  >
                    Like To Hire Me?
                    <HoverLink onClick={() => setCurrentView("Contact")}>
                      <p> Get In Touch </p>
                    </HoverLink>
                  </StyledText>
                </div>
              </Grid>

              <div>
                <SectionText style={{ display: "flex" }}>
                  <div style={{ ...center }}>
                    <Text>After working hours, i do these things </Text>
                  </div>

                  <ResponsiveEmoji>
                    <span
                      className="emoji"
                      role="img"
                      aria-label={"hand"}
                      aria-hidden={true}
                    >
                      👇🏽
                    </span>
                  </ResponsiveEmoji>
                </SectionText>

                <Cards style={{ marginTop: "10px" }}>
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

                          <div
                            style={{
                              ...center,
                            }}
                          >
                            <Link
                              to={`/${link}`}
                              style={{
                                color: "#fff",
                                textDecoration: "none",
                              }}
                            >
                              <Title
                                small
                                style={{
                                  margin: 15,
                                }}
                                align="center"
                              >
                                {name}
                              </Title>
                            </Link>
                          </div>

                          <div>
                            <Text style={{ margin: 0 }} align="center">
                              {text}
                            </Text>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <HoverLink
                                style={{ display: "flex", marginTop: "10px" }}
                              >
                                <Link
                                  to={`/${link}`}
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                >
                                  <Text
                                    color="orange"
                                    style={{
                                      margin: 0,
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    View {link}
                                  </Text>
                                </Link>
                              </HoverLink>
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
        </UserCard>
      </HomeBackground>
    </div>
  )
}

export default Home
