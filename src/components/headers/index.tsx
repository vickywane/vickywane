"use client"
import React from "react"
import Image from "next/image"
import CustomButton from "@/components/Buttons"
import styled from "styled-components"
import { ImageLoader } from "@/utils/Cloudinary";
import { Flex } from "@/styles";

const Head = styled.header`
  height: 92px;
  width: 100%;
  background: #fff; 
  color: #115e65;
  z-index : 9999999;
  display: flex;
  place-items: center;
  border-bottom: 0.5px solid #000;
  position: sticky;
  top: 0;
  
  nav {
    display: flex;
    width: 100%;
    max-width: 1224px;
    margin: 0 auto;
    justify-content: space-between;
    place-items: center;
  }

  .title {
    font-family: "Space Grotesk", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 22.8131px;
    line-height: 29px;
    margin-left: 10px;

    :hover {
      color: #333333;
    }
  }
`

const HeaderList = styled.ul`
  list-style: none;
  display: flex;
  place-items: center;

  li {
    margin: 0 25px;
  }
`

const Anchor = styled.a`
  color: #333333;
  font-family: "Space Grotesk", sans-serif;

  :hover {
    color: #115e65;

    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
`

const ImageContainer = styled.div`
  height: 51px;
  width: 53px;
  position: relative;

  img {
    border-radius: 50%;
  }
`

const Index = () => (
  <Head>
    <nav>
      <a href={"/"}>
        <Flex placeCenter={"center"}>
          <ImageContainer>
            <Image
              loader={ImageLoader}
              fill
              alt={"Victory Nwani"}
              src={"/personal-portfolio-app/my_picture.jpg"}
            />
          </ImageContainer>

          <Flex placeItems={"center"} >
            <p className={"title"}> Victory Nwani </p>
          </Flex>
        </Flex>
      </a>

      <div>
        <HeaderList>
          <li>
            <Anchor href={"#"}>About</Anchor>
          </li>
          <li>
            <Anchor href={"#"}>Experience</Anchor>
          </li>
          <li>
            <Anchor href={"#"}>Projects</Anchor>
          </li>
          <li>
            <Anchor href={"#"}>Writing</Anchor>
          </li>

          <li>
              <CustomButton clickAction={() => {}} text={"View Resume"} />
          </li>
        </HeaderList>
      </div>
    </nav>
  </Head>
)

export default Index
