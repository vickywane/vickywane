"use client"
import React from "react"
import styled from "styled-components"
import { Text } from "@/styles/"

const Notification = styled.div`
  height: 40px;
  width: 100%;
  background: #d0db97;
  
  display: flex;
  place-items: center;
  justify-content: center;
`

const HomeHeroNotification = () => (
  <Notification>
    {/*TODO: Fix and remove ts-ignore*/}
    {/*@ts-ignore*/}
    <Text align={"center"} > Notification bar... </Text>
  </Notification>
)

export default HomeHeroNotification
