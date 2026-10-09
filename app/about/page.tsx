import type { Metadata } from "next";
import { AboutIndex } from "@/components/about/AboutIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { aboutContent, getPage, pageIntro } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

// /about is not in the main navigation routes, so its fallback text lives here.
const FALLBACK = {
  kicker: "THE MASTHEAD",
  title: "About",
  intro: "Africa Energy is a newsroom covering the continent’s energy transition, Africa-first.",
};

export async function generateMetadata(): Promise<Metadata> {
  const intro = pageIntro(await getPage("about"), FALLBACK);
  return buildMetadata({
    seo: intro.seo,
    title: intro.title,
    description:
      "About Africa Energy News — energy intelligence from Johannesburg, Lagos, and Nairobi.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const page = await getPage("about");

  return (
    <>
      <AboutIndex intro={pageIntro(page, FALLBACK)} about={aboutContent(page)} />
      <NewsletterCta />
    </>
  );
}
