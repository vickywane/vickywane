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

const FooterBody = styled.div`
  width: 100%;
  padding: 0.5em 1em;
  height: auto;
  background: linear-gradient(to bottom, #591af7, #1b2f7d);
  color: white;
  text-align: center;
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
  font-family: ${props => (props.project ? null : "comic sans ms")};
  letter-spacing: ${props => (props.project ? null : "0.05em")};
  font-size: ${props => (props.project ? "2.2em" : null)};
`

const Text = styled.p`
  color: ${props => (props.white ? "#fff" : null)};
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

const ProjectBody = styled.div`
  background-color: #2c3e50;
  width: 100%;
  height: auto;
  padding: 0.5em 0.5em;
`

const ProjectHeader = styled.h3`
  text-align: center;
  font-weight: bold;
  color: white;
  padding-top: 30px;
`

const autoGrid = (minColumnWidth = 200, gridGap = 0) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
  gridGap,
})

const Items = styled.div({
  ...autoGrid(220, 20),
  padding: "1em",
  marginLeft: "0.5em",
})

const StyledCard = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0px 3px 4px grey;
  margin: 1em;
`

export {
  StyledCard,
  Items,
  ProjectHeader,
  ProjectBody,
  Name,
  FooterBody,
  Title,
  Body,
  BannerContain,
  Text,
  Button,
  BannerBody,
}
