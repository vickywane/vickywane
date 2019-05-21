import React, { Component } from "react"
import styled from "styled-components"

const Div = styled.div`
    padding-top : 10px 
    padding-bottom : 10px 
`

const Text = styled.p`
  font-size: 0.9em;
  color: #212529;
`

const EndP = styled.p`
  font-size: 0.9em;
  color: grey;
`

const End = styled.h4`
  text-align: center;
`

const Title = styled.h4`
  text-align: center;
  font-weight: bold;
`

const Github = styled.button`
background: transparent;
border-radius: 3px;
border: 1.5px solid palevioletred;
color: palevioletred;
margin: 0 1em;
padding: 0.25em 1em;
font-size : 0.9em
width : 40%
height : 60px
margin-left : 30%
font-weight : bold
`

export default class about extends Component {
  state = {
    read: false,
  }

  render() {
    const Press = () => {
      this.setState({ read: true })
    }

    // ============
    if (this.state.read === false) {
      return (
        <Div>
          <Title> ABOUT </Title> <hr />
          <Text>
            I am Nwani Victory , a software engineer and also a freelancer from
            Lagos Nigeria . I am a mixture of a backend and frontend engineer as
            i have worked on both aspects while building several projects . I
            enjoy viewing and developing good User Interfaces and making great
            User Experiences for the users of whatever i am building. Currently
            i work at{" "}
            <a href="#">
              <b> Creatella </b>
            </a>{" "}
            where i build front-ends based mostly on React and other JavaScript
            based frameworks and libraries. We give startups a platform to grow
            and turn ideas into useful Products.
          </Text>
          <Text>
            I started out as an Android Developer haven taken the Android
            Development course from{" "}
            <a href="#">
              {" "}
              <b> Shaw Academy </b>{" "}
            </a>{" "}
            in the year 2016 for six months , where i learnt the rudiments of
            Android Development and the Java Programming Language . I moved on
            to learning Python as a new Programming language and did some
            projects on embeded programming and also Data Analysis and from
            there my journey into Web Development began by building Database
            Driven WebApps with the Django Web Framework(Based on Python). I
            posses several Certifications in related fields from reputable
            Software Instituions in my home Country , Nigeria. I am currently
            working towards getting my Advanced and Higer Diploma in Software
            Engineering.
          </Text>
          <EndP>
            I have a high interest in Application Security and Secure Coding as
            i make sure to enforce good security standards and write Security
            Driven Tests alongside building in a Test Driven Environ. .... .
          </EndP>
          <Github
            onClick={() => {
              Press()
            }}
          >
            {" "}
            Continue Reading
          </Github>
          <br />
          <br />
        </Div>
      )
    } else {
      return (
        <Div>
          <Title> ABOUT </Title> <hr />
          <Text>
            I am Nwani Victory , a software engineer and also a freelancer from
            Lagos Nigeria . I am a mixture of a backend and frontend engineer as
            i have worked on both aspects while building several projects . I
            enjoy viewing and developing good User Interfaces and making great
            User Experiences for the users of whatever i am building. Currently
            i work at{" "}
            <a href="#">
              <b> Creatella </b>
            </a>{" "}
            where i build front-ends based mostly on React and other JavaScript
            based frameworks and libraries. We give startups a platform to grow
            and turn ideas into useful Products.
          </Text>
          <Text>
            I started out as an Android Developer haven taken the Android
            Development course from{" "}
            <a href="#">
              {" "}
              <b> Shaw Academy </b>{" "}
            </a>{" "}
            in the year 2016 for six months , where i learnt the rudiments of
            Android Development and the Java Programming Language . I moved on
            to learning Python as a new Programming language and did some
            projects on embeded programming and also Data Analysis and from
            there my journey into Web Development began by building Database
            Driven WebApps with the Django Web Framework(Based on Python). I
            posses several Certifications in related fields from reputable
            Software Instituions in my home Country , Nigeria. I am currently
            working towards getting my Advanced and Higer Diploma in Software
            Engineering.
          </Text>
          <Text>
            I have a high interest in Application Security and Secure Coding as
            i make sure to enforce good security standards and write Security
            Driven Tests alongside building in a Test Driven Environ. I am a
            lover of <b>Free and Open Source Software(FOSS) </b> and tools as i
            am an active member of the{" "}
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
          </Text>
          <Text>
            Feel free speak to me about that amazing idea you have in mind as i
            have collaborated with other developers while participating in{" "}
            <b>
              {" "}
              <a href="#"> Hackatons </a>
            </b>
            . I have also participated in several Coding challanges or
            excersises and internships from local and international
            organizations . I am very much open to reviewing new startups and
            rendering my help as a Developer where needed .
          </Text>
          <Text>
            {
              "  Lastly , I enjoy making noise :) about the surging list of technologies within the JavaScript Ecosystem mostly especially on those i've used. I enjoy attending meetups and also speaking briefly at them. I also am a fan of the #Imagine_Dragons and Fun.inc music band .  "
            }
          </Text>
          <hr />
          <End>
            Phew !! That was a pretty long descriptive essay on my Developer
            life.
          </End>
          <br />
          <br />
          <br />
        </Div>
      )
    }
  }
}
