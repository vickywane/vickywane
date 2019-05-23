import React from "react"
import styled from "styled-components"
import Flex from "styled-flex-component"
import { Icon } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"

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
  margin-left: 35%;
`
export default function footer() {
  return (
    <>
      <Social>
        <Text> Find me on </Text> <hr />
        <Flex>
          <Icons>
            <Icon name="instagram" size="huge" link color="green" />

            <Icon name="facebook" size="huge" link color="blue" />

            <Icon name="google plus square" link size="huge" color="red" />

            <Icon name="twitter" size="huge" link color="blue" />
          </Icons>
        </Flex>
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
