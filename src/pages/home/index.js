import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { DiStackoverflow, DiGithubBadge } from "react-icons/di"
import { FiLinkedin, FiTwitter } from "react-icons/fi"
import { CSSTransition } from "react-transition-group"
import media from "styled-media-query"
import { useStaticQuery, graphql } from "gatsby"

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
} from "../../styles/"
import Contact from "./contact"
import "../../styles/transitions.css"

const UserCard = styled.div`
  background-color: #282c34;
  height: 85%;
  overflow: auto;
  transition: all 300ms;
  width: 70%;
  color: #fff;
  padding: 0.5rem 1rem 2rem 1rem;
  border-radius: 7px;
  max-width: 1300px;
  margin: 0 auto;
  box-shadow: 24px 31px 21px -8px rgba(0, 0, 0, 0.9);
  ${media.lessThan("huge")`
    height: 95%;
    width: 95%;
  `};
  ${media.lessThan("large")`
    height: 90%;
    width: 90%;
  `};
  ${media.lessThan("small")`
    padding: 0.5rem .5rem;
    height: 97%;
    width: 97%;
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
  font-size: 1.4rem;
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
  ${media.lessThan("medium")`
      margin: 0 0.2rem;
      font-size: 1.3rem;
  `};
  ${media.lessThan("small")`
  margin: 0 0.2rem;
  font-size: 1.2rem;
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
      margin-top: 5px;
    }
  }
  &: hover {
    cursor: pointer;
    transform: translateY(-5%);
    box-shadow: 0 1px 2px black;
  }
  ${media.lessThan("huge")`
  
  `};
  ${media.lessThan("large")`
    width: 16rem; 
    padding: 0.5rem 0.5rem;
  `};
  ${media.lessThan("medium")`
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
  ${media.lessThan("small")`
    width: 100%; 
    height : 6.5vh;
    padding: 0.5rem 0.5rem;
    margin : .2rem 0;
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
  margin: 0.5rem 0;
  span {
    font-size: 3rem;
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
  ${media.lessThan("small")`
    padding: 0 .5rem;
    `};
`

const ResponsiveEmoji = styled.div`
  span {
    font-size: 2rem;
    ${media.lessThan("large")`
    font-size: 1.8rem; 
    `};
    ${media.lessThan("medium")`
    font-size: 1.6rem;
    `};
    ${media.lessThan("small")`
    font-size: 1.3rem;
    `};
  }
`

const SectionText = styled.div`
  p {
    margin: 0 0.5rem;
  }

  ${media.lessThan("small")`
        p {
            padding-left : 0;
        }
    `}
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
                  <div style={{ display: "flex" }}>
                    <StyledHover>
                      <a
                        href="https://stackoverflow.com/users/9141305/wane01"
                        target="_blank"
                        rel="noopener"
                      >
                        <DiStackoverflow />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://github.com/vickywane"
                      >
                        <DiGithubBadge />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
                      >
                        <FiLinkedin />
                      </a>
                    </StyledHover>

                    <StyledHover>
                      <a href="https://twitter.com/iamnwani01" target="_blank">
                        <FiTwitter />
                      </a>
                    </StyledHover>
                  </div>

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
                    Hi , I'm Nwani Victory
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
