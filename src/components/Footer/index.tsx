"use client";

import { Flex, H2Heading, Text } from "@/styles";
import styled from "styled-components";
import React from "react";
import Layout from "@/styles/Layout";
import { navigation_links } from "@/data/static";

const FooterLayout = styled.footer`
  position: relative;
  width: 100%;

  .container {
    position: absolute;
    background: red;
    width: inherit;
    top: -50px;
  }

  //.card {
  //  height: 300px;
  //  background: #fff;
  //  border-radius: 30px;
  //  position: absolute;
  //  width: 100%;
  //}
`;

const ListContainer = styled.ul`
  list-style: square;
  display: flex;
  justify-content: space-between;
  color: #fff;
  margin: 0 15px;
`;

const Footer = () => (
  <FooterLayout>
    <Layout bg={"#115F66"}>
      {/*<div className={"container"}>*/}
      {/*  <Flex placeItems={"center"} justify={"center"}>*/}
      {/*    <H2Heading> FOOTER COMPONENT HERE </H2Heading>*/}
      {/*  </Flex>*/}
      {/*</div>*/}

      <Text align={"center"} color={"#fff"}> Crafted From Scratch With <b> Love And Optimism </b> By Victory Nwani
      </Text>
      <br />
      <hr />
      <br />

      <ListContainer>
        {navigation_links.map(({ name }, idx) => (
          <li key={idx}>
            <a href={"/"}>
              <Text align={"center"} color={"#fff"}> {name} </Text>
            </a>
          </li>
        ))}
      </ListContainer>

    </Layout>
  </FooterLayout>
);

export default Footer;
