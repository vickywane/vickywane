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
import { MdPodcasts } from "react-icons/md"
import { GiHumanPyramid } from "react-icons/gi"

import { BsArrowRight } from "react-icons/bs"

const Container = styled(Flex)`
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
    margin: 10px 0 20px 0;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    width: 100%;
    flex-direction: column;
    filter: drop-shadow(0 0 0 #0d5c63);
  }

  &:hover {
    filter: drop-shadow(0 0 0 #0d5c63);
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 650px;
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
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .img-ctn {
      height: 250px;
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

const MediaButton = styled(Button)`
  filter: drop-shadow(7px 7px 0px transparent);
`

const LabelContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .content {
    display: flex;
    justify-content: center;
    place-items: center;
    position: absolute;
    z-index: 5;
    background: #115e65;
    height: 40px;
    width: 120px;
    flex-direction: row;
    /* opacity: .7; */

    p {
      margin-left: 8px;
      color: white;
      text-transform: capitalize;
    }

    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      height: 35px;
      width: 90px;
    }
  }
`

const Label = ({ type }: { type: string }) => (
  <LabelContainer>
    <div className="content">
      {type === "talks" ? (
        <GiHumanPyramid color="white" size={20} />
      ) : (
        <MdPodcasts color="white" size={20} />
      )}

      <Text> {type} </Text>
    </div>
  </LabelContainer>
)

const TalkCard = ({ engagement }: TalkCardProps) => {
  return (
    <RootContainer direction="column">
      <Container direction="column">
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

              <Label type={engagement.type} />
            </div>
          </ThumbnailContainer>
        )}


        <Flex
          direction={"column"}
          justify="space-between"
          style={{ height: "100%" }}
          mt="8px"
          ml="15px"
          mr="15px"
        >
          <Flex direction="column">
            <H3Heading mb="4px" fontWeight={500}>
              <a href={engagement.event_link}>{engagement.name}</a>
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
            <RichTextComponent
              richText={engagement.summary}
              maxTextLength={40}
            />
          </div>

          <a href={engagement.event_link}>
            <Flex justify="flex-end">
              <MediaButton>Watch Event Recording</MediaButton>
            </Flex>
          </a>
        </Flex>
      </Container>
    </RootContainer>
  )
}

export default TalkCard
