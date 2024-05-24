"use client"
import { Flex, Text } from "@/styles"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import styled from "styled-components"
import { IoIosLink } from "react-icons/io"
import { useSchema } from "sanity"
import { useState } from "react"

interface SectionIndicatorProps {
  text: string
  id: string
}

export const SectionBoxIndicator = styled(Flex)`
  height: 50px;
  background: #131112;
  width: fit-content;
  padding: 0 45px;
  border-radius: 0 60px 0 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 40px;
    padding: 0 30px;
  }
`

const Anchor = styled.a`
  color: #fff;
  text-decoration: none;
  &:target {
    margin-top: 100px;
  }
`

const SectionIndicator = ({ text, id }: SectionIndicatorProps) => {
  const [isHovering, setOnHover] = useState(false)

  return (
    <SectionBoxIndicator
      onMouseLeave={() => setOnHover(false)}
      onMouseEnter={() => {
        setOnHover(true)

        console.log("ENTERED!!");
        
    }}
      placeItems="center"
    >
      <Flex>
        {isHovering && (
          <Flex mr="8px" justify="center" placeItems="center">
            <IoIosLink size={22} color="white" />
          </Flex>
        )}

        <Text>
          <Anchor id={id} href={`#${id}`}>
            {text}
          </Anchor>
        </Text>
      </Flex>
    </SectionBoxIndicator>
  )
}

export default SectionIndicator
