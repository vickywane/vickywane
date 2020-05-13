import React, { useState, useEffect } from "react"
import Flex from "styled-flex-component"
import { Card, Image } from "react-bootstrap"
import { FiGithub, FiChevronDown, FiGlobe } from "react-icons/fi"
import {
  DiReact,
  DiJavascript,
  DiMongodb,
  DiSass,
  DiGo,
  DiGoogleCloudPlatform,
} from "react-icons/di"
import { graphql, Link } from "gatsby"

import {
  StyledCard,
  Title,
  Hover,
  IconItems,
  Text,
  Contain,
} from "../../styles/styles"

// TODO : use gatsby-image later
export const query = graphql`
  query {
    file(relativePath: { eq: "../../../images/gatsby-icon.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const ProjectCard = props => {
  return (
    <StyledCard key={props.id}>
      <Card.Img
        fluid
        alt="project illustration"
        src={props.imgUrl}
        style={{ height: "15rem" }}
      />
      <Title colored style={{ fontSize: "2rem" }} regular small>
        {props.name}
      </Title>
      <Contain>
        <Flex>
          <Text style={{ color: "#000", fontWeight: "700px" }}>Tools:</Text>
        </Flex>

        <IconItems>
          <Hover>
            <DiGoogleCloudPlatform
              style={{ fontSize: "1.5em", color: "grey" }}
            />
          </Hover>
          <Hover>
            <DiJavascript style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiMongodb style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiReact style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiGo style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiSass style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
        </IconItems>

        <Flex justifyBetween>
          <a href={props.gitlink}>
            <FiGithub style={{ fontSize: "1.7em", color: "black" }} />
          </a>
          <Hover>
            <FiGlobe style={{ fontSize: "1.7em", color: "black" }} />
          </Hover>
        </Flex>
      </Contain>
    </StyledCard>
  )
}

export default ProjectCard
