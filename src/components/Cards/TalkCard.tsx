import { Button, Flex, Icon, Text } from "@/styles"
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
import { BsCameraVideo } from "react-icons/bs"

const PodcastContainer = styled(Flex)`
  background: #c1edcc;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  border-radius: 8px;
  border: 1px solid #131112;
  text-overflow: ellipsis;
  overflow: hidden;

  .summary-ctn {
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

const ThumbnailContainer = styled.div<{ type: string }>`
  min-width: 350px;
  margin-right: 20px;

  .img-ctn {
    height: 100%;
    background: grey;
    position: relative;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: ${({ type }) => (type === "podcasts" ? "100px" : "100%")};
    min-width: ${({ type }) => (type === "podcasts" ? "100px" : "100%")};
    height: 250px;
  }
`

interface TalkCardProps {
  engagement: Engagement
}

const Title = styled(Text)`
  font-size: 34px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 22px;
    margin-top: 15px;
  }
`

const TalkCard = ({ engagement }: TalkCardProps) => {

  return (
    <PodcastContainer>
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

      <Flex direction={"column"}>
        <Title mb={"15px"} fontWeight={500}>
          {engagement.name}
        </Title>
        <hr />

        <div className={"summary-ctn"}>
          <RichTextComponent richText={engagement.summary} />
        </div>

        <Flex mt="20px">
          <Button display="flex" items="center">
            <p> Watch Recording </p>

            <Icon color="#fff">
              <BsCameraVideo />
            </Icon>
          </Button>
        </Flex>
      </Flex>
    </PodcastContainer>
  )
}

export default TalkCard
