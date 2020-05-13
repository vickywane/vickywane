import React, { useState, useEffect } from "react"
import Flex from "styled-flex-component"
import { FiChevronDown } from "react-icons/fi"
import { Link } from "gatsby"
import styled from "styled-components"

import {
  ProjectBody,
  Title,
  Text,
  Bounce,
  Body,
  ProjectGrid as Grid,
} from "../../styles/styles"
import { ProjectData as data } from "./data"
import ProjectCard from "./projectCard"
import media from "styled-media-query"

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
