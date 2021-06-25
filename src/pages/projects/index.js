import React, { useState } from "react"
import styled from "styled-components"
import { FiGithub } from "react-icons/fi"
import { CSSTransition } from "react-transition-group"

import { Card, Button } from "../../styles/"
import { HomeBackground, Title, Text } from "../../styles/"
import Header from "../../components/header"
import ProjectData from "../../data/data.json"

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  grid-gap: 1rem 1rem;
  color: white;
  place-items: center;
`

const ProjectCard = styled(Card)`
  .images {
  }
  img {
    object-fit: contain;
    height: 110px;
    margin: 0.5rem 0.5rem;
  }
`

const Projects = () => {
  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Header />

      <HomeBackground>
        <div style={{ textAlign: "center", color: "white" }}>
          <br />
          <Title>A Gallery Of My Projects</Title>

          <Text>
            Here's a gallery of starter templates i have built while explaining
            a topic, when working as a technical author for various cloud
            services.
          </Text>
        </div>

        <ProjectsGrid>
          {ProjectData.projects.map(({ title, description, images }) => (
            <ProjectCard>
              <Title> {title} </Title>
              <Text>{description}</Text>

              <div className="images">
                {images.map(url => (
                  <img src={url} />
                ))}
              </div>
              <br />
              <div>
                <Button>
                  <div style={{ margin: "0 .5rem" }}>
                    <FiGithub size={22} />
                  </div>
                  View Project Codebase
                </Button>
              </div>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </HomeBackground>
    </div>
  )
}

export default Projects
