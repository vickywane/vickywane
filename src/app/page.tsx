"use client";
import { Inter } from "@next/font/google";
import Header from "@/components/headers";
import HomeHeroNotification from "@/notifications/HomeHeroNotification";
import React from "react";
import HomeHero from "@/components/heros/HomeHero";
import PersonalBio from "@/components/bio/PersonalBio";
import styled from "styled-components";
import HomeMasonry from "@/components/Gallery/HomeMasonry";
import FeaturedTravelInsight from "@/components/Insights/FeaturedTravelInsight";
import JobSummary from "@/components/Summaries/JobSummary";
import TechnicalArticleSummary from "@/components/Summaries/TechnicalArticleSummary";
import ProjectsSummary from "@/components/Summaries/ProjectsSummary";
import TalkSummary from "@/components/Summaries/TalkSummary";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const Wrapper = styled.div`
  max-width: 1224px;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <main style={{ position: "absolute", height: "100%", width: "100%" }}>
      <Header />
      <HomeHeroNotification />
      <HomeHero />

      <Wrapper>
        <PersonalBio />
      </Wrapper>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <HomeMasonry />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FeaturedTravelInsight />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <JobSummary />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <ProjectsSummary />
      <TechnicalArticleSummary />
      <TalkSummary />
      <Footer />
    </main>
  );
}
