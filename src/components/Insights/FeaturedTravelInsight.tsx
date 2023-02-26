"use client";
import styled from "styled-components";
import { Flex, Text } from "@/styles";
import { ImageLoader } from "@/utils/Cloudinary";
import Image from "next/image";
import React from "react";

const Container = styled.div`
  background: #fff8f0;
  padding: 5rem 0;

  span {

  }

  .image-ctn {
    width: 492px;
    margin-right: 50px;
    min-width: 492px;
    height: 492px;
    position: relative;

    img {
      border-radius: 20px;
    }
  }

  .container {
    max-width: 1224px;
    margin: 0 auto;
    position: relative;

    display: grid;
    grid-template-columns: 80% 10%;
  }

  .cta-container {
    position: absolute;
    writing-mode: vertical-rl;
    right: 0;
  }

  .contents {
    display: flex;
  }
`;

const FeaturedTravelInsight = () => (
  <Container>
    <div className={"container"}>
      <div className={"contents"}>
        <div className={"image-ctn"}>
          <Image
            loader={ImageLoader}
            fill
            alt={"Victory Nwani"}
            src={"/personal-portfolio-app/my_picture.jpg"}
          />
        </div>

        <Flex placeItems={"center"}>
          <div>
            <Text fontSize={"30px"}> Some Travel Title Here </Text>

            <br />

            <Text>
              I work as a Frontend Engineer and also an advocate for Cloud
              Engineering through written articles on Cloud Services as a
              Technical Author.
              <br />
              <br />I work as a Frontend Engineer and also an advocate for Cloud
              Engineering through written articles on Cloud Services as a
              Technical Author.
            </Text>
          </div>

        </Flex>
      </div>

      <div className={"cta-container"}>
        <Flex justify={"center"} placeItems={"center"}>
          <Text color={"#333333"} fontSize={"40px"}>
            What do you think of <br /> <span> Travelling? </span>
          </Text>
        </Flex>
      </div>
    </div>
  </Container>
);

export default FeaturedTravelInsight;
