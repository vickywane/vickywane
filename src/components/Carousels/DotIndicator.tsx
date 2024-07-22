"use client"
import styled from "styled-components"
import React from "react"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"

interface DotIndicatorProps {
  count: number
  activeItem: number
  clickAction: (item: number) => void
}

const CarouselList = styled.ul`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  list-style: none;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 32px;
  }
`

const CarouselListItem = styled.li<{ active: boolean }>`
  height: 15px;
  border-radius: 100%;
  width: 15px;
  background: ${props => (props.active ? "#333333" : "#fff")};
  margin: 0 8px;
  border: 3px solid #333333;
  &:hover {
    cursor: pointer;
    background: #333333;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 12px;
    border-radius: 100%;
    width: 12px;
    border: 1px solid #333333;
  }
`

const DotIndicator = ({ count, activeItem, clickAction }: DotIndicatorProps) => {

  return (
    <CarouselList>
      {new Array(count).fill("").map((_, idx) => (
        <li key={idx}>
          <CarouselListItem
            onClick={() => clickAction(idx)}
            active={idx === activeItem}
          />
        </li>
      ))}
    </CarouselList>
  )
}

export default DotIndicator