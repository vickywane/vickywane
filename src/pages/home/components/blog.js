import React from "react"
import styled from "styled-components"

const Header = styled.h4`
  text-align: center;
`

const Div = styled.div`
  background-color: #141e64;
  color: white;
  width: 100%;
  border-radius: 5px;
  height: 60vh;
`

export default function update() {
  return (
    <Div>
      <Header> Blog </Header>
    </Div>
  )
}
