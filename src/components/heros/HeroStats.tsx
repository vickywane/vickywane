import styled from "styled-components"
import { Flex, Text } from "@/styles"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"

const Container = styled.div`
  height: 218px;
  background: #c1edcc;
  width: 102%;
  overflow: hidden;
  display: flex;
  place-items: center;
  transform: rotate(-2.5deg) translateX(-20px);

  .content {
    display: flex;
    max-width: 1224px;
    width: 100%;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    transform: rotate(0deg) translateX(0);
    height: 180px;
    width: 100%;

    .content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    padding: 0 10px;
  }
`

const TitleText = styled(Text)`
  font-size: 36px;
  color: #131112;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;
  }
`

const StatsFigures = styled(Text)`
  font-size: 64px;
  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 32px;
  }
`

const TextDelimiter = styled(Text)`
  font-size: 34px;
  margin-right: 60px;
  margin-left: 60px;
  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 32px;
    margin-right: 30px;
    margin-left: 30px;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 32px;
    margin-right: 20px;
    margin-left: 20px;
  }
`

const HeroStats = () => (
  <Container>
    <div className={"content"}>
      <div>
        <TitleText>
          I’m an amazing dev. <br /> with added value for your <br /> business
          solutions.
        </TitleText>
      </div>

      <Flex placeItems={"center"} justify={"center"}>
        <Flex direction={"column"}>
          <StatsFigures align={"center"}> 3 </StatsFigures>
          <Text align="center"> YEARS EXPERIENCE </Text>
        </Flex>

        <TextDelimiter> | </TextDelimiter>

        <Flex direction={"column"}>
          <StatsFigures align={"center"}> 34+ </StatsFigures>
          <Text align="center"> JOBS DONE </Text>
        </Flex>

        <TextDelimiter> | </TextDelimiter>

        <Flex direction={"column"}>
          <StatsFigures align={"center"}> 50+ </StatsFigures>
          <Text align="center"> HAPPY CLIENTS </Text>
        </Flex>
      </Flex>
    </div>
  </Container>
)

export default HeroStats
