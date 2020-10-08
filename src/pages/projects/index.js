import React from "react"
import { HomeBackground, Title, Text, ProjectCard } from "../../styles/"
import Header from "../../components/header"
import styled from "styled-components"
import { Projects } from "../../data"

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    grid-gap: 2rem 2rem;
`

const index = props => {
    return (
        <div>
            <Header />

            <HomeBackground style={{ height: "100vh" }}>
                <Grid>
                    {Projects.map(({ id, name, description }) => (
                        <ProjectCard>
                            <div>
                                <Title align="center"> {name} </Title>
                            </div>

                            <Text> {description} </Text>
                        </ProjectCard>
                    ))}
                </Grid>
            </HomeBackground>
        </div>
    )
}

export default index
