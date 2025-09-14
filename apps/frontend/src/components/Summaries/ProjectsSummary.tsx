"use client"
import React from "react"
import Layout from "@/styles/Layout"
import PostHog from "posthog-js"
import Project from "../projects/Project"
import { Projects } from "@/data/schema"
import { Typography } from "../ui/Typography"

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
    <Layout classNames="grid gap-8" bg={"#fff8f0"}>
      <div className="grid gap-2">
        <Typography as="h2" styleAs="heading_2" className="[&:span]">
          Life As An <span> Indie Hacker </span>
        </Typography>
        <Typography as="p" styleAs="body">
          Here are some of the public projects I have worked on and the
          technologies I used to build them.
        </Typography>
      </div>

      <div className="grid gap-28">
        {projects.map((project, idx) => (
          <div key={idx}>
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
