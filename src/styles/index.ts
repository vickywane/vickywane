import styled from "styled-components";

export const H2Heading = styled.h2`
  font-family: "Space Grotesk", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 38px;
  line-height: 35px;
  color: ${props => props.color || "#115e65"};
  text-align: ${(props: any) => props.align};

  span {
    text-decoration: underline;
    text-decoration-color: #d0db97;
    text-decoration-thickness: 7px;
    font-weight: 700;
  }
`;

export const Text = styled.p`
  font-family: "Space Grotesk", sans-serif;
  color: ${props => props.color || "#115e65"};
  text-align: ${props => props.align};
  margin: ${props => `${props.mt || 0} ${props.mr || 0} ${props.mb || 0} ${props.ml || 0}`};
  font-size: ${props => props.fontSize || "20px"};
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props: any | string) => props.direction};
  justify-content: ${(props: any | string) => props.justify};
  place-items: ${(props: any | string) => props.placeItems};
`;

export const Button = styled.button`
  width: 149px;
  height: 52px;
  background: ${props => props.background || "#131112"};
  border-color: ${props => props.color || "#fff"};;
  color: ${props => props.color || "#fff"};
  border-width: 2px 2px 2px 0;
  filter: drop-shadow(7px 7px 0px #0D5C63);
  transition: all 300ms;
  transform: translateY(-10px);

  p {
    font-family: "Space Grotesk", serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #ffffff;
  }

  :hover {
    cursor: pointer;
    filter: unset;
    transform: translateY(0);
  }
`;