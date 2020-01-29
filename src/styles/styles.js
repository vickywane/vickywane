import styled from "styled-components"
import media from "styled-media-query"

const Body = styled.div`
  padding-left: ${props => (props.banner ? "12em" : "8em")};
  padding-right: ${props => (props.banner ? "12em" : "8em")};
  ${media.lessThan("large")`
  padding-left: 1.5em;
  padding-right: 1.5em;
  `};
  ${media.lessThan("medium")`
  padding-left: 1.5em;
  padding-right: 1.5em;
  `};
  ${media.lessThan("small")`
  padding-left: 0.4em;
  padding-right: 0.4em;
`};
`

const Name = styled.h1`
  font-size: 3.5em;
`

const BannerBody = styled.div`
  color: white;
  width: 100%;
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

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-family: comic sans ms;
  letter-spacing: 0.05em;
`

const Text = styled.p`
  font-size: ${props => (props.banner ? "1.3em " : "1.1em")};
  text-align: center ${media.lessThan("medium")`
  font-size: ${props => (props.banner ? "1.10em " : "1.20em")};
`};
  ${media.lessThan("large")`
font-size: ${props => (props.banner ? "1.20em " : "1.1em")};
`};
  ${media.lessThan("small")`
font-size: ${props => (props.banner ? "1em " : "1.10em")};
  `};
`

export { Name, Title, Body, BannerContain, Text, Button, BannerBody }
