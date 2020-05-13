import React, { useState, useEffect } from "react"
import Flex from "styled-flex-component"
import { FiChevronDown } from "react-icons/fi"
import { Link } from "gatsby"

import {
  ProjectBody,
  Title,
  Text,
  Bounce,
  Body,
  ProjectGrid as Grid,
} from "../../styles/styles"
import ProjectCard from "./projectCard"
import media from "styled-media-query"

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
          <Grid>
            {data.map(({ id, name, gitlink, imgUrl, link, tools }) => {
              return (
                <Bounce style={{ margin: "0.5em" }}>
                  <ProjectCard
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
          </Grid>
        ) : (
          <div>
            {!Display ? (
              <p style={{ textAlign: "center" }}> Loading ... </p>
            ) : (
              <Grid>
                {newdata[1].map(
                  ({ id, name, gitlink, imgUrl, link, tools }) => {
                    return (
                      <Bounce>
                        <ProjectCard
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
              </Grid>
            )}
          </div>
        )}

        <br />
        <Flex justifyCenter>
          <Link style={{ textDecoration: "none" }} to="/projects/allProjects">
            <Flex>
              <Text white>See More</Text>
              <FiChevronDown style={{ fontSize: "2.1em" }} />
            </Flex>
          </Link>
        </Flex>
      </Body>
    </ProjectBody>
  )
}

export default Projects
