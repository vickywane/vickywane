"use client";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import { Notification } from "@/data/schema";
import RichTextComponent from "@/utils/RichTextComponent";
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery";

const NotificationComponent = styled.div<{ isBreadcrumbOpen: boolean }>`
  height: 45px;
  width: 100%;
  background: #d0db97;
  border-top: ${props => props.isBreadcrumbOpen ? "3px solid #000" : 0};

  display: flex;
  place-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 0 20px;
  }
`;

interface HomeHeroNotificationProps {
  notification: Notification;
}

const HomeHeroNotification = ({ notification }: HomeHeroNotificationProps) => {
  const { breadcrumb_visibility } = useSelector((state: RootState) => state.app);

  if (!notification?.notification_text) return null;

  return (
    <NotificationComponent isBreadcrumbOpen={breadcrumb_visibility === "OPEN"}>
      <RichTextComponent richText={notification?.notification_text} />
    </NotificationComponent>
  );
};

export default HomeHeroNotification;
