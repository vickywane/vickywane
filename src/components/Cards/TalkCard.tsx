import { Flex, Text } from "@/styles";
import styled from "styled-components";
import PlayIcon from "@/assets/svg/play-icon.svg";

const PodcastContainer = styled(Flex)`
  background: #C1EDCC;
  width: 457px;
  height: 354px;
  position: relative;
  border-radius: 16px;

  .overlay-ctn {
    position: absolute;
    bottom: -82px;
  }
`;

const OverlayCard = styled(Flex)`
  background: #EBF9EF;
  border-radius: 12px;
  width: 386px;
  height: 289px;

  .play-card {
    background: #fff;
    width: 135px;
    height: 116px;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    place-items: center;
  }

  .icon-ctn {
    height: 46.67px;
    width: 46.67px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    place-items: center;

    background: #EBF9EF;
  }
`;

const TalkCard = () => (
  <PodcastContainer placeItems={"center"} direction={"column"}>
    <div className={"overlay-ctn"}>
      <Text mb={"40px"} align={"center"}> A dummy talk text here for you </Text>

      <OverlayCard placeItems={"center"} justify={"center"}>
        <div className={"play-card"}>
          <div className={"icon-ctn"}>
            <PlayIcon />
          </div>
        </div>
      </OverlayCard>
    </div>
  </PodcastContainer>
);

export default TalkCard;