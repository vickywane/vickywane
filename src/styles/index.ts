import styled from "styled-components"
import type {} from "styled-components/cssprop"
import { StyledProps } from "@/types/StyledProps"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"

export const Anchor = styled.a`
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`

export const ULList = styled.ul`
  list-style: square;
  margin-left: 26px;

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    margin-left: 16px;
  }
`

export const ArticleList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 60px 50px;
  list-style: none;
  margin-top: 40px;
`

export const H2Heading = styled.h2<StyledProps>`
  font-style: normal;
  font-weight: ${props => props.fontWeight || 400};
  font-size: 38px;
  line-height: 35px;
  color: ${props => props.color || "#115e65"};
  text-align: ${props => props.align};
  margin-bottom: 30px;

  span {
    text-decoration: underline;
    text-decoration-color: #d0db97;
    text-decoration-thickness: 7px;
    font-weight: 700;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 28px;
    margin-bottom: 15px;

    span {
      text-decoration-thickness: 4px;
      font-weight: 600;
    }
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 24px;
    margin-bottom: 15px;

    span {
      text-decoration-thickness: 3px;
      font-weight: 600;
    }
  }
`

export const H3Heading = styled.h3<StyledProps>`
  font-style: normal;
  font-weight: ${props => props.fontWeight || 400};
  font-size: 28px;
  line-height: 35px;
  color: ${props => props.color || "#115e65"};
  text-align: ${props => props.align};
  margin-bottom: 30px;

  span {
    text-decoration: underline;
    text-decoration-color: #d0db97;
    text-decoration-thickness: 7px;
    font-weight: 700;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 22px;
    margin-bottom: 15px;

    span {
      text-decoration-thickness: 4px;
      font-weight: 600;
    }
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 20px;
    margin-bottom: 15px;

    span {
      text-decoration-thickness: 3px;
      font-weight: 600;
    }
  }
`

export const H4Heading = styled.h3<StyledProps>`
  font-style: normal;
  font-weight: ${props => props.fontWeight || 400};
  font-size: 21px;
  line-height: 35px;
  color: ${props => props.color || "#115e65"};
  text-align: ${props => props.align};
  margin-bottom: 10px;

  span {
    text-decoration: underline;
    text-decoration-color: #d0db97;
    text-decoration-thickness: 4px;
    font-weight: 700;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 22px;
    margin-bottom: 10px;

    span {
      text-decoration-thickness: 4px;
      font-weight: 600;
    }
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 20px;
    margin-bottom: 8px;

    span {
      text-decoration-thickness: 3px;
      font-weight: 600;
    }
  }
`

export interface LayoutProps {
  bg?: string
}

export const ContentLayout = styled.div<LayoutProps>`
  background-color: ${props => props.bg || "inherit"};

  .content-elements {
    margin: 0 auto;
    max-width: 1404px;
    padding: 100px 26px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    .content-elements {
      padding: 100px 40px;
    }
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .content-elements {
      padding: 40px 16px;
    }
  }
`

export const Text = styled.p<StyledProps>`
  color: ${props => props.color || "#115e65"};
  line-height: 38px;
  text-align: ${props => props.align};
  margin: ${props =>
    `${props.mt || 0} ${props.mr || 0} ${props.mb || 0} ${props.ml || 0}`};
  font-size: ${props => props.fontSize || "20px"};
  font-weight: ${props => props.fontWeight};

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    line-height: 26px;
    font-size: ${props => props.fontSize || "14px"};
  }
`

export const Flex = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  margin: ${props =>
    `${props.mt || 0} ${props.mr || 0} ${props.mb || 0} ${props.ml || 0}`};
  place-items: ${props => props.placeItems};
`

export const Icon = styled(Flex)`
  font-size: 24px;
  color: ${props => props.color || "#000"};

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    font-size: 20px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 16px;
  }
`

export const Button = styled.button<StyledProps>`
  width: auto;
  padding: 0 26px;
  height: 52px;
  display: ${props => props.display || ""};
  flex-direction: ${props => props.direction || ""};
  background: ${props => props.background || "#131112"};
  border-color: ${props => props.color || "#fff"};
  color: ${props => props.color || "#fff"};
  border-width: 2px 2px 2px 0;
  filter: drop-shadow(7px 7px 0px #0d5c63);
  transition: all 300ms;
  transform: translateY(-10px);
  align-items: ${props => props.items || ""};
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: ${props => props.color || "#fff"};
    margin: 0 15px;
  }

  :hover {
    cursor: pointer;
    filter: unset;
    transform: translateY(0);
  }

  @media (max-width: 960px) {
    p {
      font-size: 13px;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 45px;

    :hover {
      pointer-events: none;
    }

    :active {
      cursor: pointer;
      filter: unset;
      transform: translateY(0);
    }
  }
`
