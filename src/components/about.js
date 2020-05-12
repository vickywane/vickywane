import React from "react"
import Flex from "styled-flex-component"
import { Text, Body, Title, Button } from "../styles/styles"
import styled from "styled-components"
import media from "styled-media-query"
import { Link } from "gatsby"

const Description = styled.div`
  padding: 2rem 20rem;
  ${media.lessThan("large")`
        padding : 2rem  4rem;
    `};
  ${media.lessThan("medium")`
        padding : 2rem  2rem;
    `};
  ${media.lessThan("small")`
        padding : 2rem  0.5rem;
    `};
`

const About = () => {
  return (
    <Body>
      <Description>
        <Flex column>
          <Title style={{ textAlign: "center" }} colored>
            Hi, I'm Nwani
          </Title>

          <Flex justifyCenter>
            <Link
              style={{
                textDecoration: "none",
              }}
              to="/blog"
            >
              <Button>Read My Technical Series</Button>
            </Link>
          </Flex>
        </Flex>
        <br />
        <Text>
          I have a high intrest in modern Software development. I try to
          achitect Scalable digital solutions while working either as a
          FullStack Developer or a Cloud Engineer.
          <br />
          <br />
          I have a high intrest in modern Software development. I try to
          achitect Scalable digital solutions while working either as a
          FullStack Developer or a Cloud Engineer.
          <br />
          <br />I have a high intrest in modern Software development. I try to
          achitect Scalable digital solutions while working either as a
          FullStack Developer or a Cloud Engineer.
        </Text>
      </Description>
      <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
    </Body>
  )
}

export default About
