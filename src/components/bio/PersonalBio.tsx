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
  height: 450px;
  width: 450px;

  img {
    filter: grayscale(1);
    transition: all 100ms ease-in-out;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    margin-top: 48px;
    height: 550px;
    width: 100%;
  }

  &:hover {
    cursor: pointer;

    img {
      filter: grayscale(0);
    }
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
              src="/v1721832258/personal-portfolio-app/my-picture.jpg"
              alt="Victory Nwani"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                position: "absolute",
              }}
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
