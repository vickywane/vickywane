import React from "react"
import { Flex, Icon, Text } from "@/styles"
import RichTextComponent from "@/utils/RichTextComponent"
import Image from "next/image"
import styled from "styled-components"
import { ImageLoader } from "@/utils/Cloudinary"
import { BsArrowRight } from "react-icons/bs"
import Link from "next/link"
import { getBlogUrl } from "@/utils/linkTransforms"
import { Article } from "@/data/schema"

const RecommendationContainer = styled.div`
  background-color: #fff;
  border: 1px solid grey;
  display: flex;
  border-radius: 15px;

  .container {
    padding: 15px 30px;
  }

  .cover_image {
    position: relative;
    min-width: 250px;
    width: 250px;
    border-radius: 20px;
    margin-right: 25px;
  }
`

interface RecommendationCardProps {
  article: Article
}

const RecommendationCard = ({ article }: RecommendationCardProps) => {
  return (
    <Link href={getBlogUrl(article?.slug)}>
      <RecommendationContainer>
        {article?.cover && (
          <div className="cover_image">
            <Image
              alt={article?.title || ""}
              fill
              style={{ objectFit: "cover", borderRadius: "15px 0 0 15px" }}
              loader={ImageLoader}
              src={article?.cover?.public_id}
            />
          </div>
        )}

        <Flex className="container">
          <div>
            <Text fontSize="28px" fontWeight={600} mb="22px">
              {article?.title}
            </Text>
            <RichTextComponent richText={article.summary} />

            <Flex mt="20px">
              <Flex>
                <Flex placeItems="center">
                  <Text color={"#131112"} fontSize={"15px"}>
                    Read Article
                  </Text>
                </Flex>

                <Icon ml="10px" placeItems={"center"}>
                  <BsArrowRight color={"#131112"} />
                </Icon>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </RecommendationContainer>
    </Link>
  )
}

export default RecommendationCard
