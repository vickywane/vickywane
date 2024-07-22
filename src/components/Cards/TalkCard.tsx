import { Button, Flex, H3Heading, Text } from "@/styles"
import styled from "styled-components"
// @ts-ignore
import Image from "next/image"
import { Engagement } from "@/data/schema"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import RichTextComponent from "@/utils/RichTextComponent"
import { ImageLoader } from "@/utils/Cloudinary"
import { GrTag } from "react-icons/gr"

const PodcastContainer = styled(Flex)`
  background: white;
  width: 650px;
  height: 850px;
  margin: "0 32px";
  position: relative;
  border: 1px solid #131112;
  text-overflow: ellipsis;
  overflow: hidden;
  filter: drop-shadow(14px 14px 0 #0d5c63);
  transition: all 300ms;

  .summary-ctn {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 20px 0;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    width: 100%;
    flex-direction: column;
  }

  &:hover {
    filter: drop-shadow(0 0 0 #0d5c63);
    cursor: pointer;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    filter: drop-shadow(0 0 0 #0d5c63);
  }
`

const ThumbnailContainer = styled.div<{ type: string }>`
  width: 100%;

  .img-ctn {
    height: 350px;
    position: relative;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    .img-ctn {
      height: 300px;
      position: relative;
    }
  }
`

interface TalkCardProps {
  engagement: Engagement
}

const RootContainer = styled(Flex)`
  margin: 0 32px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin: 0 8px;
  }
`

const TalkCard = ({ engagement }: TalkCardProps) => {
  return (
    <RootContainer direction="column">
      <PodcastContainer direction="column">
        {engagement?.thumbnail && (
          <ThumbnailContainer type={(engagement?.type as unknown) as string}>
            <div className={"img-ctn"}>
              <Image
                loader={ImageLoader}
                src={engagement?.thumbnail?.public_id}
                alt={engagement?.name || ""}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          </ThumbnailContainer>
        )}

        <br />

        <Flex direction={"column"} ml="20px" mr="20px">
          <Flex direction="column">
            <H3Heading mb="4px" fontWeight={500}>
              {engagement.name}
            </H3Heading>

            <Flex>
              <Flex mr="8px" placeItems="center">
                <GrTag color="#131112" size={20} />
              </Flex>

              <Flex mt="2px" placeItems="center">
                <Text color="#131112"> {engagement.event_name} </Text>
              </Flex>
            </Flex>

            <br />
            <hr />
          </Flex>

          <div className={"summary-ctn"}>
            <RichTextComponent richText={engagement.summary} />
          </div>
        </Flex>
      </PodcastContainer>
    </RootContainer>
  )
}

export default TalkCard