import React from "react"
import styled from "styled-components"
import { media } from "../../media_style"

const Header = styled.h3`
  text-align: center;
  font-weight: bold;
  padding-top: 30px;
`

const Div = styled.div`
  background-color: #f8f8f9;
  color: black;
  height: 50vh;
`


export default function update() {
  return (
    <Div>
      <Header> My Toolset </Header> <hr />
       
    </Div>
  )
}
