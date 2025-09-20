import { Flex } from "@/styles/"
import styled from "styled-components"
import Image from "next/image"
import { ImageLoader } from "@/utils/Cloudinary"
import React from "react"

import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import { Review } from "@/data/schema"
import { Typography } from "@/components/ui/Typography"
import { GoArrowUpRight } from "react-icons/go"
import RichTextComponent from "@/utils/RichTextComponent"
import classNames from "classnames"

const ImageContainer = styled.div`
  border-radius: 50%;
  border: 2px solid #000;
  position: relative;

  img {
    border: 2px solid #fff8f0;
    border-radius: inherit;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    border-radius: 50%;
    border: 1.5px solid #000;

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
      className={classNames(
        "bg-white rounded-2xl p-4 md:p-6 border border-semi-transparent-grey",
        type === "technical_writing_review" && "border-0"
      )}
    >
      <div className="grid gap-3 md:gap-6">
        <a className="w-fit" href={review.reviewer_link} target={"_blank"}>
          <Flex className="gap-2" direction={"row"}>
            <ImageContainer className="h-14 w-14 md:h-18 md:w-18">
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

                <Flex ml="4px">
                  <GoArrowUpRight className="text-xs md:text-md" />
                </Flex>
              </div>
            </Flex>
          </Flex>
        </a>

        <RichTextComponent richText={review.review_text} />
      </div>
    </div>
  )
}

export default ReviewCard
