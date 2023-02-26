"use client";
import React from "react";
import styled from "styled-components";
import { Flex, Text } from "@/styles";
import CustomButton from "@/components/Buttons";
import Image from "next/image";
import { ImageLoader } from "@/utils/Cloudinary";
import HeroStats from "@/components/heros/HeroStats";
import ArrowDown from "@/assets/svg/arrow-down.svg";

const Hero = styled.section`
  background: #fff8f0;

  .hero-stats-section {
    height: 218px;
    position: relative;
  }

  .hero-details-section {
    height: 724px;
    display: flex;
    place-items: center;
  }

  .hero-stats-bottom {
    background: #131112;
    height: 118px;
    width: 100%;
    position: absolute;
    bottom: -35px;
  }

  span {
    text-decoration: underline;
    text-decoration-color: #d0db97;
    text-decoration-thickness: 20px;
  }

  .container {
    max-width: 1224px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 60% 40%;
  }

  .details {
    position: relative;

    img {
      object-fit: contain;
      top: 0;
      position: absolute;
      color: red;
      z-index: 2;
    }
  }
`;

const ArrowContainer = styled.div`
  margin: 5rem 0;
`;

const Heading = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 128px;
  line-height: 130px;

  color: ${props => props.color || "#115e65"};
  text-align: ${(props: any) => props.align};
`;
const HomeHero = () => (
  <>
    <Hero>
      <div className={"hero-details-section"}>
        <div className={"container"}>
          <div>
            <div className={"details"}>
              <Heading>
                Hello, <br /> I'm <span>Nwani</span> <br /> Victory
              </Heading>

              <Text
                style={{ zIndex: 9999999 }}
                mt={"30px"}
                mb={"60px"}
                color={"#131112"}
              >
                I work as a Frontend Engineer and also an advocate for Cloud
                Engineering through written articles on Cloud Services as a
                Technical Author.
              </Text>

              <Image
                fill
                loader={ImageLoader}
                alt={"floating stars"}
                src={"/personal-portfolio-app/float-stars.png"}
              />
            </div>

            <div>
              <CustomButton clickAction={() => {
              }} text={"Got A Project?"} />

              <CustomButton
                clickAction={() => {
                }}
                text={"Let's Talk."}
                color={"#131112"}
                background={"#fff"}
              />
            </div>
          </div>

          <div>
            <p> MICRO FINANCE </p>
          </div>
        </div>
      </div>

      <div className={"hero-stats-section"}>
        <div className={"hero-stats-bottom"} />

        <HeroStats />
      </div>
    </Hero>

    <Flex justify={"center"}>
      <ArrowContainer>
        <ArrowDown />
      </ArrowContainer>
    </Flex>
  </>
);

export default HomeHero;
