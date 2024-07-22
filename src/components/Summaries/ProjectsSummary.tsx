"use client"
import { H2Heading, Text } from "@/styles"
import React from "react"
import Layout from "@/styles/Layout"
import PostHog from "posthog-js"
import Project from "../projects/Project"
import { Projects } from "@/data/schema"

const ProjectSummary = ({ projects }: { projects: Projects[] }) => {
  if (
    PostHog.__loaded &&
    !PostHog.isFeatureEnabled("home-engineering-projects", {
      send_event: true,
    }) &&
    process.env.NODE_ENV === "production"
  ) {
    return null
  }

  return (
    <Layout bg={"#fff8f0"}>
      <div>
        <H2Heading>
          My <span> Engineering Projects </span>{" "}
        </H2Heading>
        <Text>
          XXXXXXX XXXXXXX XXXXXXX XXXXXXX XXXXXXX XXXXXXX XXXXXXX XXXXXXX
        </Text>
      </div>

      <div>
        <br />
        <br />
        <br />
      </div>

      <div>
        {projects.map((project, idx) => (
          <div style={{ marginBottom: "128px" }} key={idx}>
            <Project
              order={idx}
              name={project.name}
              description={project.description}
              project_tools={project.project_tools}
              github_url={project.github_url}
              cover={project?.cover}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ProjectSummary
