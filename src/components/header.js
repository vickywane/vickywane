import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { FiMenu } from "react-icons/fi"

import { Text, center, IconHover } from "../styles/"

const HeaderBody = styled.header`
  height: 60px;
  background: rebeccapurple;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 960;
  span {
    padding: 0 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const Image = styled.img`
  margin-top : 5px;
  height: 50px;
  width: 50px;
  object-fit : contain;
  border-radius: 50%;
  &: hover {
    cursor: pointer;
  }
`

const List = styled.ul`
  list-style: none;
  display: flex;
  padding-top: 15px;
  flex-direction: row;
  li {
    margin: 0 1rem;
  }
  ${media.lessThan("medium")`

  `};
  ${media.lessThan("small")`
      display : none; 
  `};
`

const MenuIconContainer = styled.div`
  display: none;
  ${media.lessThan("small")`
      display : flex;
      justify-content : center;
      align-items : center;
  `}
`

const Header = ({ siteText }) => (
  <HeaderBody>
    <span>
      <Link to="/">
        <div style={{ ...center }}>
          <Image
            alt={"me"}
            style={{}}
            src={require("../images/my_avatar.png")}
          />
        </div>
      </Link>

      <List>
        <li>
          <Link
            to="/blog"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <Text small> Articles </Text>
          </Link>
        </li>

        <li>
          <Link
            to="/talks"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <Text small> Talks </Text>
          </Link>
        </li>

        <li>
          <Link
            to="/projects"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <Text small> Work </Text>
          </Link>
        </li>
      </List>

      <MenuIconContainer>
        <IconHover onClick={() => {}}>
          <FiMenu style={{ fontSize: "1.8rem" }} />
        </IconHover>
      </MenuIconContainer>
    </span>
  </HeaderBody>
)

export default Header
