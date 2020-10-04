import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { Text, Title, center } from "../styles/index"

const HeaderBody = styled.header`
  height: 60px;
  background: rebeccapurple;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 960;
  span {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderBody>
    <span>
      <div style={{ ...center }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Title small> Home </Title>
        </Link>
      </div>

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
