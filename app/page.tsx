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
  getInsights,
  getProjects,
  getSiteSettings,
  getVideos,
} from "@/lib/cms";
import {
  DEFAULT_DESKS,
  DEFAULT_HEADINGS,
  HOME_SECTIONS,
  type HomeSectionSlug,
} from "@/lib/home-sections";
import {
  getPage,
  sectionArticles,
  sectionDesks,
  sectionInsights,
} from "@/lib/pages";
import { SITE_TAGLINE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, home] = await Promise.all([getSiteSettings(), getPage("home")]);
  return {
    title: {
      absolute:
        home?.seo?.metaTitle?.trim() ||
        `${settings.siteName} — ${settings.tagline || SITE_TAGLINE}`,
    },
    description: home?.seo?.metaDescription?.trim() || settings.description,
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  // All CMS requests run here on the server; components only receive data.
  const [home, latest, brief, projects, insights, reports, deals, reels, videos] =
    await Promise.all([
      getPage("home"),
      getLatestArticleCards(12),
      getBriefItems(),
      getProjects(8),
      getInsights({ types: ["Learning Center", "Technology"], limit: 24 }),
      getInsights({ types: ["Report"], limit: 4 }),
      getDeals(4),
      getVideos("Reel"),
      getVideos("Video", 3),
    ]);

  // Desks without picked articles fall back to the newest stories. Each desk
  // starts further down the list so the four columns of the design stay
  // filled and differ even when there are few articles.
  const fallbackDesk = (desk: number) => {
    if (latest.length === 0) return [];
    const start = (desk * 4) % latest.length;
    return [...latest.slice(start), ...latest.slice(0, start)].slice(0, 4);
  };
  const pickedDesks = sectionDesks(home, "africa-times");
  const desks = (
    pickedDesks.length > 0
      ? pickedDesks
      : DEFAULT_DESKS.map((title) => ({ title, stories: [] as typeof latest }))
  ).map((desk, index) => ({
    title: desk.title || DEFAULT_DESKS[index] || "",
    stories: desk.stories.length > 0 ? desk.stories : fallbackDesk(index),
  }));

  const whatMatters = sectionArticles(home, "what-matters-today");
  const newsPicks = sectionArticles(home, "news");

  // The home Insights block is the explainer desk: Learning Center and
  // Technology pieces, led by the editor's first pick.
  const featuredInsight = sectionInsights(home, "insights")[0] ?? insights[0] ?? null;
  const otherInsights = insights.filter((item) => item.id !== featuredInsight?.id);
  const insightCards = otherInsights.filter((item) => item.image).slice(0, 3);
  const insightSidebar = otherInsights
    .filter((item) => !insightCards.includes(item))
    .slice(0, 4);

  const render = (slug: HomeSectionSlug): ReactNode => {
    const heading = DEFAULT_HEADINGS[slug];
    switch (slug) {
      case "lead-story":
        return <LeadGrid home={home} />;
      case "what-matters-today":
        return (
          <WhatMatters
            heading={heading}
            items={whatMatters.length > 0 ? whatMatters : latest.slice(0, 8)}
          />
        );
      case "africa-times":
        return <AfricaTimes heading={heading} desks={desks} />;
      case "energy-brief":
        return <EnergyBrief heading={heading} items={brief} />;
      case "news":
        return (
          <NewsAnalysis
            heading={heading}
            items={newsPicks.length > 0 ? newsPicks : latest.slice(0, 8)}
          />
        );
      case "reels":
        return <Reels heading={heading} reels={reels} />;
      case "project-watch":
        return <ProjectWatch heading={heading} projects={projects} />;
      case "insights":
        return (
          <Insights
            heading={heading}
            featured={featuredInsight}
            cards={insightCards}
            sidebar={insightSidebar}
          />
        );
      case "investment-watch":
        return <InvestmentWatch heading={heading} deals={deals} />;
      case "watch-listen":
        return <WatchListen heading={heading} videos={videos} />;
      case "latest-reports":
        return <LatestReports heading={heading} reports={reports} />;
      case "newsletter":
        return <NewsletterCta />;
    }
  };

  // Sections render in the design's order with the design's headings; picks
  // come from the "home" Page's sections, looked up by slug.
  return (
    <main>
      {HOME_SECTIONS.map((slug) => (
        <Fragment key={slug}>{render(slug)}</Fragment>
      ))}
    </main>
  );
}
