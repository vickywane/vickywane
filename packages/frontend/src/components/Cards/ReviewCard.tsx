import { Flex, Icon, Text } from "@/styles/"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import React from "react"
import { BsArrowUpRightSquare } from "react-icons/bs"

// @ts-ignore
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import { Review } from "@/data/schema"
import { PortableText } from "@portabletext/react"
import { PortableTextComponents } from "@portabletext/react/src"

const Container = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 30px;
  max-width: 750px;

  .image-ctn {
    height: 80px;
    width: 80px;
    min-width: 80px;
    border-radius: 50%;
    border: 2px solid #000;
    position: relative;
    margin-right: 20px;

    img {
      border: 3px solid #fff8f0;
      border-radius: inherit;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    max-width: 100%;
    padding: 12px;

    .image-ctn {
      height: 70px;
      width: 70px;
      min-width: 70px;
      border-radius: 50%;
      border: 1.5px solid #000;
      margin-right: 10px;
  
      img {
        border: 2px solid #fff8f0;
        border-radius: inherit;
      }
    }
  }
`

const richComponent: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text mb={"20px"} mt={"20px"}>
        {children}
      </Text>
    ),
  },
}

interface ReviewCardProps {
  review: Review
  isActive?: boolean
}

const ReviewCard = ({ review, isActive }: ReviewCardProps) => {
  return (
    <Container style={{ background: isActive ? "pink" : "inherit" }}>
      <Flex direction={"column"}>
        <Flex direction={"row"}>
          <div className={"image-ctn"}>
            <Image
              loader={ImageLoader}
              fill
              alt={"maureen"}
              src={review.thumbnail?.public_id}
            />
          </div>

          <Flex direction={"column"} justify={"center"}>
            <Text fontWeight={600}>
              <a href={review.reviewer_link} target={"_blank"}>
                {review.name}
              </a>
            </Text>

            <Text color={"#333333"}>{review.reviewer_role}</Text>

            <Flex mt={"6px"}>
              <Text color={"#333333"}>
                <a href={review.company_link} target={"_blank"}>
                  {review.company}
                </a>
              </Text>

              <Icon ml={"10px"} placeItems={"center"}>
                <BsArrowUpRightSquare />
              </Icon>
            </Flex>
          </Flex>
        </Flex>

        {/* @ts-ignore */}
        <PortableText value={review.review_text} components={richComponent} />

        {review.work_duration && (
          <Text style={{ fontSize: "13px" }}>
            * We worked at <b> {review.company} </b> from{" "}
            <b> {review.work_duration} </b>
          </Text>
        )}
      </Flex>
    </Container>
  )
}

export default ReviewCard
