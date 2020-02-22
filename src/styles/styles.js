import styled from "styled-components"
import media from "styled-media-query"
import posed from "react-pose"

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
  ${media.lessThan("medium")`
font-size: 2.5em ;
  `};
  ${media.lessThan("large")`
font-size: 3em ;
`};
  ${media.lessThan("small")`
font-size: 2.2em ;
  `};
`

const BannerBody = styled.div`
  color: white;
  width: 100%;
  height: 85vh;
  background: linear-gradient(to bottom, #591af7, #1b2f7d);
  text-align: center;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${media.lessThan("large")`
      padding-bottom: 5rem;
  height: 60vh;
  `};
  ${media.lessThan("medium")`
      padding-bottom: 2rem;
  `};
  ${media.lessThan("small")`
      padding-bottom: 1rem;
  height: 57vh;
  `};
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
  border: 1px solid palevioletred;
  color: palevioletred;
  outline: 0px;
  padding: 0.6em 5em;
  margin: 0.5em 0.5em;
  font-size: 1em;
  &:hover {
    cursor: pointer;
    color: white;
    background: #1b2f7d;
  }
  ${media.lessThan("small")`
font-size: 0.9em ;
  `};
  ${media.lessThan("medium")`
  padding: 0.60em 4em;
  `};

  ${media.lessThan("large")`
  padding: 0.60em 5em;
  `};
`

const Title = styled.h2`
  text-align: center;
  font-weight: ${props => (props.project ? "lighter" : "bold")};
  font-family: ${props => (props.regular ? null : "comic sans ms")};
  color: ${props => (props.black ? "black" : null)};
  letter-spacing: ${props => (props.project ? null : "0.05em")};
  font-size: ${props => (props.project ? "1.5em" : null)};
`

const Text = styled.p`
  color: ${props => (props.white ? "#fff" : null)};
  font-size: ${props => (props.banner ? "1.3em " : "1.3em")};
  text-align: center;
  ${media.lessThan("medium")`
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
  color: #fff;
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
  ...autoGrid(240, 15),
  padding: "0.5em",
})

const IconautoGrid = (minColumnWidth = 50, gridGap = 0) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 0.5fr))`,
  gridGap,
})

const IconItems = styled.div({
  ...IconautoGrid(35, 7),
  paddingBottom: "15px",
  paddingLeft: "20px",
})

const StyledCard = styled.div`
  background: white;
  box-shadow: 0px 5px 7px black;
  margin: 0.5em;
`

const Hover = styled.div`
  cursor: pointer;
`

const Contain = styled.div`
  padding 0.5em 0.5em;
  padding-bottom : 15px;
`

const Bounce = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    textAlign: "center",
  },
  hover: {
    scale: 1.05,
  },
  press: {
    scale: 1.05,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
})

export {
  Bounce,
  Contain,
  StyledCard,
  Hover,
  Items,
  ProjectHeader,
  ProjectBody,
  Name,
  FooterBody,
  Title,
  Body,
  IconItems,
  BannerContain,
  Text,
  Button,
  BannerBody,
}
