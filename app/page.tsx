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
import { HOME_QUERY, VACATION_PREVIEW_QUERY } from "@/data/gqols"
import {
  Article,
  Engagement,
  Homepage,
  Notification,
  WorkExperience,
} from "@/data/schema"
import NextHeader from "@/components/headers/nextHead"
import Script from "next/script"
import Layout from "../src/pages/layout"

interface HomeProps {
  pageData: Homepage
  vacationPreviews: any
}

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER

const getData = async () => {
  const pageData = await SanityClient().fetch(HOME_QUERY)

  const vacationPreviews = await SanityClient().fetch(VACATION_PREVIEW_QUERY)

  return {
    // props: {
    pageData,
    vacationPreviews,
    // },
  }
}

{
  /* <NextHeader name={"Nwani Victory | Overview"} /> */
}

export default async function Home() {
  const { pageData, vacationPreviews } = await getData()

  return (
    <div>
      <button onClick={() => console.log("Hello World")}>CLICK ME</button>

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

       <ProjectsSummary />

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

{
  /* <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`} /> */
}

{
  /* <Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', ${gtmId});
  `}
</Script> */
}

// export async function getStaticProps() {

// }
