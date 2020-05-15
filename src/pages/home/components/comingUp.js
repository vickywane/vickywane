import * as React from "react"
import Flex from "styled-flex-component"
import { FiX } from "react-icons/fi"
import styled from "styled-components"

import { Body, Hover, Text, CardBody, Title } from "../../../styles/styles"

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
`

const ComingUp = () => {
  const [visible, setVisibility] = React.useState(false)

  return (
    <Body>
      <Grid>
        <CardBody>
          <Title small colored>
            Optimised logging with StackDriver
          </Title>
          <br />
          <Text style={{ color: "#090e3a" }}>
            {" "}
            The Cloud Functions was built to help handle mundane tasks within
            backend servers. It provides a way to handle simple tasks with a
            minimal setip.
          </Text>{" "}
          <hr /> <Text center> 12 - 12 - 12 </Text>
        </CardBody>
      </Grid>
    </Body>
  )
}

export default ComingUp
