import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Flex } from "styled-flex-component"
import Image from '../components/image'

const Div = styled.div`
width : 100%
height : 70vh
background-color : #fff
margin-left : 3%
`

const Text = styled.p`
    font-size : 1em
`

const Github = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1.1px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size : 0.9em
  width : 40%
  height : 60px
  font-weight : bold
`

const Name = styled.h1`
    font-weight : bold
`

const IndexPage = () => (
<div>
    <Div>
    <Text> Hey   ................   I am : </Text>
    <Name>  Nwani Victory </Name>
    <Text> Software Engineer from Lagos , Nigeria , Africa.  </Text>
    <Github> CONTACT ME  </Github>
    </Div>
</div>
)

export default IndexPage
