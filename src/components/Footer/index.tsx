"use client";

import { Flex, H2Heading } from "@/styles";
import styled from "styled-components";
import React from "react";

const FooterLayout = styled.footer`
  background: #115F66;
  padding: 100px 0;

  .container {
    max-width: 1224px;
    margin: 0 auto;

    height: 407px;
    background: #fff;
    border-radius: 30px;
  }
`;

const Footer = () => (
  <FooterLayout>
    <div className={"container"}>
      <Flex placeItems={"center"} justify={"center"}>
        <H2Heading> FOOTER COMPONENT HERE </H2Heading>
      </Flex>
    </div>
  </FooterLayout>
);

export default Footer;
