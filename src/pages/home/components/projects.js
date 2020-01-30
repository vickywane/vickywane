import React, { useState, useEffect } from "react"
import Flex from "styled-flex-component"
import { Card, Image } from "react-bootstrap"
import { FiGithub } from "react-icons/fi"

import {
  ProjectBody,
  StyledCard,
  Title,
  Items,
  Hover,
  IconItems,
  Text,
  Contain,
  Body,
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
        fluid
        alt="project illustration"
        src={props.imgUrl}
        style={{ maxHeight: "400px" }}
      />
      <Title black regular project>
        {props.name}
      </Title>
      <Contain>
        <Flex>
          <Text style={{ color: "#000" }}>
            <b> Tools: </b>
          </Text>
        </Flex>

        <IconItems>
          <Hover>
            <FiGithub style={{ fontSize: "1.5em", color: "grey" }} />{" "}
          </Hover>
          <Hover>
            <FiGithub style={{ fontSize: "1.5em", color: "grey" }} />{" "}
          </Hover>
          <Hover>
            <FiGithub style={{ fontSize: "1.5em", color: "grey" }} />{" "}
          </Hover>
          <Hover>
            <FiGithub style={{ fontSize: "1.5em", color: "grey" }} />{" "}
          </Hover>
        </IconItems>

        <Flex justifyBetween>
          <Hover>
            <FiGithub style={{ fontSize: "1.7em", color: "black" }} />{" "}
          </Hover>
          <Hover>
            <FiGithub style={{ fontSize: "1.7em", color: "black" }} />{" "}
          </Hover>
        </Flex>
      </Contain>
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
      <Title regular>RECENT PROJECTS </Title>
      <Text white>These are my personal and side projects.</Text>
      <hr style={{ background: "#fff" }} />

      <Flex>
        {Width >= 1000 ? (
          <Flex justifyBetween>
            {data.map(({ id, name, description, imgUrl, link, tools }) => {
              return (
                <Body>
                  <StyledCardComponent
                    name={name}
                    id={id}
                    imgUrl={imgUrl}
                    tools={tools}
                    link={link}
                  />
                </Body>
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
