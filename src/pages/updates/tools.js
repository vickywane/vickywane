import React from "react"
import { Container, Grid, Icon } from "semantic-ui-react"

const About = () => (
  <div style={{ position: "relative" }}>
    <div
      style={{ width: "100vw", minHeight: "900px", backgroundColor: "#8c43ff" }}
    >
      <Container>
        <Grid
          stackable
          centered
          columns={3}
          style={{
            borderRadius: "5px",
            position: "relative",
            bottom: "100px",
            backgroundColor: "white",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Grid.Column
            style={{
              borderRight: "1px solid #e6ecf8",
              borderBottom: "1px solid #e6ecf8",
            }}
            textAlign="center"
          >
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
            <p
              style={{
                marginTop: "25px",
                fontSize: "1.25rem",
                color: "#8c43ff",
              }}
            >
              Tools
            </p>
            <p>GraphCMS (Headless CMS)</p>
            <p>Mlab</p>
            <p>OAuth</p>
            <p>Postman</p>
          </Grid.Column>
          <Grid.Column
            style={{
              borderRight: "1px solid #e6ecf8",
              borderBottom: "1px solid #e6ecf8",
              paddingTop: "20px",
            }}
            textAlign="center"
          >
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
            <p style={{ marginTop: "10px", fontSize: "1rem", padding: "15px" }}>
              I am a framework/library lover. Currently obsessed with React and
              Gatsby
              <br />
              <br />
              <br />
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
            <p
              style={{
                marginTop: "25px",
                fontSize: "1.25rem",
                color: "#8c43ff",
              }}
            >
              Tools
            </p>
            <p>VSCode</p>
            <p>Git</p>
            <p>Hyper</p>
            <p>Bootstrap</p>
            <p>Gatsby</p>
          </Grid.Column>
          <Grid.Column style={{ paddingTop: "20px" }} textAlign="center">
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
            <p style={{ marginTop: "25px", fontSize: "1rem", padding: "15px" }}>
              I love to dabble in design and keep my mind creative. I have a
              great appreciaiton for simple website/app design and bright colors
              <br />
              <br />
            </p>
            <p
              style={{
                marginTop: "25px",
                fontSize: "1.25rem",
                color: "#8c43ff",
              }}
            >
              Design Specialties
            </p>
            <p>UI/UX</p>
            <p>Web</p>
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
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  </div>
)

export default About
