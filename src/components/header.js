import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { Title, center } from "../styles/index"

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
  height: 50px;
  width: 50px;
  border-radius: 50%;
  &: hover {
    cursor: pointer;
  }
`

const Header = ({ siteTitle }) => (
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

      <div style={{ ...center }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Title small> Menu </Title>
        </Link>
      </div>
    </span>
  </HeaderBody>
)

export default Header
