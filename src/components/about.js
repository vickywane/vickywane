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
          I have a high interest in modern Software development. I try to
          achitect Scalable digital solutions while working either as a
          <b> FullStack Developer</b> or a <b>Cloud Engineer </b> using best
          pratices within my knowledge gap .
          <br />
          <br />I also have a interest in building and contributing to Open
          Sourced tools and projects, as i take part in maintaining and
          contributing to some used packages and libraries on Github and i also
          happen to be a member of the <b>Open Source Initiative(OSI)</b>.
          <br />
          <br /> Although i have a working idea of other programming languages,
          i write mainly <b>Golang</b> and <b>JavaScript</b> while working on
          projects. Asides these, i have a solid knowledge of{" "}
          <b>Cloud Computing </b>
          generally and how to use technologies supported by the Google Cloud
          Platform as i happen to be an <b>Associate Cloud Expert</b> certified
          by Google.
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
