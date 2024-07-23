import { Flex, Icon, Text } from "@/styles"
import styled from "styled-components"
// @ts-ignore
import { SiGooglepodcasts } from "react-icons/si"
import { FaPodcast } from "react-icons/fa"
import { Engagement } from "@/data/schema"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import RichTextComponent from "@/utils/RichTextComponent"
import CustomButton from "../Buttons"
import CustomSeperator from "../Seperator"

const PodcastContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #131112;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-direction: row-reverse;

  .summary-ctn {
    height: 100px;
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 20px 0;
  }

  .overlay-ctn {
    position: absolute;
    bottom: -82px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    width: 100%;
    //height: 254px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 10px;
    flex-direction: column;
    //height: 254px;
  }
`

interface EngagementCardProps {
  engagement: Engagement
}

const Title = styled(Text)`
  font-size: 34px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 22px;
  }
`

const PodcastCard = ({ engagement }: EngagementCardProps) => (
  <PodcastContainer>
    <Flex direction={"column"}>
      <Title mb={"15px"} fontWeight={500}>
        {engagement.name}{" "}
      </Title>
      <hr />

      <div className={"summary-ctn"}>
        <RichTextComponent richText={engagement.summary} />
      </div>

      <CustomSeperator text="LISTEN NOW" />

      <Flex mt="30px">
        <Flex mr="30px">
          <CustomButton
            clickAction={() => {}}
            text={"Apple Podcast"}
            icon={
              <Icon color="#fff">
                <FaPodcast />
              </Icon>
            }
          />
        </Flex>

        <Flex>
          <CustomButton
            clickAction={() => {}}
            text={"Google Podcasts"}
            icon={
              <Icon color="#fff">
                <SiGooglepodcasts />
              </Icon>
            }
          />
        </Flex>
      </Flex>
    </Flex>
  </PodcastContainer>
)

export default PodcastCard
