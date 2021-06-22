import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import media from "styled-media-query"

import { HomeBackground, Title, Text } from "../../styles/"
import Header from "../../components/header"
import { CSSTransition } from "react-transition-group"
import GalleryComponent from "./gallery"

const Projects = () => {
  const [Target, setTarget] = useState(0)

  const data = useStaticQuery(graphql`
    query portfolio {
      article {
        getProjects {
          description
          git_link
          images_uri
          name
        }
      }
    }
  `)
  const { description, git_link, images_uri, name } = data.article.getProjects[
    Target
  ]
  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Header />

      <HomeBackground
        style={{ height: "calc(100vh - 60px)", overflowY: "hidden" }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <br />
          <Title>A Gallery Of My Projects</Title>

          <Text>
            Here's a gallery of my projects. Use your keyboard or the icons to
            navigate around.
          </Text>
        </div>

        {data.article.getProjects.map((data, index) => {
          return (
            <CSSTransition unmountOnExit timeout={400} in={index === 0}>
              <GalleryComponent
                data={{ description, git_link, images_uri, name }}
                target={Target}
                prevSlide={() => {
                  if (Target > 0) {
                    setTarget(Target - 1)
                  }
                }}
                nextSlide={() => {
                  // if (Target + 2 <= sample.length) {
                  //   setTarget(Target + 1)
                  // }
                }}
              />
            </CSSTransition>
          )
        })}
      </HomeBackground>
    </div>
  )
}

export default Projects
