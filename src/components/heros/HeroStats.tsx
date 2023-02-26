import styled from "styled-components";
import { Flex, Text } from "@/styles";

const Container = styled.div`
  height: 218px;
  background: #C1EDCC;
  width: 105%;
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
`;

const HeroStats = () => (
  <Container>
    <div className={"content"}>
      <div>
        <Text color={"#131112"} fontSize={"36px"}> I’m an amazing dev. <br /> with added value for your <br /> business
          solutions. </Text>
      </div>

      <Flex placeItems={"center"}>
        <Flex direction={"column"}>
          <Text fontSize={"64px"} align={"center"}> 3 </Text>
          <Text> YEARS EXPERIENCE </Text>
        </Flex>

        <Text mr={"60px"} ml={"60px"} fontSize={"34px"}> | </Text>


        <Flex direction={"column"}>
          <Text fontSize={"64px"} align={"center"}> 34+ </Text>
          <Text> JOBS DONE </Text>
        </Flex>

        <Text mr={"60px"} ml={"60px"} fontSize={"34px"}> | </Text>


        <Flex direction={"column"}>
          <Text fontSize={"64px"} align={"center"}> 50+ </Text>
          <Text> HAPPY CLIENTS </Text>
        </Flex>
      </Flex>
    </div>
  </Container>
);

export default HeroStats;