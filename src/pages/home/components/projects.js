import React, { useState, useEffect } from "react"
import Flex from "styled-flex-component"
import { Card, Image } from "react-bootstrap"
import { FiGithub, FiChevronDown, FiGlobe } from "react-icons/fi"
import {
  DiReact,
  DiJavascript,
  DiMongodb,
  DiSass,
  DiGo,
  DiGoogleCloudPlatform,
} from "react-icons/di"

import {
  ProjectBody,
  StyledCard,
  Title,
  Items,
  Hover,
  IconItems,
  Bounce,
  Text,
  Contain,
  Body,
} from "../../../styles/styles"

const data = [
  {
    id: 1,
    name: "Unispoon",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 3,
    name: "Travoi",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 4,
    name: "Remotify",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 5,
    name: "UseCases",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 6,
    name: "EventFul",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
]

//spliting d data array for small pagination
// const chunk = (arr, size) => {
//   arr.reduce(
//     (acc, _, i) =>
//       i % size ? acc : [...acc, arr.slice(i, i + size), (newdata = data)],
//     []
//   );
// };

const StyledCardComponent = props => {
  return (
    <StyledCard key={props.id}>
      <Card.Img
        fluid
        alt="project illustration"
        src={props.imgUrl}
        style={{ maxHeight: "400px" }}
      />
      <Title black regular project>
        {props.name}
      </Title>
      <Contain>
        <Flex>
          <Text style={{ color: "#000" }}>
            <b> Tools: </b>
          </Text>
        </Flex>

        <IconItems>
          <Hover>
            <DiGoogleCloudPlatform
              style={{ fontSize: "1.5em", color: "grey" }}
            />
          </Hover>
          <Hover>
            <DiJavascript style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiMongodb style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiReact style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiGo style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
          <Hover>
            <DiSass style={{ fontSize: "1.5em", color: "grey" }} />
          </Hover>
        </IconItems>

        <Flex justifyBetween>
          <Hover>
            <FiGithub style={{ fontSize: "1.7em", color: "black" }} />
          </Hover>
          <Hover>
            <FiGlobe style={{ fontSize: "1.7em", color: "black" }} />
          </Hover>
        </Flex>
      </Contain>
    </StyledCard>
  )
}

const Projects = () => {
  const [Display, setDisplay] = useState(false)
  const [Index, setIndex] = useState(0)

  const newdata = data.reduce(
    (acc, _, i) => (i % 3 ? acc : [...acc, data.slice(i, i + 3)]),
    []
  )

  const [Width, setWidth] = useState(null)

  setTimeout(function() {
    setWidth(window.innerWidth)
  }, 500)

  const handleResize = value => {
    setWidth(value)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize.bind(this))
    return () => window.removeEventListener("resize", handleResize.bind(this))
  }, [])

  setTimeout(() => {
    setDisplay(true)
  }, 1000)

  console.log(newdata)

  return (
    <ProjectBody>
      <Title regular>RECENT PROJECTS </Title>
      <Text white>These are my personal and side projects.</Text>
      <hr style={{ background: "#fff" }} />

      <Body>
        {Width >= 1300 ? (
          <Flex justifyBetween>
            {data.map(({ id, name, description, imgUrl, link, tools }) => {
              return (
                <Bounce style={{ margin: "0.5em" }}>
                  <StyledCardComponent
                    name={name}
                    id={id}
                    imgUrl={imgUrl}
                    tools={tools}
                    link={link}
                    gitlink=""
                  />
                </Bounce>
              )
            })}
          </Flex>
        ) : (
          <div>
            {!Display ? (
              <p style={{ textAlign: "center" }}> Loading ... </p>
            ) : (
              <Items>
                {newdata[1].map(
                  ({ id, name, description, imgUrl, link, tools }) => {
                    return (
                      <Bounce>
                        <StyledCardComponent
                          name={name}
                          id={id}
                          imgUrl={imgUrl}
                          tools={tools}
                          link={link}
                          gitlink=""
                        />
                      </Bounce>
                    )
                  }
                )}
              </Items>
            )}
          </div>
        )}
        <Flex justifyCenter>
          <Hover
            onClick={() => {
              alert("falied to fetch")
            }}
          >
            <Flex>
              <p style={{ paddingRight: "5px", paddingTop: "4px" }}>See More</p>
              <FiChevronDown style={{ fontSize: "2.1em" }} />
            </Flex>
          </Hover>
        </Flex>
      </Body>
    </ProjectBody>
  )
}

export default Projects
