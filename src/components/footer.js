import React from "react"
import styled from "styled-components"
import Flex from "styled-flex-component"

import {
  FiInstagram,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi"

import { FooterBody, Body, Text } from "../styles/styles"

const Contain = styled.div`
  padding-top: 15px;
`

const Copyright = styled.div`
  font-size: 0.8em;
`

const Hover = styled.div`
  margin: 2% 5%;
  cursor: pointer;
`

const Footer = () => {
  return (
    <FooterBody id="footer">
      <Text white> Connect or Reach Out to me </Text> <br />
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
              href="https://twitter.com/iamnwani01"
              rel="noopener noreferrer"
            >
              <FiMail style={{ fontSize: "2em" }} />
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
      <hr style={{ background: "#fff" }} />
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
