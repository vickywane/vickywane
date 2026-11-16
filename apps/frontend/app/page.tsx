import React from "react"
import { PiBugDroid } from "react-icons/pi"

import Header from "@/components/headers"
import HomeHeroNotification from "@/notifications/HomeHeroNotification"
import HomeHero from "@/components/heros/home"
import PersonalBio from "@/components/bio/PersonalBio"
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
  Projects,
} from "@/data/schema"
import ChatBot from "@/components/ChatBot/"

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
  const notification = (pageData.notifications?.[0] ?? null) as Notification | null

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Header />
      {/* <ChatBot /> */}

      <HomeHeroNotification notification={notification} />

      <HomeHero
        banner_description={pageData.banner_description}
        hero_pitch={pageData.hero_pitch}
        banner_image={pageData.banner_image}
        banner_image_alt={pageData.banner_image_alt}
        projects={(pageData.projects as unknown) as Projects[]}
        articles={(pageData.articles as unknown) as Article[]}
        engagements={(pageData.engagements as unknown) as Engagement[]}
        compactTop={Boolean(notification?.notification_text?.length)}
      />

      <JobSummary
        experiences={(pageData.experiences as unknown) as WorkExperience[]}
      />

      {/* <PersonalBio human_text={pageData.human_description} /> */}

      {/* <FeaturedTravelInsight previews={vacationPreviews} /> */}

      {/* <JobSummary
        experiences={(pageData.experiences as unknown) as WorkExperience[]}
      /> */}

      <ProjectsSummary
        projects={(pageData.projects as unknown) as Projects[]}
      />

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
