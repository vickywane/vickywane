"use client"
import styled from "styled-components"
import { Text, H2Heading } from "@/styles"

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`

// @ts-ignore
const PersonalBio = () => (
  <Container>
    <div className={"contents"}>
      <H2Heading>
        Life As A <span>Human</span>
      </H2Heading>
      <br />
      <br />

      <Text>
        I work as a Frontend Engineer and also an advocate for Cloud Engineering
        through written articles on Cloud Services as a Technical Author.
        <br />
        <br />
        I work as a Frontend Engineer and also an advocate for Cloud
        Engineering through written articles on Cloud Services as a Technical
        Author.
      </Text>
    </div>

    <div />
  </Container>
)

export default PersonalBio
