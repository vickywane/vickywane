import styled from "styled-components"
import media from "styled-media-query"
import posed from "react-pose"

const Body = styled.div`
  padding-left: ${props => (props.banner ? "12em" : "8em")};
  padding-right: ${props => (props.banner ? "12em" : "8em")};
  ${media.lessThan("huge")`
  padding: 1rem 5rem;
  `};
  ${media.lessThan("large")`
  padding: 0.5rem 1.5rem;
  `};
  ${media.lessThan("medium")`
padding: 0.5rem 0.5rem;
  `};
  ${media.lessThan("small")`
padding: 0.5rem 0.5rem;
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
  height: 80vh;
  background: linear-gradient(to bottom, #591af7, #1b2f7d);
  text-align: center;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7rem;
  position: relative;
  ${media.lessThan("large")`
      padding-bottom: 5rem;
  padding-top: 1rem;
  justify-content: center;
  height: 60vh;
  `};
  ${media.lessThan("medium")`
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 2rem;
  `};
  ${media.lessThan("small")`
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 57vh;
  `};
`

const BannerContain = styled.div`
  width: 100%;
  position: relative;
  top: -10px;
`

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1px solid palevioletred;
  color: palevioletred;
  outline: 0px;
  padding: 0.6em 5em;
  margin: 0.5em 0.5em;
  transition: all 400ms;
  font-size: 1.2em;
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

const Title = styled.h1`
  text-align: center;
  font-weight: ${props => (props.bold ? "bold" : "lighter")};
  font-family: ${props => (props.regular ? null : "monospace")};
  color: ${props => (props.colored ? "#591af7" : "#fff")};
  letter-spacing: ${props => (props.project ? null : "0.05em")};
  font-size: ${props => (props.small ? "2.5em" : "4.5rem")};
  ${media.lessThan("large")`
  font-size: ${props => (props.small ? "2.3em" : "3.7rem")};
  `};
  ${media.lessThan("medium")`
  font-size: ${props => (props.small ? "2em" : "3rem")};
  `};
  ${media.lessThan("small")`
  font-size: ${props => (props.small ? "1.7em" : "2.2rem")};
  `};
`

const Text = styled.p`
  color: ${props => (props.white ? "#fff" : null)};
  font-size: ${props => (props.banner ? "1.5rem " : "1.3rem")};
  text-align: ${props => (props.center ? "center" : null)};
  line-height: 1.8rem;
  word-spacing: 0.1rem;
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
  paddingLeft: "10px",
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

const ArticleCard = styled.div``

const CustomImage = styled.img`
  margin: 0;
  width: 100vw;
  position: absolute;
  bottom: -5px;
  ${media.lessThan("huge")`
  bottom: -20px;
  `};
  ${media.lessThan("large")`
  bottom: -10px;
  `};
  ${media.lessThan("medium")`
  bottom: -5px;
  `};
  ${media.lessThan("small")`
  bottom: -55px;
  `};
`

const HeaderBody = styled.header`
  padding: 0.5rem 1.7rem;
  background: rebeccapurple;
  color: #fff;
  h4 {
    padding: 0.5rem 0.7rem;
  }
  ${media.lessThan("large")`
    h4 {
font-size : 1.7rem; 
    }
  `};
  ${media.lessThan("medium")`
    h4 {
font-size : 1.6rem; 
    }
  `};
  ${media.lessThan("small")`
    h4 {
font-size :  1.5rem; 
    }
  `};
`

const Quote = styled.h1`
  font-weight: 530;
  ${media.lessThan("medium")`
font-size: 2rem;
  `};
  ${media.lessThan("small")`
font-size: 2rem;
  `};
`

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 5rem 1rem 1rem;
  background: #090e3a;
  color: #fff;
  ${media.lessThan("medium")`
  padding: 4rem 1rem 0.5rem;
  `};
  ${media.lessThan("small")`
  padding: 3rem 1rem 0.3rem;
  `};
`

const CardBody = styled.div`
  border-radius: 1rem;
  border: 1px solid grey;
  padding: 1rem 1rem;
  width: 32rem;
  transition: all 450ms;
  ${media.lessThan("large")`
  width: auto;
  `};
  ${media.lessThan("medium")`
  width: auto;
  border-radius: 0.7rem;
  margin : 1rem 2rem; 
  `};
  ${media.lessThan("small")`
  width: auto;
  margin : 1rem 1rem;
  `};
`

const ArticleGrid = styled.div`
  display: grid;
  grid-gap: 3rem 1rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  ${media.lessThan("huge")`
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  `};
  ${media.lessThan("large")`
  grid-template-columns: repeat(auto-fit, minmax(23rem, 2fr));
  `};
  ${media.lessThan("medium")`
   display: flex;
   flex-direction: column;
    align-items: center;
  `};
  ${media.lessThan("small")`
   display: flex;
   flex-direction: column;
    align-items: center;
  `};
`

export {
  Quote,
  QuoteContainer,
  ArticleGrid,
  CardBody,
  HeaderBody,
  ArticleCard,
  Bounce,
  Contain,
  StyledCard,
  CustomImage,
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
