"use client"
import React from "react"
import { WorkExperience } from "@/data/schema"

import Layout from "@/styles/Layout"
import Reviews from "../Reviews/Reviews"
import SectionIndicator from "../SectionIndicator"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useNavigationStore } from "@/state/zustand/navigation"
import { Typography } from "../../../__tests__/ui/Typography.test"

interface JobSummaryProp {
  experiences: Array<WorkExperience>
}

const JobSummary = ({ experiences }: JobSummaryProp) => {
  const { setNavigationLinkItem } = useNavigationStore()

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    id: "work",
    callback: key => setNavigationLinkItem(key),
  })

  return (
    <Layout bg="#fcfcfc">
      <Typography as="h2" styleAs="heading_2" ref={ref}>
        Life As A <span> Software Engineer </span>{" "}
      </Typography>
      <Typography as="p" styleAs="body">
        Daily at work, I get to work mainly with various technologies within the
        vast JavaScript ecosystem. From creating or updating existing React
        components in a Next.js application to debugging a failing E2E test
        suite within a GitHub CI/CD pipeline.
      </Typography>

      <SectionIndicator text="Reviews From Colleagues" id="work-reviews" />

      <Reviews type="work_review" />
    </Layout>
  )
}

export default JobSummary
