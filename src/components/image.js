import React from "react"
import Img from "gatsby-image"
import styled from 'styled-components'
import media from 'styled-media-query'

const ImageContainer = styled(Img)`
  border-radius: 50%;
  object-fit: contain;
`

const Image = ({ fixed, alt }) => (
  <ImageContainer
    objectFit="contain"
    fixed={fixed}
    alt={alt}
  />
)

export default Image
