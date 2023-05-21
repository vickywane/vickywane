"use client"
import { Space_Grotesk } from "@next/font/google"
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

const font = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "400", "600", "700"],
  style: ["normal"],
})

interface HomeProps {
  pageData: Homepage
}

export default function Home({ pageData: data }: HomeProps) {
  return (
    <main
      className={font.className}
      style={{ height: "100vh", overflow: "auto", width: "100%" }}
    >
      <Header />

      <HomeHeroNotification
        notification={(data?.notifications[0] as unknown) as Notification}
      />

      <HomeHero banner_description={data?.banner_description} />

      <PersonalBio human_text={data?.human_description} />

      {/* <HomeMasonry galleryItems={data?.gallery as unknown as Gallery} /> */}

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
    </main>
  )
}

// export const getStaticProps = wrapper.getStaticProps(store => async ({ preview }) => {
//   const data = await SanityClient().fetch(HOME_QUERY);
//   return {
//     props: {
//       pageData: data
//     }
//   };
// });

export async function getStaticProps() {
  const pageData = await SanityClient().fetch(HOME_QUERY)

  return {
    props: {
      pageData,
    },
  }
}
