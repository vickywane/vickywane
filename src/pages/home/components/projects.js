import React, { useState, useEffect } from "react"
import Flex from "styled-flex-component"
import { Card } from "react-bootstrap"
import {} from "react-icons/fi"

import {
  ProjectBody,
  Button,
  ProjectHeader,
  StyledCard,
  Title,
  Items,
  Text,
} from "../../../styles/styles"

const data = [
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

const StyledCardComponent = props => {
  return (
    <StyledCard key={props.id}>
      <Card.Img
        variant="top"
        src={props.imgUrl}
        style={{ maxHeight: "250px" }}
      />
      <Title> {props.name} </Title>
      <Card.Body>
        <Text description>
          <b> Tools: </b> Graphql || React Native || Mongodb || Ms Bot Framework
        </Text>
        <Button> VIEW PROJECT </Button>
      </Card.Body>
    </StyledCard>
  )
}

const Projects = () => {
  const [Width, setWidth] = useState(null)

  setTimeout(function() {
    setWidth(window.innerWidth)
  }, 500)

  const handleResize = value => {
    setWidth(value)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize.bind(this))
    return () => window.removeEventListener("resize", handleResize.bind(this))
  }, [])

  return (
    <ProjectBody>
      <Title project> RECENT PROJECTS </Title>
      <Text white>These are my personal and side projects.</Text>
      <hr style={{ background: "#fff" }} />

      <Flex>
        {Width >= 1000 ? (
          <Flex justifyBetween>
            {data.map(({ id, name, description, imgUrl, link, tools }) => {
              return (
                <StyledCardComponent
                  name={name}
                  id={id}
                  imgUrl={imgUrl}
                  tools={tools}
                  link={link}
                />
              )
            })}
          </Flex>
        ) : (
          <Items>
            {data.map(({ id, name, description, imgUrl, link, tools }) => {
              return (
                <StyledCardComponent
                  name={name}
                  id={id}
                  imgUrl={imgUrl}
                  tools={tools}
                  link={link}
                />
              )
            })}
          </Items>
        )}
      </Flex>
    </ProjectBody>
  )
}

export default Projects
