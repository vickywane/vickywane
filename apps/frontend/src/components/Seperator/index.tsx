import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import React from "react"
import styled from "styled-components"

const StyledHr = styled.hr`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: #115e65;
  text-align: center;
  height: 1.5em;
  opacity: 1;
  font-size: 16px;
  &:before {
    content: "";
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: #115e65;
    
    padding: 0 0.5em;
    line-height: 1.5em;
    color: #115e65;
    background-color: #fff8f0;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 12px;
  }
`

const CustomSeperator = ({ text }: { text?: string }) => (
  <div>
    <StyledHr data-content={text} />
  </div>
)

export default CustomSeperator
