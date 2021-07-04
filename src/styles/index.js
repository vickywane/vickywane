import styled from "styled-components"
import media from "styled-media-query"

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.alignItems};
  row-gap: ${props => props.rowGap}px;
  ${media.lessThan("medium")`
    flex-direction: ${props =>
      props.direction && (props.responsive ? "column" : props.direction)};
  `};
`

export const ProjectCard = styled.div`
  height: 370px;
  background: #282c34;
  box-shadow: 0 2px 3px black;
  width: 23rem;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  border: 1px solid #282c34;
  ${media.lessThan("large")`
     width: 20rem;
      height: 310px;
  `};
`

export const Card = styled.div`
  background-color: #282c34;
  width: 95%;
  height: auto;
  padding: 1rem 1rem;
  border-radius: 5px;
  margin: 1rem 0.5rem;
`

export const HoverLink = styled.div`
  padding-left: 10px;
  color: orange;
  cursor: pointer;
  a {
    text-decoration: none;
    color: ${props => props.color ? props.color : "white"};
  }
  &:hover {
    text-decoration: 1.5px orange underline;
    text-decoration-style: wavy;
  }
`

export const Text = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  font-weight: normal;

  max-width: ${props => props.maxWidth};
  text-align: ${props => props.align};
  ${media.lessThan("large")`
  font-size: 0.85rem;
  `};
`

export const Title = styled.h3`
  font-weight: ${props => (props.weight ? props.weight : "normal")};
  text-align: ${props => props.align};
  font-size: ${props => (props.small ? "1rem" : "1.2rem")};
  color: ${props => props.color};
  ${media.lessThan("large")`
     font-size: ${props => (props.small ? "0.95rem" : "1.2rem")};
  `};
  ${media.lessThan("medium")`
  font-size: ${props => (props.small ? "0.85rem" : "1.1rem")};
`};
`

export const HomeBackground = styled.div`
  height: 100%;
  width: 100%;
  background-color: #141821;
`

export const Button = styled.button`
  background-color: ${props =>
    props.background ? props.background : "#6C15B1"};
  height: 45px;
  width: auto;
  display: flex;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 0.85rem;
  transition: all 400ms;
  border: 1px solid
    ${props => (props.background ? props.background : "#6C15B1")};
  border-radius: 5px;
  &: hover {
    cursor: pointer;
    background-color: ${props =>
      props.background ? props.background : "#44136A"};
    border: 1px solid
      ${props => (props.background ? props.background : "#44136A")};
    transform: ${props => props.up && "translateY(-5%)"};
  }
  ${media.lessThan("medium")`
    height: 38px;
  `}
  ${media.lessThan("small")`
    font-size: 0.75rem;
  `}
  a {
    text-decoration : none;
    color: ${props => props.linkColor ?  props.linkColor  : "white"};
  }
`

export const IconHover = styled.div`
  font-size: 1rem;
  color: ${props => (props.color ? props.color : "white")};
  &: hover {
    cursor: pointer;
  }
`

export const MenuIconContainer = styled.div`
  display: none;
  ${media.lessThan("small")`
      display : flex;
      justify-content : center;
      align-items : center;
  `}
`


export const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
