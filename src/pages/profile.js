import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Image from "../components/image"
import { media } from "../media_style"

const Div = styled.div`
  ${media.tablet`
height : 61vh
padding-top : 10%
`}
  ${media.phone`
  height : 62vh
padding-top : 15%
`}
color : white
width : 100%
padding-top : 5%
height : 60vh
background: linear-gradient(to bottom,#591af7,#1b2f7d);
  text-align: center;
`

const Text = styled.p`
    font-size : 1.3em
    margin-top : 2.5%
    margin-bottom : 2.5%
    ${media.tablet`
    font-size : 1.3em
    margin-top: 5%;
    margin-bottom: 3%;
  `}
    ${media.phone`
    font-size : 1.1em
    margin-top: 9%;
  `}
`

const Github = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1.1px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size : 1.1em
  width : 30%
  height : 60px
  font-weight : bold
	&:hover {
    cursor: pointer;
    color: white;
    background: #1b2f7d;
  }
  ${media.tablet`
  font-size : 1em
  width : 35%
`}
  ${media.phone`
  width : 35%
`}
`

const Name = styled.h1`
    font-weight : bold 
    font-size : 4em
    ${media.tablet`
    font-size :  3em
  `}
    ${media.phone`
    font-size :  2em
  `}
`

const IndexPage = () => (
  <Div>
    <div
      style={{
        width: "100vw",
        height: "55vh",
        position: "relative",
        top: "-2px",
      }}
    >
      <Name> Nwani Victory </Name>
      <Text> Software Engineer from Lagos , Nigeria , Africa. </Text>
      <Github> CONTACT ME </Github>

      <Image />
    </div>
  </Div>
)

export default IndexPage
