import React, { Component } from "react"
import styled from "styled-components"
import { media } from "../media_style"

const Div = styled.div`
    padding-top : 7%
    padding-bottom : 10px
    ${media.tablet`
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 2%;
  `}
    ${media.phone`
    margin-top: 5%;
  `}
`

const Text = styled.p`
margin-left: 5%;
margin-right: 5%;
margin-top: 2%; 
font-size: 1.1em;
  letter-spacing: 0.05em
  color: #212529;   
  ${media.tablet`
  margin-top: 3%;
 font-size: 1em; 
 margin-left: 1%;
`}
  ${media.phone`
  font-size: 0.9em;
  margin-top: 0%;
`}
`

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-family: comic sans ms;
  letter-spacing: 0.1em;
`

export default function about() {
  return (
    <Div>
      <Title> Hi , I'm Nwani </Title>
      <Text>
        I'm a software engineer and also a freelancer from Lagos Nigeria . I am
        a mixture of a backend and frontend engineer as i have worked on both
        aspects while building several projects . I enjoy viewing and developing
        good User Interfaces and making great User Experiences for the users of
        whatever i am building.
      </Text>
      <Text>
        With roots in Android Development , i currently develop ideas for mobile
        and web platform. Along the line , i have learnt Python for building
        backend APIs. I however build today using technologies from the very
        vast JavaScript ecosystem .
      </Text>
      <Text>
        I have a high interest in Application Security and Secure Coding as i
        make sure to enforce good security standards and write Security Driven
        Tests alongside building in a Test Driven Environ. I am a lover of{" "}
        <b>Free and Open Source Software(FOSS) </b> and tools as i am an active
        member of the{" "}
        <b>
          {" "}
          <a href="#"> Open Source Intiative(OSI) </a>{" "}
        </b>{" "}
        and also a core contributor and team member of some organizations on{" "}
        <b>
          {" "}
          <a href="#"> Github </a>{" "}
        </b>{" "}
        . I also have authored some Open Source Libraries hosted at{" "}
        <b>
          {" "}
          <a href="#"> Github </a>{" "}
        </b>
        .{" "}
      </Text>
      <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
    </Div>
  )
}
