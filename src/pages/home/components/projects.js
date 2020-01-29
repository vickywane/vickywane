import React from "react"
import styled from "styled-components"
import { media } from "../../../media_style"
import Flex from "styled-flex-component"
import { Card } from "react-bootstrap"

import {
  ProjectBody,
  Button,
  ProjectHeader,
  StyledCard,
  ProjectTitle,
  Items,
  Text,
} from "../../../styles/styles"

const Note = styled.p`
  color: white;
  font-size: 1.1em;
  text-align: center;
`

const Projects = () => {
  const Data = [
    {
      id: 1,
      name: "UNISPOON",
      link: "",
      tools: "",
      imgUrl:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
    },
    {
      id: 1,
      name: "UNISPOON",
      link: "",
      tools: "",
      imgUrl:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
    },
    {
      id: 1,
      name: "UNISPOON",
      link: "",
      tools: "",
      imgUrl:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
    },
  ]

  return (
    <ProjectBody>
      <ProjectHeader> RECENT PROJECTS </ProjectHeader>
      <Note>These are my personal and side projects.</Note>
      <hr style={{ background: "#fff" }} />

      <Flex>
        <Items>
          {Data.map(({ id, name, description, imgUrl, link, tools }) => {
            return (
              <StyledCard key={id}>
                <Card.Img
                  variant="top"
                  src={imgUrl}
                  style={{ maxHeight: "250px" }}
                />
                <ProjectTitle> {name} </ProjectTitle>
                <Card.Body>
                  <Text description>
                    <b> Tools: </b> Graphql || React Native || Mongodb || Ms Bot
                    Framework
                  </Text>
                  <Button> VIEW PROJECT </Button>
                </Card.Body>
              </StyledCard>
            )
          })}
        </Items>
      </Flex>
    </ProjectBody>
  )
}

export default Projects
