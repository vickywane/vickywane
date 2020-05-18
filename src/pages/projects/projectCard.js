import React from "react"
import Flex from "styled-flex-component"
import { Card } from "react-bootstrap"
import { FiGithub, FiGlobe } from "react-icons/fi"
import {
  DiReact,
  DiJavascript,
  DiMongodb,
  DiSass,
  DiGo,
  DiGoogleCloudPlatform,
} from "react-icons/di"
import { graphql } from "gatsby"

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
        style={{ height: "17rem" }}
      />
      <Title colored style={{ fontSize: "1.7rem" }} regular small>
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
          <a href={props.gitlink} targe="_blank">
            <FiGithub style={{ fontSize: "1.7em", color: "black" }} />
          </a>
          <a href={props.projectUrl} targe="_blank">
            <FiGlobe style={{ fontSize: "1.7em", color: "black" }} />
          </a>
        </Flex>
      </Contain>
    </StyledCard>
  )
}

export default ProjectCard
