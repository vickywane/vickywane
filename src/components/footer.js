import React from "react"
import styled from "styled-components"

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
  font-size: 1em;
`
export default function footer() {
  return (
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
  )
}
