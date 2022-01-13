import { Text } from './'
import media from "styled-media-query"
import styled from "styled-components"

export const UserCard = styled.div`
  background-color: #282c34;
  height: 85%;
  overflow: auto;
  transition: all 300ms;
  width: 70%;
  color: #fff;
  padding: 0.5rem 1rem 2rem 1rem;
  border-radius: 7px;
  max-width: 1300px;
  margin: 0 auto;
  box-shadow: 24px 31px 21px -8px rgba(0, 0, 0, 0.9);
  ${media.lessThan("huge")`
    height: 95%;
    width: 95%;
  `};
  ${media.lessThan("large")`
    height: 90%;
    width: 90%;
  `};
  ${media.lessThan("small")`
    padding: 0.5rem .5rem;
    height: 97%;
    width: 97%;
  `};
`

export const Cards = styled.div`
  display: grid;
  grid-gap: 1rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  place-items: center;
  ${media.lessThan("large")`
    grid-gap: 1rem 1rem;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  `};
  ${media.lessThan("medium")`
      display : flex;
      flex-direction : column;
      align-items : center;
  `};
`

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  width: 20rem;
  border-radius: 4px;
  transition: all 350ms;
  background: #141821;
  border: 1px solid #141821;
  span {
    h3 {
      margin-top: 5px;
    }
  }
  &: hover {
    cursor: pointer;
    transform: translateY(-5%);
    box-shadow: 0 1px 2px black;
  }
  ${media.lessThan("large")`
    width: 16rem; 
    padding: 0.5rem 0.5rem;
  `};
  ${media.lessThan("medium")`
  width: 25rem; 
  padding: 0.5rem 0.5rem;
  span {
    display : flex;
    flex-direction   : row;
    h3 {
      margin-top: 3px;
    }
    p {
      display : none;
    }
  }
`};
  ${media.lessThan("small")`
    width: 100%; 
    height : 6.5vh;
    padding: 0.5rem 0.5rem;
    margin : .2rem 0;
    span {
    display : flex;
    flex-direction   : row;
    h3 {
        margin-top: 3px;
    }
    p {
        display : none;
    }
}
`};
`

export const WaveContainer = styled.div`
  margin: 0.5rem 0;
  span {
    font-size: 3rem;
  }
  ${media.lessThan("huge")`
  margin : 0;
  span {
     display : none;
  }
  `};
`

export const StyledText = styled(Text)`
  padding: 0 5rem;
  ${media.lessThan("huge")`
  padding: 0 3rem;
`};
  ${media.lessThan("large")`
    padding: 0 5rem;
  `};
  ${media.lessThan("medium")`
  padding: 0 2rem;
`};
  ${media.lessThan("small")`
    padding: 0 .5rem;
    `};
`

export const ResponsiveEmoji = styled.div`
  span {
    font-size: 2rem;
    ${media.lessThan("large")`
    font-size: 1.8rem; 
    `};
    ${media.lessThan("medium")`
    font-size: 1.6rem;
    `};
    ${media.lessThan("small")`
    font-size: 1.3rem;
    `};
  }
`

export const SectionText = styled.div`
  p {
    margin: 0 0.5rem;
  }

  ${media.lessThan("small")`
        p {
            padding-left : 0;
        }
    `}
`
