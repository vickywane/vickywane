import * as React from "react"
import { Container } from "semantic-ui-react"

import {
  ToolsBody,
  Contain,
  ToolsGrid as Grid,
  Label,
  ListItems,
  Text,
} from "../../../styles/styles"
import Flex from "styled-flex-component"

// TODO: Convert && extract this into an independent functional hook
class Tools extends React.Component {
  state = {
    opacity: 0,
  }

  componentDidMount() {
    this.observer = new window.IntersectionObserver(this.observerCallback, {
      threshold: 0.5,
    })

    this.observer.observe(this.container)
  }

  observerCallback = entries => {
    setTimeout(() => {
      const entry = entries.slice(0).shift()
      if (entry.isIntersecting) {
        this.setState({
          opacity: 1,
        })
      }
    }, 50)
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
              <Contain center borderBottom style={{ paddingBottom: "5%" }}>
                <div>
                  {" "}
                  <Label
                    color="#8c43ff"
                    style={{
                      fontSize: "1.5rem",
                    }}
                  >
                    Backend
                  </Label>
                  <ListItems>
                    <Text> Node.js </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> Express.js </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> GraphQL </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> MongoDB </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> Golang </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> Gin </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> gRPC </Text>{" "}
                  </ListItems>{" "}
                  <ListItems>
                    <Text> Postgres </Text>{" "}
                  </ListItems>
                </div>
              </Contain>
              <Contain center borderBottom>
                <Label
                  color="#8c43ff"
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  Frontend
                </Label>
                <p>React</p>
                <p>Vue</p>
                <p>Svelte</p>
                <p>JavaScript</p>
              </Contain>
              <Contain center borderBottom>
                <Label
                  color="#8c43ff"
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  Technologies
                </Label>
                <p>Docker</p>
                <p>Kubernetes</p>
                <p>Cloud Sql</p>
                <p>Prometheus</p>
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
                <p>WebStorm</p>
                <p>Goland</p>
                <p>Vs Code</p>
                <p>PgAdmin</p>
              </Contain>
            </Grid>
          </Container>
        </ToolsBody>
      </div>
    )
  }
}

export default Tools
