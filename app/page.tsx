import React from "react"

import Header from "@/components/headers"
import HomeHeroNotification from "@/notifications/HomeHeroNotification"
import HomeHero from "@/components/heros/HomeHero"
import PersonalBio from "@/components/bio/PersonalBio"
// import HomeMasonry from "@/components/Gallery/HomeMasonry";
import FeaturedTravelInsight from "@/components/Insights/FeaturedTravelInsight"
import JobSummary from "@/components/Summaries/JobSummary"
import TechnicalArticleSummary from "@/components/Summaries/TechnicalArticleSummary"
import ProjectsSummary from "@/components/Summaries/ProjectsSummary"
import TalkSummary from "@/components/Summaries/EngagementSummary"
import Footer from "@/components/Footer"
import { SanityClient } from "@/utils/Sanity"
import { HOME_QUERY, VACATION_PREVIEW_QUERY } from "@/data/gqols"
import {
  Article,
  Engagement,
  Notification,
  WorkExperience,
  Projects
} from "@/data/schema"

const getData = async () => {
  const pageData = await SanityClient().fetch(HOME_QUERY)

  const vacationPreviews = await SanityClient().fetch(VACATION_PREVIEW_QUERY)

  return {
    pageData,
    vacationPreviews,
  }
}

export default async function Page() {
  const { pageData, vacationPreviews } = await getData()

  return (
    <div>
      <Header />

      <HomeHeroNotification
        notification={
          (pageData.notifications &&
            (pageData.notifications[0] as unknown)) as Notification
        }
      />

      <HomeHero banner_description={pageData.banner_description || ""} />

      <PersonalBio human_text={pageData.human_description} />

      <FeaturedTravelInsight previews={vacationPreviews} />

      <JobSummary
        experiences={(pageData.experiences as unknown) as WorkExperience[]}
      />

      <ProjectsSummary projects={(pageData.projects as unknown) as Projects[]} />

      <TechnicalArticleSummary
        articles={(pageData.articles as unknown) as Article[]}
      />

      <TalkSummary
        engagements={(pageData.engagements as unknown) as Engagement[]}
      />

      <Footer />
    </div>
  )
}