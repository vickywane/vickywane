import React from "react"
import styled from "styled-components"
import Flex from "styled-flex-component"
import { Icon } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { media } from "../media_style"

const Div = styled.div`
    width : 100%
    height : 25vh
    background: linear-gradient(to bottom,#591af7,#1b2f7d);
    color : white
    text-align: center;
`

const Contain = styled.div`
  padding-top: 15px;
`

const Copyright = styled.div`
  font-size: 0.8em;
`

const Text = styled.div`
  font-size: 1.1em;
`

const Social = styled.div`
  text-align: center;
  margin-bottom: 3%;
  margin-top: 2%;
`

const Icons = styled.div`
  margin-left: 25%;
  ${media.tablet`
  margin-left: 11%;
`}
  ${media.phone`
  margin-left: 7%;
`}
`

const IconContain = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  ${media.tablet`
  margin-left: 5%;
  margin-right: 5%;
`}
  ${media.phone`
  margin-left: 3%;
  margin-right: 3%;
`}
`

export default function footer() {
  return (
    <Div>
      <Social>
        <Text> Connect with me </Text> <br />
        <Icons>
          <Flex>
            <IconContain>
              <a
                target="_blank"
                href="https://www.instagram.com/iamnwani/?hl=en"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" size="big" link color="red" />
              </a>
            </IconContain>
            <IconContain>
              <a
                target="_blank"
                href="https://web.facebook.com/dumabi.nwani"
                rel="noopener noreferrer"
              >
                <Icon name="facebook" size="big" link color="blue" />
              </a>
            </IconContain>
            <IconContain>
              <a
                target="_blank"
                href="https://medium.com/@vickywane"
                rel="noopener noreferrer"
              >
                <Icon name="medium" link size="big" color="black" />
              </a>
            </IconContain>
            <IconContain>
              <a
                target="_blank"
                href="https://twitter.com/iamnwani01"
                rel="noopener noreferrer"
              >
                <Icon name="twitter" size="big" link color="blue" />
              </a>
            </IconContain>
            <IconContain>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin" size="big" link color="#1b2f7d" />
              </a>
            </IconContain>
          </Flex>
        </Icons>
      </Social>
      <hr />
      <Contain>
        <Text> Nwani Victory - Lagos , Nigeria , Africa.</Text>
        <Copyright>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Copyright>
      </Contain>
    </Div>
  )
}
