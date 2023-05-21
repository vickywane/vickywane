"use client"
import { H2Heading, Text } from "@/styles"
import React from "react"
import Layout from "@/styles/Layout"
import PostHog from "posthog-js"

const ProjectSummary = () => {
  if (
    PostHog.__loaded &&
    !PostHog.isFeatureEnabled("home-engineering-projects", {
      send_event: true,
    })
  ) {
    return null
  }

  return (
    <Layout bg={"#fff8f0"}>
      <H2Heading>
        My <span> Engineering Projects </span>{" "}
      </H2Heading>
      <Text>
        As an educational establishment located in Nigeria, Africa. Patfin High
        School.
      </Text>
    </Layout>
  )
}

export default ProjectSummary
