import * as React from "react"
import { Container } from "semantic-ui-react"

import {
  ToolsBody,
  Contain,
  ToolsGrid as Grid,
  Label,
} from "../../../styles/styles"

class Tools extends React.Component {
  state = {
    opacity: 0,
  }

  componentDidMount() {
    if (typeof window.IntersectionObserver === `function`) {
      this.observer = new window.IntersectionObserver(this.observerCallback, {
        threshold: 0.8,
      })

      this.observer.observe(this.container)
    }
  }

  observerCallback = entries => {
    setTimeout(() => {
      const entry = entries.slice(0).shift()
      if (entry.isIntersecting) {
        this.setState({
          // visible: entry.isIntersecting,
          opacity: 1,
        })
      }
    }, 100)
  }

  componentWillUnmount() {
    this.observer.unobserve(this.container)
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <ToolsBody>
          <Container>
            <Grid
              opacity={this.state.opacity}
              ref={node => (this.container = node)}
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
  }
}

export default Tools
