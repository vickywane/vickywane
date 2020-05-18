import React, { useState } from "react"
import styled from "styled-components"
import Flex from "styled-flex-component"

import {
  FiInstagram,
  FiMail,
  FiGithub,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi"

import {
  FooterBody,
  Body,
  Text,
  Input,
  SearchBody,
  Button,
} from "../styles/styles"

const Contain = styled.div`
  padding-top: 15px;
`

const Copyright = styled.div`
  font-size: 0.8em;
`

const Hover = styled.div`
  margin: 1% 5%;
  cursor: pointer;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem 1rem;
  grid-template-columns: repeat(uto-fit, minmax(57rem, 1fr));
`

const Footer = () => {
  const [Msg, setMsg] = useState(false)

  return (
    <FooterBody id="footer">
      <Text white> Connect or Reach Out to me </Text> <br />
      {!Msg ? (
        <Flex justifyCenter>
          <Grid>
            <SearchBody>
              <Flex>
                <FiMail style={{ fontSize: "1.7rem" }} />
                <Input
                  placeholder="Shoot an email"
                  style={{ background: "transparent" }}
                />{" "}
              </Flex>
            </SearchBody>{" "}
            <Button
              onClick={() => {
                setMsg(true)
              }}
            >
              Send Message
            </Button>
          </Grid>
        </Flex>
      ) : null}
      <br />
      <Body>
        <Flex justifyBetween>
          <Hover>
            <a
              target="_blank"
              href="https://www.instagram.com/iamnwani/?hl=en"
              rel="noopener noreferrer"
            >
              <FiFacebook style={{ fontSize: "2em" }} />
            </a>
          </Hover>

          <Hover>
            <a
              target="_blank"
              href="https://web.facebook.com/dumabi.nwani"
              rel="noopener noreferrer"
            >
              <FiInstagram style={{ fontSize: "2em" }} />
            </a>
          </Hover>

          <Hover>
            <a
              target="_blank"
              href="https://medium.com/@vickywane"
              rel="noopener noreferrer"
            >
              <FiTwitter style={{ fontSize: "2em" }} />
            </a>
          </Hover>

          <Hover>
            <a
              target="_blank"
              href="https://www.github.com/vickywane"
              rel="noopener noreferrer"
            >
              <FiGithub style={{ fontSize: "2em" }} />
            </a>
          </Hover>

          <Hover>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
              rel="noopener noreferrer"
            >
              <FiLinkedin style={{ fontSize: "2em" }} />
            </a>
          </Hover>
        </Flex>
      </Body>
      <hr style={{ background: "#fff", borderStyle: "dashed" }} />
      <Contain>
        <Text white> Nwani Victory - Lagos , Nigeria , Africa.</Text>
        <Copyright>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Copyright>
      </Contain>
    </FooterBody>
  )
}

export default Footer
