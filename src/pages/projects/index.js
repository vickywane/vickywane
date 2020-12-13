import React from "react"
import media from "styled-media-query"

import { HomeBackground, Title, Text, ProjectCard } from "../../styles/"
import Header from "../../components/header"
import styled from "styled-components"
import { Projects } from "../../data"

const Grid = styled.div`
  padding: 1rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
  grid-gap: 2rem 2rem;
  ${media.lessThan("large")`
    grid-gap: 3rem 1rem;
    padding: 1rem .5rem;
     grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  `};
`

const index = props => {
  return (
    <div style={{ height: "100%" }}>
      <Header />

      <HomeBackground
        style={{ height: "calc(100vh - 60px)", overflow: "auto" }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <br />
          <Title>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            voluptas!
          </Title>

          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
            ex optio a perspiciatis magni nemo natus corrupti error! Possimus,
            incidunt.
          </Text>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt="My project view"
            src={
              "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png"
            }
            style={{ height: "80%", width: "80%", objectFit: "contain" }}
          />
        </div>
      </HomeBackground>
    </div>
  )
}

export default index
