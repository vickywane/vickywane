"use client"
import { Flex, Text } from "@/styles"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import styled from "styled-components"
import { IoIosLink } from "react-icons/io"
import { useState } from "react"
import { Typography } from "../ui/Typography"

interface SectionIndicatorProps {
  text: string
  id: string
}

export const SectionBoxIndicator = styled(Flex)`
  height: 40px;
  background: #131112;
  width: fit-content;
  padding: 0 45px;
  border-radius: 0 60px 0 0;
  margin: 42px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 35px;
    padding: 0 15px;
    margin: 26px 0;
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
      }}
      placeItems="center"
    >
      <Flex>
        <Typography as="p" styleAs="body">
          <Anchor id={id} href={`#${id}`}>
            {text}
          </Anchor>
        </Typography>
      </Flex>
    </SectionBoxIndicator>
  )
}

export default SectionIndicator
