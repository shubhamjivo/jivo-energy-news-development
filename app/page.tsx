import type { Metadata } from "next";
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
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <LeadGrid />
      <WhatMatters />
      <AfricaTimes />
      <EnergyBrief />
      <NewsAnalysis />
      <Reels />
      <ProjectWatch />
      <Insights />
      <InvestmentWatch />
      <WatchListen />
      <LatestReports />
      <NewsletterCta />
    </main>
  );
}
