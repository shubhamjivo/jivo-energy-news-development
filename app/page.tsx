import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { AfricaTimes } from "@/components/home/AfricaTimes";
import { EnergyBrief } from "@/components/home/EnergyBrief";
import { Insights } from "@/components/home/Insights";
import { InvestmentWatch } from "@/components/home/InvestmentWatch";
import { LatestReports } from "@/components/home/LatestReports";
import { LeadGrid } from "@/components/home/LeadGrid";
import { NewsAnalysis } from "@/components/home/NewsAnalysis";
import { ProjectWatch } from "@/components/home/ProjectWatch";
import { Reels } from "@/components/home/Reels";
import { WatchListen } from "@/components/home/WatchListen";
import { WhatMatters } from "@/components/home/WhatMatters";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getLatestArticleCards } from "@/lib/articles";
import {
  getBriefItems,
  getDeals,
  getHomePage,
  getInsights,
  getProjects,
  getSiteSettings,
  getVideos,
} from "@/lib/cms";
import type { HomeSection } from "@/lib/home-sections";
import { SITE_TAGLINE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: { absolute: `${settings.siteName} — ${settings.tagline || SITE_TAGLINE}` },
    description: settings.description,
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  const [home, latest, brief, projects, insights, reports, deals, reels, videos] =
    await Promise.all([
      getHomePage(),
      getLatestArticleCards(12),
      getBriefItems(),
      getProjects(8),
      getInsights({ limit: 24 }),
      getInsights({ types: ["Report"], limit: 4 }),
      getDeals(4),
      getVideos("Reel"),
      getVideos("Video", 3),
    ]);

  // Sections the editor left empty on the Home Page fall back to the newest
  // stories.
  const pick = (chosen: typeof latest, from: number) =>
    chosen.length > 0 ? chosen : latest.slice(from, from + 4);

  const featuredInsight =
    home.featuredInsight ?? insights.find((item) => item.type !== "Report") ?? null;
  const otherInsights = insights.filter(
    (item) => item.type !== "Report" && item.id !== featuredInsight?.id,
  );
  const insightCards = otherInsights.filter((item) => item.image).slice(0, 3);
  const insightSidebar = otherInsights
    .filter((item) => !insightCards.includes(item))
    .slice(0, 4);

  const render = (section: HomeSection): ReactNode => {
    switch (section.section) {
      case "Lead story":
        return <LeadGrid />;
      case "What Matters Today":
        return (
          <WhatMatters
            heading={section}
            items={home.whatMatters.length > 0 ? home.whatMatters : latest.slice(0, 8)}
          />
        );
      case "Africa Times":
        return (
          <AfricaTimes
            heading={section}
            desks={[
              { title: "Trending", stories: pick(home.trending, 0) },
              { title: "Missed It", stories: pick(home.missedIt, 4) },
              { title: "Most Read", stories: pick(home.mostRead, 8) },
              { title: "The Brief", stories: home.theBrief },
            ]}
          />
        );
      case "Energy Brief":
        return <EnergyBrief heading={section} items={brief} />;
      case "News":
        return <NewsAnalysis heading={section} items={latest.slice(0, 8)} />;
      case "Reels":
        return <Reels heading={section} reels={reels} />;
      case "Project Watch":
        return <ProjectWatch heading={section} projects={projects} />;
      case "Insights":
        return (
          <Insights
            heading={section}
            featured={featuredInsight}
            cards={insightCards}
            sidebar={insightSidebar}
          />
        );
      case "Investment Watch":
        return <InvestmentWatch heading={section} deals={deals} />;
      case "Watch & Listen":
        return <WatchListen heading={section} videos={videos} />;
      case "Latest Reports":
        return <LatestReports heading={section} reports={reports} />;
      case "Newsletter":
        return <NewsletterCta />;
    }
  };

  // Order, headings and visibility come from the Home Page entry in the CMS.
  return (
    <main>
      {home.sections.map((section) => (
        <Fragment key={section.section}>{render(section)}</Fragment>
      ))}
    </main>
  );
}
