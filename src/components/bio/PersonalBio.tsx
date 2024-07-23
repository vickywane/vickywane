"use client"
import styled from "styled-components"
import { H2Heading, Flex } from "@/styles"
import { Homepage } from "@/data/schema"
import Layout from "@/styles/Layout"
import { TABLET_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import RichTextComponent from "@/utils/RichTextComponent"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    grid-template-columns: 100%;
  }
`

interface PersonalBioProps {
  human_text: Homepage["human_description"]
}

const ImageContainer = styled.div`
  position: relative;
  height: 400px;
  width: 400px;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    margin-top: 48px;
    width: 100%;
  }
`

const PersonalBio = ({ human_text }: PersonalBioProps) => {
  return (
    <Layout>
      <Container>
        <div>
          <H2Heading id="personal-bio">
            Life As A <span>Human</span>
          </H2Heading>
          <RichTextComponent richText={human_text} />
        </div>

        <Flex placeItems="center" justify="center" style={{}}>
          {/* HUMAN IMAGE TO THE LEFT LATER....   */}

          <ImageContainer>
            <Image
              src="/v1719747245/personal-portfolio-app/axih6ri1t5zsul540a7r.jpg"
              alt="Victory Nwani"
              style={{ objectFit: "cover", objectPosition: "top", position: "absolute" }}
              loader={ImageLoader}
              fill
            />
          </ImageContainer>
        </Flex>
      </Container>
    </Layout>
  )
}
export default PersonalBio
