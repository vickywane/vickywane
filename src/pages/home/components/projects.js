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
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"

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
    gitlink: "https://github.com/vickywane/unispoon",
  },
  {
    id: 3,
    name: "Travoi",
    link: "",
    tools: "",
    gitlink: "https://github.com/vickywane/travoi",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1582424123/portfolio/travoy.png",
  },
  {
    id: 4,
    name: "Patfin School",
    link: "",
    tools: "",
    gitlink: "https://github.com/patfin-school/website",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1582423440/portfolio/Screenshot_304.png",
  },
  {
    id: 5,
    name: "UseCases",
    link: "",
    tools: "",
    gitlink: "https://github.com/vickywane/usecases",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 6,
    name: "EventFul",
    link: "",
    tools: "",
    gitlink: "https://github.com/fundry/event",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
]

// TODO : use gatsby-image later
export const query = graphql`
  query {
    file(relativePath: { eq: "../../../images/gatsby-icon.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const StyledCardComponent = (props, data) => {
  return (
    <StyledCard key={props.id}>
      <Card.Img
        fluid
        alt="project illustration"
        src={props.imgUrl}
        style={{ height: "15rem" }}
      />
      <Title colored style={{ fontSize: "2rem" }} regular small>
        {props.name}
      </Title>
      <Contain>
        <Flex>
          <Text style={{ color: "#000", fontWeight: "700px" }}>Tools:</Text>
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
          <a href={props.gitlink}>
            <FiGithub style={{ fontSize: "1.7em", color: "black" }} />
          </a>
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

  const newdata = data.reduce(
    (acc, _, i) => (i % 2 ? acc : [...acc, data.slice(i, i + 3)]),
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
      <Title bold regular small white>
        RECENT PROJECTS
      </Title>
      <Text white center>
        These are my personal and side projects.
      </Text>
      <hr style={{ background: "#fff" }} />

      <Body>
        {Width >= 1300 ? (
          <Flex justifyBetween>
            {data.map(({ id, name, gitlink, imgUrl, link, tools }) => {
              return (
                <Bounce style={{ margin: "0.5em" }}>
                  <StyledCardComponent
                    name={name}
                    id={id}
                    imgUrl={imgUrl}
                    tools={tools}
                    link={link}
                    gitlink={gitlink}
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
                  ({ id, name, gitlink, imgUrl, link, tools }) => {
                    return (
                      <Bounce>
                        <StyledCardComponent
                          name={name}
                          id={id}
                          imgUrl={imgUrl}
                          tools={tools}
                          link={link}
                          gitlink={gitlink}
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
          <Link to="/projects">
            <Flex>
              <p
                style={{
                  paddingRight: "5px",
                  paddingTop: "4px",
                  color: "#fff",
                }}
              >
                See More
              </p>
              <FiChevronDown style={{ fontSize: "2.1em" }} />
            </Flex>
          </Link>
        </Flex>
      </Body>
    </ProjectBody>
  )
}

export default Projects
