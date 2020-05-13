import { Link } from "gatsby"
import React from "react"
import Flex from "styled-flex-component"
import { FiMenu } from "react-icons/fi"
import styled from "styled-components"

import { HeaderBody, Text } from "../styles/styles"

const Notification = styled.div`
  background: rebeccapurple;
  color: #fff;
  padding: 0.5rem 1rem;
  text-align: center;
`

const Header = props => {
  const { title, link } = props
  return (
    <div>
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

            {link != undefined ? (
              <Link
                to={`/${link}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <h4>
                  {" "}
                  / <i> {title}</i>
                </h4>
              </Link>
            ) : null}
          </Flex>

          <FiMenu style={{ fontSize: "2rem" }} />
        </Flex>
      </HeaderBody>
      <Notification>
        <Text small>
          This space is under active development. Please "{" "}
          <a target="_blank" href="https://github.com/vickywane">
            raise an issue{" "}
          </a>
          " if you spot something wrong.{" "}
        </Text>
      </Notification>
    </div>
  )
}

export default Header
