"use client"
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
import { HOME_QUERY } from "@/data/gqols"
import {
  Article,
  Engagement,
  Homepage,
  Notification,
  WorkExperience,
} from "@/data/schema"
import NextHeader from "@/components/headers/nextHead"
import Script from "next/script"

interface HomeProps {
  pageData: Homepage
}

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER

export default function Home({ pageData: data }: HomeProps) {
  return (
    <main style={{ height: "100vh", overflow: "auto", width: "100%" }}>
      <Header />

      <NextHeader name={"Nwani Victory | Overview"} />

      <HomeHeroNotification
        notification={
          (data?.notifications &&
            (data?.notifications[0] as unknown)) as Notification
        }
      />

      <HomeHero banner_description={data?.banner_description || ""} />

      <PersonalBio human_text={data?.human_description} />

      <FeaturedTravelInsight
        articles={(data?.articles as unknown) as Article[]}
      />

      <JobSummary
        experiences={(data?.experiences as unknown) as WorkExperience[]}
      />

      <ProjectsSummary />

      <TechnicalArticleSummary
        articles={(data?.articles as unknown) as Article[]}
      />

      <TalkSummary
        engagements={(data?.engagements as unknown) as Engagement[]}
      />
      <Footer />

      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`} />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', ${gtmId});
        `}
      </Script>
    </main>
  )
}

export async function getStaticProps() {
  const pageData = await SanityClient().fetch(HOME_QUERY)

  return {
    props: {
      pageData,
    },
  }
}
