import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import styled from "styled-components"
import { withStyles  } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Link from "gatsby"
import withRoot from './func/withRoot'

import Image from "../image"

import { media } from '../../media_style';

//css file
import headerStyle from "./headerStyle"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.headerColorChange = this.headerColorChange.bind(this)
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange)
    }
  }

  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color])
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color])
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color])
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color])
    }
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange)
    }
  }
  render() {
    const { classes, color, fixed, absolute } = this.props
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed,
    })

    const Button = styled.button`
      background: transparent;
      border-radius: 7px;
      border: 1.5px solid palevioletred;
      color: palevioletred;
      margin: 0 1em;
      padding: 0.25em 1em;
      font-size: 17px;
    `

    const Div = styled.div`
      margin-top: 10px;
    `
    const A = styled.a`
      ${media.tablet`
			font-size: 1.3em
		`}
      ${media.phone`
			font-size: 1em
		`}
			color: white;
      text-decoration: none;
      font-size: 20px;
    `

    return (
      <AppBar className={appBarClasses}>
        <Div>
          <nav>
            <ul>
              <div>
                <li>
                
                  <Link prefetch href="/">
                    <A>EvoHub</A>
                  </Link>
                </li>
              </div>

              <div>
                <Link prefetch href="/">
                  <A>FAQ</A>
                </Link>

                <Button href="#">Login</Button>
              </div>
            </ul>

            <style jsx>{`
              :global(body) {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                  Avenir, Helvetica, sans-serif;
              }
              nav {
                text-align: center;
              }
              ul {
                display: flex;
                justify-content: space-between;
              }
              nav > ul {
                padding: 4px 16px;
              }
              li {
                display: flex;
                padding: 10px 12px;
              }
            `}</style>
          </nav>
        </Div>
      </AppBar>
    )
  }
}

Header.defaultProp = {
  color: "white",
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
}

export default  withStyles(headerStyle)(Header) 
