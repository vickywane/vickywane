import React from "react"
import { Container } from "semantic-ui-react"
import styled from "styled-components"

import { ToolsBody, Contain, Text, Label } from "../../../styles/styles"

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem 1rem;
  background: ${props => props.backgroundColor};
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
`

const Tools = () => (
  <div style={{ position: "relative" }}>
    <ToolsBody>
      <Container>
        <Grid
          backgroundColor="white"
          style={{
            borderRadius: "5px",
            position: "relative",
            bottom: "100px",
            paddingTop: "20px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Contain borderBottom center style={{ paddingBottom: "5%" }}>
            <Label
              color="#8c43ff"
              style={{
                fontSize: "1.5rem",
              }}
            >
              Backend Development
            </Label>

            <p>Nodejs</p>
            <p>Expressjs</p>
            <p>MongoDB</p>
            <p>GraphQL</p>
          </Contain>

          <Contain center borderBottom>
            <Label
              color="#8c43ff"
              style={{
                fontSize: "1.5rem",
              }}
            >
              Frontend Development
            </Label>
            <p>React</p>
            <p>HTML</p>
            <p>CSS</p>
            <p>JavaScript</p>
          </Contain>

          <Contain center borderBottom>
            <Label
              color="#8c43ff"
              style={{
                fontSize: "1.5rem",
              }}
            >
              Design
            </Label>

            <p>UI/UX</p>
            <p>iOS/Android</p>
            <p>Logos</p>
          </Contain>

          <Contain center borderBottom>
            <Label
              color="#8c43ff"
              style={{
                fontSize: "1.5rem",
              }}
            >
              Tools
            </Label>
            <p>Adobe Illustrator</p>
            <p>Adobe Photoshop</p>
            <p>Adobe Xd</p>
          </Contain>
        </Grid>
      </Container>
    </ToolsBody>
  </div>
)

export default Tools
