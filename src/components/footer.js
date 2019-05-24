import React from "react"
import styled from "styled-components"
import Flex from "styled-flex-component"
import { Icon } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { media } from "../media_style"

const Div = styled.div`
    width : 100%
    height : 10vh
    background-color: #141E64
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
    <>
      <Social>
        <Text> Find me on </Text> <hr />
        <Icons>
          <Flex>
            <IconContain>
              <Icon name="instagram" size="big" link color="green" />
            </IconContain>
            <IconContain>
              <Icon name="facebook" size="big" link color="blue" />
            </IconContain>
            <IconContain>
              <Icon name="google plus square" link size="big" color="red" />
            </IconContain>

            <IconContain>
              <Icon name="twitter" size="big" link color="blue" />
            </IconContain>
          </Flex>
        </Icons>
      </Social>

      <Div>
        <Contain>
          <Text> Nwani Victory - Lagos , Nigeria , Africa.</Text>
          <Copyright>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Copyright>
        </Contain>
      </Div>
    </>
  )
}
