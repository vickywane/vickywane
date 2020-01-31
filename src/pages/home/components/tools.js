import React from "react"
import { Container, Grid, Icon } from "semantic-ui-react"
import styled from "styled-components"

const Contain = styled.div`
  text-align: center;
  padding-bottom: 5%;
`

const Div = styled.div`
width: 100vw 
min-height: 400px 
margin-bottom: 10%
background-color: #591af7  
 
`

const Tools = () => (
  <div style={{ position: "relative" }}>
    <Div>
      <Container>
        <Grid
          stackable
          centered
          columns={3}
          style={{
            borderRadius: "5px",
            position: "relative",
            bottom: "100px",
            paddingTop: "20px",
            backgroundColor: "white",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Contain>
            <Icon color="violet" name="database" size="huge" />
            <p
              style={{
                marginTop: "15px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Backend Development
            </p>

            <p
              style={{
                marginTop: "25px",
                fontSize: "1.25rem",
                color: "#8c43ff",
              }}
            >
              Languages/Tech
            </p>
            <p>Nodejs</p>
            <p>Expressjs</p>
            <p>MongoDB</p>
            <p>GraphQL</p>
          </Contain>

          <hr />
          <Contain>
            <Icon color="violet" name="computer" size="huge" />
            <p
              style={{
                marginTop: "15px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Frontend Development
            </p>

            <p
              style={{
                marginTop: "10px",
                fontSize: "1.25rem",
                color: "#8c43ff",
              }}
            >
              Languages/Tech
            </p>
            <p>React</p>
            <p>HTML</p>
            <p>CSS</p>
            <p>JavaScript</p>
          </Contain>
          <hr />

          <Contain>
            <Icon color="violet" name="paint brush" size="huge" />
            <p
              style={{
                marginTop: "15px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Design
            </p>

            <p>UI/UX</p>
            <p>iOS/Android</p>
            <p>Logos</p>
            <p
              style={{
                marginTop: "25px",
                fontSize: "1.25rem",
                color: "#8c43ff",
              }}
            >
              Tools
            </p>
            <p>Adobe Illustrator</p>
            <p>Adobe Photoshop</p>
            <p>Adobe Xd</p>
          </Contain>
        </Grid>
      </Container>
    </Div>
  </div>
)

export default Tools
