import React, { Component } from "react"
import styled from "styled-components"

const Div = styled.div`
    padding-top : 5%
    padding-bottom : 10px
`

// const Div = styled.div`
//     padding-top : 10%
//     padding-bottom : 10px
// `
const Text = styled.p`
  font-size: 0.9em;
  color: #212529;
`

const Title = styled.h4`
  text-align: center;
  font-weight: bold;
`

export default function about() {
  return (
    <Div>
      <Title> Hi , I'm Nwani  </Title>  
      <Text>
        I'm a software engineer and also a freelancer from
        Lagos Nigeria . I am a mixture of a backend and frontend engineer as i
        have worked on both aspects while building several projects . I enjoy
        viewing and developing good User Interfaces and making great User
        Experiences for the users of whatever i am building.
      </Text>
      <Text>
        With roots in Android Development , i currently develop ideas for mobile
        and web platform. Along the line , i have learnt Python for building
        backend APIs. I however build today using technologies from the very
        vast JavaScript ecosystem .
      </Text>
      I have a high interest in Application Security and Secure Coding as i make
      sure to enforce good security standards and write Security Driven Tests
      alongside building in a Test Driven Environ. I am a lover of{" "}
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
      .
      <br />
      <br />   <br />
      <br />   <br />
      <br />   <br />
     
    </Div>
  )
}
