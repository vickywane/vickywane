import React, { Component } from "react"
import styled from "styled-components"
import { media } from "../../media_style"
import Flex, { FlexItem } from "styled-flex-component"
import { Carousel, Card } from "react-bootstrap"

const Header = styled.h3`
  text-align: center;
  font-weight: bold;
  color: white;
  padding-top: 30px;
`

const Div = styled.div`
  background-color: #2c3e50;
  width: 100%;
  height: 130vh;
  ${media.tablet`
  height: 115vh;
  `}
  ${media.phone`
  height: 110vh;
  `}
`

const Title = styled.h5`
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
  font-size : 0.7em
  width : 75%
  height : 70px
  margin-left : 10%
  margin-top : 100%
  font-weight : bold
  ${media.tablet`
  
  `}
  ${media.phone`
  border: 1.1px solid palevioletred;
  font-size : 0.7em
  width : 77%
  margin-top : 150%
  `}
`

const Project = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1.5px solid palevioletred;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size : 0.9em
  width : 50% 
  height : 60px
  margin-left : 23%
  margin-top : 5%
  font-weight : bold
  color: #022b69;
  ${media.tablet`
   
  `}
  ${media.phone`
  height : 50px
  width : 70% 
  margin-left : 17%
  `}
`

const Contain = styled.div`
  width: 50%;
`

const Description = styled.p`
  font-size : 1.1em
  text-align: center;
  color: #212529;
  ${media.tablet`
  font-size : 0.85em
  text-align: center;
  color: #212529;
  `}
  ${media.phone`
  font-size : 0.85em
  text-align: center;
  color: #212529;
  `}
`

const Slider = styled.div`
width : 100%
height : 350px
padding-left : 10px
padding-right : 10px
`

const Note = styled.p`
  ${media.tablet`
color : white
padding-left : 30px
font-size : 0.8em
`}
  ${media.phone`
color : white
padding-left : 30px
font-size : 0.8em
`}
  color : white
  padding-left : 7%
  font-size : 1.1em
`

const StyledCard = styled.div`
width:   100%  
background :  white  
border-radius : 10px
${media.tablet`
`}
${media.phone`
margin-top:  10% 
`}
`

export default class projects extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      index: 0,
      direction: null,
    }
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    })
  }

  render() {
    return (
      <div>
        <Div>
          <Header> RECENT PROJECTS </Header> <hr />
          <Note>
            <u> NOTE </u>: These are my personal i built or joined in building
            not belonging to a firm.
          </Note>
          <Flex>
            <Contain>
              <Github> GITHUB PROJECTS</Github>
            </Contain>
            <Slider>
              <Carousel>
                <Carousel.Item>
                  <StyledCard>
                    <Card.Img
                      variant="top"
                      src={
                        "https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/2017-chevrolet-bolt-ev.jpg"
                      }
                    />
                    <Title> UNISPOON </Title>
                    <Card.Body>
                      <Description>
                        Mobile Restaurant App for Students to search and rate
                        meals within restaurants and also for restaurants owners
                        to create searchable digital Restaurants
                      </Description>
                      <Description>
                        <b> Tools: </b> Graphql || React Native || Mongodb || Ms
                        Bot Framework
                      </Description>
                      <Project> VIEW PROJECT </Project>
                    </Card.Body>
                  </StyledCard>
                  ;
                </Carousel.Item>

                <Carousel.Item>
                  <StyledCard>
                    <Card.Img
                      variant="top"
                      src={
                        "https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/2017-chevrolet-bolt-ev.jpg"
                      }
                    />
                    <Title> SPACE - FINDAR </Title>
                    <Card.Body>
                      <Description>
                        Web based platform for students and squatters to find a
                        squatting space .
                      </Description>
                      <Description>
                        <b> Tools: </b> Graphql || React || Postgresql
                      </Description>
                      <Project> VIEW PROJECT </Project>
                    </Card.Body>
                  </StyledCard>
                </Carousel.Item>

                <Carousel.Item>
                  <StyledCard>
                    <Card.Img
                      variant="top"
                      src={
                        "https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/2017-chevrolet-bolt-ev.jpg"
                      }
                    />
                    <Title> EVOHUB</Title>
                    <Card.Body>
                      <Description>
                        Mobile and Web Based charging infastructure build to
                        connect Private Electric Vehicle Chargers , Technicians
                        and Electric Vehicle Owners together.
                      </Description>
                      <Description>
                        <b> Tools: </b> Graphql || React || Postgresql || React
                        Native || GoLang || Next.js || Gatsby || Azure
                      </Description>
                      <Project> VIEW PROJECT </Project>
                    </Card.Body>
                  </StyledCard>
                </Carousel.Item>

                <Carousel.Item>
                  <StyledCard>
                    <Card.Img
                      variant="top"
                      src={
                        "https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/2017-chevrolet-bolt-ev.jpg"
                      }
                    />
                    <Title> PATFIN </Title>
                    <Card.Body>
                      <Description>
                        Simple but beautiful Landing brand Website for PatFin
                        High School.
                      </Description>
                      <Description>
                        <b> Tools: </b> Graphql || React || Mongodb || Gatsby ||
                        Styled-Components
                      </Description>
                      <Project> VIEW PROJECT </Project>
                    </Card.Body>
                  </StyledCard>
                </Carousel.Item>

                <Carousel.Item>
                  <StyledCard>
                    <Card.Img
                      variant="top"
                      src={
                        "https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/2017-chevrolet-bolt-ev.jpg"
                      }
                    />
                    <Title> MY PORTFOLIO </Title>
                    <Card.Body>
                      <Description>
                        My revamped personal Website containing my projects
                      </Description>
                      <Description>
                        <b> Tools: </b> Graphql || React || Gatsby ||
                        Styled-Components
                      </Description>
                      <Project> VIEW PROJECT </Project>
                    </Card.Body>
                  </StyledCard>
                </Carousel.Item>
              </Carousel>
            </Slider>
          </Flex>
        </Div>
      </div>
    )
  }
}
