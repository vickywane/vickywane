import React from "react"
import styled from "styled-components"
import { FiExternalLink } from "react-icons/fi"

import Seo from "../../components/seo"
import Header from "../../components/header"
import { Text, Title, center, HomeBackground, Flex } from "../../styles/"
import { StyledHover } from "./"
import Data from "../../data/data.json"

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0 1rem;
    border-radius: 5px;
    margin: 1.7rem 0.5rem;
    background: #282c34;
    color: #fff;
    span {
      width: 100%;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
  .card-container {
    padding: 1rem 0.5rem;
  }
`

const Body = styled(HomeBackground)`
  padding: 1rem 0.5rem;
  .body-content {
    max-width: 1300px;
    margin: 0 auto;
  }
`

const Experiences = props => {
  const { setView } = props

  return (
    <div>
      <Header />
      <Seo title="Experiences" />

      <Body>
        <div className="body-content">
          <Title color="white" align="center">
            Experiences
          </Title>

          <Text align="center" color="white">
            Below is a run down of roles i have held over the past years;
          </Text>

          <Title color="white" small>
            {" "}
            Professional Work Experience{" "}
          </Title>
          <hr style={{ background: "white" }} />
          <List>
            {Data.expriences.roles.map(
              ({
                id,
                title,
                company,
                company_url,
                start_time,
                description,
                end_time,
              }) => {
                return (
                  <li style={{ ...center }} key={id}>
                    <div className="card-container">
                      <div>
                        <Flex>
                          <a
                            href={company_url}
                            style={{
                              textDecoration: "none",
                              color: "white",
                              marginRight: ".5rem",
                            }}
                            target="_blank"
                          >
                            <Flex>
                              <Title small style={{ padding: 0, margin: 0 }}>
                                {company}
                              </Title>

                              <div style={{ margin: "0 .6rem", padding: 0 }}>
                                <FiExternalLink />
                              </div>
                            </Flex>
                          </a>
                        </Flex>
                      </div>
                      <Text style={{ color: "#D3D3D3" }}>
                        <i>
                          {" "}
                          {title} -- ( {start_time} - {end_time} ){" "}
                        </i>
                      </Text>

                      <Text>{description}</Text>
                    </div>
                  </li>
                )
              }
            )}
          </List>

          <br />
          <Title color="white" small>
            {" "}
            Open Source Programs{" "}
          </Title>
          <hr style={{ background: "white" }} />
          <List>
            {Data.expriences.programs.map(
              ({ id, name, program_link, description }) => {
                return (
                  <li style={{ ...center }} key={id}>
                    <div className="card-container">
                      <div>
                        <Flex>
                          <a
                            href={program_link}
                            style={{
                              textDecoration: "none",
                              color: "white",
                              marginRight: ".5rem",
                            }}
                            target="_blank"
                          >
                            <Flex>
                              <Title small style={{ padding: 0, margin: 0 }}>
                                {name}
                              </Title>

                              <div style={{ margin: "0 .6rem", padding: 0 }}>
                                <FiExternalLink />
                              </div>
                            </Flex>
                          </a>
                        </Flex>
                      </div>
                      <br />

                      <Text>{description}</Text>
                    </div>
                  </li>
                )
              }
            )}
          </List>
        </div>
      </Body>
    </div>
  )
}

export default Experiences
