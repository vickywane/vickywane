"use client";
import styled from "styled-components";
import { H2Heading, Text } from "@/styles";
import { Homepage } from "@/data/schema";
import Layout from "@/styles/Layout";
import { TABLET_BREAKPOINT } from "@/styles/useStyleWidthQuery";
import RichTextComponent from "@/utils/RichTextComponent";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    grid-template-columns: 100%;
  }
`;

interface PersonalBioProps {
  human_text: Homepage["human_description"];
}

const PersonalBio = ({ human_text }: PersonalBioProps) => {
  return (
    <Layout>
      <H2Heading>
        Life As A <span>Human</span>
      </H2Heading>

      <Container>
        <RichTextComponent richText={human_text} />

        <div>
          {/* HUMAN IMAGE TO THE LEFT LATER....   */}
        </div>
      </Container>
    </Layout>
  );
};
export default PersonalBio;
