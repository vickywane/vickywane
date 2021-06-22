import React from "react"
import Img from "gatsby-image"

const Image = ({ fixed, alt }) => (
  <Img style={{borderRadius: "50%"}}  objectFit="contain" fixed={fixed} alt={alt} />
)

export default Image
