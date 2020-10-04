import React from "react"
import { HomeBackground, Title, Text, ProjectCard } from "../../styles/"
import Header from "../../components/header"
import styled from "styled-components"

const data = [{}, {}, {}]

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, max-content));
  grid-gap: 2rem 2rem;
`

const index = props => {
  return (
    <div>
      <Header />
      <HomeBackground style={{ height: "100vh" }}>
        <Grid>
          {data.map(() => (
            <ProjectCard />
          ))}
        </Grid>
      </HomeBackground>
    </div>
  )
}

export default index
