import { Flex, Icon, Text } from "@/styles/"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import React from "react"

import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import { Review } from "@/data/schema"
import { Typography } from "../ui/Typography"
import { GoArrowUpRight } from "react-icons/go"
import RichTextComponent from "@/utils/RichTextComponent"
import classNames from "classnames"

const ImageContainer = styled.div`
  height: 65px;
  width: 65px;
  min-width: 65px;
  border-radius: 50%;
  border: 2px solid #000;
  position: relative;
  margin-right: 20px;

  img {
    border: 2px solid #fff8f0;
    border-radius: inherit;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 55px;
    width: 55px;
    min-width: 55px;
    border-radius: 50%;
    border: 1.5px solid #000;
    margin-right: 10px;

    img {
      border: 1px solid #fff8f0;
      border-radius: inherit;
    }
  }
`

interface ReviewCardProps {
  review: Review
  type: "work_review" | "technical_writing_review"
}

const ReviewCard = ({ review, type }: ReviewCardProps) => {
  return (
    <div
      style={{ padding: "20px" }}
      className={classNames(
        "bg-white rounded-2xl p-6 border border-semi-transparent-grey",
        type === "technical_writing_review" && "border-0"
      )}
    >
      <div className="grid gap-6">
        <a className="w-fit" href={review.reviewer_link} target={"_blank"}>
          <Flex direction={"row"}>
            <ImageContainer>
              <Image
                loader={ImageLoader}
                fill
                alt={review.name ?? "review img"}
                src={review.thumbnail?.public_id}
              />
            </ImageContainer>

            <Flex direction={"column"} justify={"center"}>
              <Typography styleAs="heading_4" className="text-[14px]" as="p">
                {review.name}
              </Typography>

              <Typography as="p" styleAs="body">
                {review.reviewer_role}
              </Typography>

              <div className="flex flex-row items-center">
                <Typography as="p" styleAs="body">
                  {review.company}
                </Typography>

                <Flex ml="6px">
                  <GoArrowUpRight className="text-md" />
                </Flex>
              </div>
            </Flex>
          </Flex>
        </a>

        <RichTextComponent richText={review.review_text} />

        {/* {review.work_duration && (
          <Typography as="p" styleAs="body" className="text-xs">
            * We worked at <b> {review.company} </b> from{" "}
            <b> {review.work_duration} </b>
          </Typography>
        )} */}
      </div>
    </div>
  )
}

export default ReviewCard
