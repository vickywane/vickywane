"use client"
import React from "react"
import styled, { keyframes } from "styled-components"
import { useSelector } from "react-redux"
import { RootState } from "@/state"
import { Notification } from "@/data/schema"
import RichTextComponent from "@/utils/RichTextComponent"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import { Flex } from "@/styles"

const NotificationComponent = styled.div<{ isBreadcrumbOpen: boolean }>`
  min-height: 50px;
  width: 100%;
  background: #d0db97;
  border-top: ${props => (props.isBreadcrumbOpen ? "3px solid #000" : 0)};
  padding: 10px 0;

  display: flex;
  place-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 5px 8px;
  }
`

const AlertAnimation = keyframes`
  0% {
    transform: scale(.5);
  } 
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.5);
  }
`

const Alert = styled.div`
  height: 35px;
  width: 35px;
  background: #115e65;
  border: 1px solid #115e65;
  border-radius: 50%;

  animation: ${AlertAnimation} 1400ms;
  animation-iteration-count: infinite;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 25px;
    width: 25px;
  }
`

interface HomeHeroNotificationProps {
  notification: Notification
}

const HomeHeroNotification = ({ notification }: HomeHeroNotificationProps) => {
  const { breadcrumb_visibility } = useSelector((state: RootState) => state.app)

  if (!notification?.notification_text) return null

  return (
    <NotificationComponent isBreadcrumbOpen={breadcrumb_visibility === "OPEN"}>
      <Flex className="gap-1" >
        <Flex placeItems="center">
          <Alert />
        </Flex>

        <Flex placeItems="center">
          <RichTextComponent richText={notification?.notification_text} />
        </Flex>
      </Flex>
    </NotificationComponent>
  )
}

export default HomeHeroNotification
