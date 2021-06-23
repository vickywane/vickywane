import React, { useState } from "react"
import media from "styled-media-query"
import styled from "styled-components"
import { FiChevronUp, FiChevronDown, FiGithub, FiGlobe } from "react-icons/fi"

import Image from "../../components/image"
import { Title, Text } from "../../styles/"

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  max-width: 1500px;
  color: #fff;
`

const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    display: flex;
    margin: 0rem 1rem;
    list-style: none;
    flex-direction: column;
    padding: 0;
    li {
      padding: 0.5rem 0.5rem;
    }
  }
`

const Thumbnail = styled.img`
  border: 2px solid ${props => (props.active ? "orange" : "transparent")};
  border-radius: 3px;
  height: 130px;
  transition: all 300ms;
  width: 400px;
  object-fit: contain;
  &:hover {
    cursor: pointer;
    border: 2px solid orange;
  }
`

const IconContainer = styled.div`
  color: #cbcdd4;
  display: flex;
  justify-content: center;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
`

const GalleryComponent = ({ data, nextSlide, prevSlide, target }) => {
  const [mainImage, setMainImage] = useState(undefined)
  return (
    <Grid>
      <div style={{ width: "40rem" }}>
      {/*  <IconContainer>*/}
      {/*    <FiChevronUp*/}
      {/*      onClick={() => nextSlide()}*/}
      {/*      style={{ fontSize: "3rem" }}*/}
      {/*    />*/}
      {/*  </IconContainer>*/}
      {/*  <br />*/}
      {/*  <div>*/}
      {/*    <Title align="center"> {data.title} </Title>*/}

      {/*    <div style={{ display: "flex", justifyContent: "center" }}>*/}
      {/*      <IconContainer style={{ margin: "0 1rem" }}>*/}
      {/*        <FiGithub style={{ fontSize: "1.3rem" }} />*/}
      {/*      </IconContainer>*/}

      {/*      <IconContainer>*/}
      {/*        <FiGlobe style={{ fontSize: "1.3rem" }} />*/}
      {/*      </IconContainer>*/}
      {/*    </div>*/}

      {/*    <br />*/}
      {/*    <Text align="center"> {data.description} </Text>*/}
      {/*  </div>*/}
      {/*  <br />*/}

      {/*  {target !== 0 && (*/}
      {/*    <IconContainer>*/}
      {/*      <FiChevronDown*/}
      {/*        onClick={() => prevSlide()}*/}
      {/*        style={{ fontSize: "3rem" }}*/}
      {/*      />*/}
      {/*    </IconContainer>*/}
      {/*  )}*/}
      {/*</div>*/}

      {/*<div style={{ display: "flex", placeItems: "center" }}>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      display: "flex",*/}
      {/*      justifyContent: "center",*/}
      {/*      alignContent: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    /!* <Image alt={data.title} fixed={mainImage || data.images_uri[0]}  /> *!/*/}
      {/*    <img*/}
      {/*      alt="My project view"*/}
      {/*      src={mainImage || data.images_uri[0]}*/}
      {/*      style={{*/}
      {/*        height: "80%",*/}
      {/*        width: "80%",*/}
      {/*        objectFit: "contain",*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <Thumbnails>*/}
      {/*    {data.images_uri.map((img, index) => (*/}
      {/*      <ul>*/}
      {/*        <li>*/}
      {/*          <Thumbnail*/}
      {/*            onClick={() => setMainImage(img)}*/}
      {/*            active={index === 1}*/}
      {/*            src={img}*/}
      {/*          />*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*    ))}*/}
      {/*  </Thumbnails>*/}
      </div>
    </Grid>
  )
}

export default GalleryComponent
