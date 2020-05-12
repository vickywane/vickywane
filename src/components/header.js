import { Link } from "gatsby"
import React from "react"
import Flex from "styled-flex-component"
import { FiMenu } from "react-icons/fi"

import { HeaderBody, Text } from "../styles/styles"

const Header = props => {
  const { title, link } = props
  return (
    <HeaderBody>
      <Flex justifyBetween>
        <Flex>
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <img
              alt="avatar"
              src={require("../assets/images/my_avatar.png")}
              style={{ height: "auto", width: "3rem", borderRadius: "50%" }}
            />
          </Link>

          <Link
            to={`/${link}`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <h4>| {title}</h4>
          </Link>
        </Flex>

        <FiMenu style={{ fontSize: "2rem" }} />
      </Flex>
    </HeaderBody>
  )
}

export default Header
