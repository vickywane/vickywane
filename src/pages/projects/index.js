import React, { useState } from "react"
import styled from "styled-components"
import { FiGithub, FiExternalLink } from "react-icons/fi"
import media from "styled-media-query"

import Layout from '../../components/layout'
import ProjectToolsIcon from "../../components/projectIcons"
import Seo from "../../components/seo"
import { HomeBackground, Title, Text, Card, Button, Flex } from "../../styles/"
import Header from "../../components/header"
import ProjectData from "../../data/data.json"

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  grid-gap: 1rem 1rem;
  color: white;
  place-items: center;
  ${media.lessThan("medium")`
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  `};
  ${media.lessThan("small")`
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  `};
`

const ProjectCard = styled(Card)`
  .project-icons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
    padding-bottom: 1rem;
    grid-gap: 0 2rem;
    place-items: center;
  }
  img {
    object-fit: contain;
    height: 110px;
    margin: 0.5rem 0.5rem;
  }

  &:hover {
    img {
      cursor: pointer;
    }
  }
`

const Projects = () => {
  return (
    <Layout style={{ height: "100%", overflow: "hidden" }}>
      <Seo title="Projects" />
      <Header />

      <HomeBackground>
        <div style={{ textAlign: "center", color: "white" }}>
          <br />
          <Title>A Gallery Of My Projects</Title>

          <Text>
            Here's a gallery of projects i have built while explaining topic
            working as a Technical Author for various cloud services.
          </Text>
        </div>
        <hr style={{ background: "white" }} />
        <ProjectsGrid>
          {ProjectData.projects.map(
            ({ title, description, images, tools, git_link, article_link }) => (
              <ProjectCard>
                <Title> {title} </Title>
                <hr style={{ backgroundColor: "white" }} />
                <Text>{description}</Text>

                <Text> Technologies Used: </Text>
                <div className="project-icons">
                  {tools &&
                    tools.map(icon => (
                      <Flex direction={"row"}>
                        <Text
                          style={{
                            textTransform: "uppercase",
                            padding: "0 .7rem",
                          }}
                        >
                          {icon}
                        </Text>
                        <ProjectToolsIcon size={25} icon={icon} />
                      </Flex>
                    ))}
                </div>

                <Flex
                  rowGap={20}
                  direction="row"
                  responsive
                  justify="space-between"
                  alignItems="center"
                >
                  <Button>
                    <a
                      href={git_link}
                      style={{
                        textDecoration: "transparent",
                        color: "white",
                      }}
                      target="_blank"
                    >
                      <Flex direction="row">
                        <div style={{ margin: "0 .5rem" }}>
                          <FiGithub size={22} />
                        </div>
                        View Project Codebase
                      </Flex>
                    </a>
                  </Button>

                  <Button>
                    <a
                      href={article_link}
                      style={{
                        textDecoration: "transparent",
                        color: "white",
                      }}
                      target="_blank"
                    >
                      <Flex direction="row">
                        Read Attached Article
                        <div style={{ margin: "0 .5rem" }}>
                          <FiExternalLink size={22} />
                        </div>
                      </Flex>
                    </a>
                  </Button>
                </Flex>
              </ProjectCard>
            )
          )}
        </ProjectsGrid>
      </HomeBackground>
    </Layout>
  )
}

export default Projects
