import styled from "styled-components"

export const Text = styled.p`
  font-size: 1.1rem;
  text-align: ${props => props.align};
`

export const Title = styled.h3`
  font-weight: normal;
  text-align: ${props => props.align};
  font-size: 1.5rem;
`

export const HomeBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141821;
`

export const Button = styled.button`
  background-color: ${props =>
    props.background ? props.background : "#6C15B1"};
  height: 50px;
  width: auto;
  padding: 0.5rem 1rem;
  color: #fff;
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
