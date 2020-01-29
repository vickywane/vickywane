import styled from "styled-components"
import media from "styled-media-query"

const Body = styled.div``

const Name = styled.h1`
    font-weight : bold 
    font-size : 4em
`

const BannerBody = styled.div`
  color: white;
  width: 100%;
  padding-top: 5%;
  height: 60vh;
  background: linear-gradient(to bottom, #591af7, #1b2f7d);
  text-align: center;
  width: 100vw;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -2px;
`

const BannerContain = styled.div`
  width: 100%;
  width: 100vw;
  position: relative;
  top: -2px;
`

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1.1px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size : 1.1em
  width : 30%
  height : 60px
  font-weight : bold
	&:hover {
    cursor: pointer;
    color: white;
    background: #1b2f7d;
  }
`

const Text = styled.p`
  font-size: ${props => (props.items ? "1.27em " : "1.3em")};
  ${media.lessThan("medium")`
  font-size: ${props => (props.items ? "1.10em " : "1.20em")};
`};
  ${media.lessThan("large")`
font-size: ${props => (props.items ? "1.20em " : "1.27em")};
`};
  ${media.lessThan("small")`
font-size: ${props => (props.items ? "1em " : "1.10em")};
  `};
`

export { Name, Body, BannerContain, Text, Button, BannerBody }
