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
    name: "Unispoon",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 2,
    name: "EvoHub",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 3,
    name: "Travoi",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 4,
    name: "Remotify",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 5,
    name: "UseCases",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 4,
    name: "EventFul",
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
  return (
    <ProjectBody>
      <Title regular>RECENT PROJECTS </Title>
      <Text white>These are my personal and side projects.</Text>
      <hr style={{ background: "#fff" }} />

      <Body>
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
      </Body>
    </ProjectBody>
  )
}

export default Projects
