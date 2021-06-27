import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { FiMenu } from "react-icons/fi"
import GatsbyImage from "../components/image"
import { useStaticQuery } from "gatsby"

import { useLocation } from "@reach/router"

import { Text, center, IconHover, HoverLink } from "../styles/"

const HeaderBody = styled.header`
  height: 70px;
  background: rebeccapurple;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 0 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  ${media.lessThan("medium")`
    height: 60px;
    span {
      padding: 0 1rem;
    }
  `};
`

const Image = styled.img`
  margin-top: 5px;
  height: 50px;
  width: 50px;
  object-fit: contain;
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

const Links = [
  {
    id: 1,
    route: "/blog",
    name: "Articles",
  },
  {
    id: 2,
    route: "/home/experiences",
    name: "Work Experience",
  },
  {
    id: 3,
    route: "/projects",
    name: "Projects",
  },
  {
    id: 4,
    route: "/talks",
    name: "Talks",
  },
]

const Header = () => {
  const { pathname } = useLocation()
  return (
    <HeaderBody data-testid="header-component">
      <span>
        <Link to="/">
          <div style={{ ...center }}>
            <Image
              alt={"me"}
              src={require("../images/my_avatar.png")}
            />
          </div>
        </Link>

        <List>
          {Links.map(({ id, name, route }) => (
            <li key={id} >
              <HoverLink color={pathname === route ? "orange" : "white"}>
                <Link to={route}>
                  <Text small> {name} </Text>
                </Link>
              </HoverLink>
            </li>
          ))}
        </List>

        <MenuIconContainer>
          <IconHover onClick={() => {}}>
            <FiMenu style={{ fontSize: "1.8rem" }} />
          </IconHover>
        </MenuIconContainer>
      </span>
    </HeaderBody>
  )
}

export default Header
