import styled from "styled-components"
import media from 'styled-media-query'

export const Text = styled.p`
  font-size: 0.85rem;
  text-align: ${props => props.align};
  ${media.lessThan("large")`
  font-size: 0.80rem;
  `};
`

export const Title = styled.h3`
  font-weight: normal;
  text-align: ${props => props.align};
  font-size: 1.2rem;
  ${media.lessThan("large")`
    font-size: 1.1rem;
  `};
`

export const HomeBackground = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: #141821;
`

export const Button = styled.button`
  background-color: ${props =>
    props.background ? props.background : "#6C15B1"};
  height: 45px;
  width: auto;
  display : flex;
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
`

export const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
