import React, { useState } from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { FiMenu, FiX } from "react-icons/fi"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import ScrollLock, { TouchScrollable } from 'react-scrolllock'


import Data from "../data/data.json"
import { IconHover, Text, HoverLink } from "../styles/"

const StyledMenu = styled.nav`
  display: flex;
  color: white;
  flex-direction: column;
  background: #282c34;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(200%)")};
  height: calc(100vh - 60px);
  position: absolute;
  width: 80%;
  right: 0;
  bottom: 0;
  padding: 1rem;
  transition: all 350ms;
`

const MenuIconContainer = styled.div`
  display: none;
  ${media.lessThan("small")`
      display : flex;
      justify-content : center;
      align-items : center;
  `}
`

const List = styled.ul`
  margin: 0;
  list-style: none;
  li {
    margin: 1rem 0;
  }
`

const Sidebar = () => {
  const [isSidebarOpen, setSidebar] = useState(true)
  const { pathname } = useLocation()

  return (
    <div>
      <MenuIconContainer>
        {!isSidebarOpen ? (
          <IconHover onClick={() => setSidebar(!isSidebarOpen)}>
            <FiMenu style={{ fontSize: "1.8rem" }} />
          </IconHover>
        ) : (
          <IconHover onClick={() => setSidebar(!isSidebarOpen)}>
            <FiX style={{ fontSize: "1.8rem" }} />
          </IconHover>
        )}
      </MenuIconContainer>

      <StyledMenu open={isSidebarOpen}>
        <List>
          {Data.navigation.map(({ id, name, route }) => (
            <li key={id}>
              <HoverLink color={pathname === route ? "orange" : "white"}>
                <Link to={route}>
                  <Text small> {name} </Text>
                </Link>
              </HoverLink>
              <hr style={{ margin: ".9rem 0", background: "white" }} />
            </li>
          ))}
        </List>
      </StyledMenu>
    </div>
  )
}

export default Sidebar
