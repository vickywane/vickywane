"use client"
import { Company } from "@/data/schema"
import { Flex } from "@/styles"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import { ImageLoader } from "@/utils/Cloudinary"
import Image from "next/image"
import Ticker from "react-ticker"
import styled from "styled-components"

const TickerContainer = styled.div`
  background-color: #fff8f0;
  border-top: 2px solid #115e65;
  padding: 26px 0;
  border-bottom: "2px solid #115e65";
`

const ImageFlex = styled(Flex)`
  position: relative;
  height: 60px;
  width: 250px;
  margin: 0 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 40px;
    width: 150px;
    margin: 0 12px;
  }
`

const CompaniesTickerList = ({ companies }: { companies: Company[] }) => (
  <TickerContainer>
    <Ticker speed={10}>
      {({ index }) => (
        <Flex>
          {companies.map((items, idx) => (
            <ImageFlex key={idx}>
              <Image
                alt={items.name || ""}
                fill
                src={items.thumbnail.public_id}
                loader={ImageLoader}
                style={{ position: "absolute", objectFit: "contain" }}
              />
            </ImageFlex>
          ))}
        </Flex>
      )}
    </Ticker>
  </TickerContainer>
)

export default CompaniesTickerList
