import "server-only";
import type { ArticleCard } from "@/lib/article-types";
import { getArticleBySlug } from "@/lib/articles";
import {
  cards,
  mapInsight,
  safe,
  text,
  type InsightCard,
  type Stat,
  type StrapiInsight,
} from "@/lib/cms";
import { mediaSrc } from "@/lib/media";
import {
  strapiList,
  type StrapiArticleSummary,
  type StrapiSeo,
} from "@/lib/strapi";

// A Page entry: found by slug, with its one-off content in the "sections"
// dynamic zone. Each section carries a slug the components look up.
export type CmsSection = {
  __component: string;
  slug: string;
  [field: string]: unknown;
};

export type CmsPage = {
  slug: string;
  title: string;
  seo: StrapiSeo | null;
  sections: CmsSection[];
};

// What each page needs populated. Pages without sections only load SEO.
const SEO_POPULATE = "seo.metaImage";
const PAGE_POPULATE: Record<string, string[]> = {
  home: [
    "sections.articles.banner",
    "sections.articles.thumbnail",
    "sections.articles.category",
    "sections.insights.cover",
    SEO_POPULATE,
  ],
  about: ["sections.items", "sections.people", SEO_POPULATE],
};

// Server-side only: called from page and layout server components.
export async function getPage(slug: string) {
  return safe(`page "${slug}"`, null as CmsPage | null, async () => {
    const payload = await strapiList<CmsPage>("pages", {
      filters: { slug: { $eq: slug } },
      populate: PAGE_POPULATE[slug] ?? SEO_POPULATE,
    });
    const page = payload.data[0];
    return page ? { ...page, sections: page.sections ?? [] } : null;
  });
}

export function findSection(page: CmsPage | null, slug: string) {
  return page?.sections.find((section) => section.slug === slug);
}

const str = (section: CmsSection | undefined, field: string) =>
  text(section?.[field] as string | null | undefined);

// ---------------------------------------------------------------- page intro

export type PageContent = {
  kicker: string;
  title: string;
  intro: string;
  stats: Stat[];
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
};

// The intro text is part of the design; only SEO comes from the Page entry.
export function pageIntro(
  page: CmsPage | null,
  intro: { kicker: string; title: string; intro: string; stats?: Stat[] },
): PageContent {
  return {
    ...intro,
    stats: intro.stats ?? [],
    seoTitle: text(page?.seo?.metaTitle),
    seoDescription: text(page?.seo?.metaDescription),
    seoImage: mediaSrc(page?.seo?.metaImage),
  };
}

// ----------------------------------------------------------------- home page

export function sectionArticles(page: CmsPage | null, slug: string): ArticleCard[] {
  return cards(findSection(page, slug)?.articles as StrapiArticleSummary[] | undefined);
}

export function sectionInsights(page: CmsPage | null, slug: string): InsightCard[] {
  const items = (findSection(page, slug)?.insights ?? []) as StrapiInsight[];
  return items.filter((item) => item.slug).map(mapInsight);
}

// The editor-picked lead story with its full record (gallery, related list);
// falls back to the newest article.
export async function getLeadArticle(home: CmsPage | null) {
  return safe("lead article", null, async () => {
    const picked = sectionArticles(home, "lead-story")[0];
    if (picked) {
      const lead = await getArticleBySlug(picked.slug);
      if (lead) return lead;
    }
    const newest = await strapiList<StrapiArticleSummary>("articles", {
      fields: ["slug"],
      sort: "publishedAt:desc",
      pagination: { pageSize: 1 },
    });
    const slug = newest.data[0]?.slug;
    return slug ? getArticleBySlug(slug) : null;
  });
}

// ---------------------------------------------------------------- about page

export type AboutContent = {
  heading: string;
  introLeft: string[];
  introRight: string[];
  tagline: string;
  coverageHeading: string;
  coverage: { title: string; text: string }[];
  bureausHeading: string;
  bureaus: { title: string; text: string }[];
  teamHeading: string;
  teamLinkLabel: string;
  teamLinkUrl: string;
  team: { name: string; role: string; initials: string; highlight: boolean }[];
  contactHeading: string;
  contactText: string;
  contactEmail: string;
  briefKicker: string;
  briefHeading: string;
  briefText: string;
  briefButton: string;
  briefUrl: string;
};

// The approved About page text. Contact, the Brief box and links are fixed
// design text; the rest is used when the About page sections are empty.
const DEFAULT_ABOUT: AboutContent = {
  heading: "Energy intelligence, Africa-first.",
  introLeft: [
    "Africa Energy is an independent newsroom covering the continent’s energy transition — from utility-scale solar and storage to transmission, hydrogen, offtake and the capital that makes projects bankable.",
    "We report from Johannesburg, Lagos and Nairobi, and we write for the people who close deals: developers, DFIs, utilities, ministers and offtakers.",
  ],
  introRight: [
    "We do not treat Africa as a single market. Each dispatch is tagged to the country, the technology and the money. The project file, the company directory and the country pages are how readers navigate that complexity.",
  ],
  tagline: "Founded 2024 · Independent · Subscriber-supported",
  coverageHeading: "What we cover",
  coverage: [
    { title: "Solar & wind", text: "Utility-scale generation, hybrid parks, auctions and PPAs." },
    { title: "Storage", text: "Batteries, pumped hydro and the tenders that firm variable power." },
    { title: "Grid", text: "Transmission, interconnectors and the utilities that operate them." },
    { title: "Hydrogen", text: "Export hubs, offtake and the path from announcement to FID." },
    { title: "Capital", text: "DFIs, commercial banks, M&A and the Mission 300 stack." },
    { title: "Policy", text: "Tenders, regulation and the politics of energy access." },
  ],
  bureausHeading: "Bureaus",
  bureaus: [
    { title: "Johannesburg", text: "Southern Africa desk · Projects, storage, Eskom and the SAPP." },
    { title: "Lagos", text: "West Africa desk · Solar closes, offtake and regional capital." },
    { title: "Nairobi", text: "East Africa desk · Geothermal, wind, grids and Mission 300." },
  ],
  teamHeading: "The newsroom",
  teamLinkLabel: "Write to the desk →",
  teamLinkUrl: "mailto:desk@africaenergy.news",
  team: [
    { name: "Amara Chukwu", role: "West Africa correspondent · Lagos", initials: "AC", highlight: false },
    { name: "Naledi Mokoena", role: "Southern Africa editor · Johannesburg", initials: "NM", highlight: false },
    { name: "Wanjiku Kariuki", role: "East Africa correspondent · Nairobi", initials: "WK", highlight: true },
    { name: "Daniel Bekele", role: "Projects & data · Addis / Nairobi", initials: "DB", highlight: false },
  ],
  contactHeading: "Contact the desk",
  contactText:
    "Tips, corrections and partnership enquiries: desk@africaenergy.news. For the Brief, use Subscribe — we do not run a general comments board.",
  contactEmail: "desk@africaenergy.news",
  briefKicker: "AFRICA ENERGY BRIEF",
  briefHeading: "Five stories. Every morning.",
  briefText: "Intelligence from Johannesburg, Lagos and Nairobi — in one briefing.",
  briefButton: "Subscribe to the Brief",
  briefUrl: "#newsletter",
};

function paragraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type TextItem = { title: string | null; text: string | null };
type Person = { name: string | null; role: string | null; initials: string | null; highlight: boolean | null };

export function aboutContent(page: CmsPage | null): AboutContent {
  const intro = findSection(page, "intro");
  const coverage = findSection(page, "coverage");
  const bureaus = findSection(page, "bureaus");
  const newsroom = findSection(page, "newsroom");

  const items = (section: CmsSection | undefined, fallback: AboutContent["coverage"]) => {
    const rows = ((section?.items ?? []) as TextItem[])
      .map((row) => ({ title: text(row.title), text: text(row.text) }))
      .filter((row) => row.title);
    return rows.length > 0 ? rows : fallback;
  };
  const team = ((newsroom?.people ?? []) as Person[])
    .filter((person) => text(person.name))
    .map((person) => ({
      name: text(person.name),
      role: text(person.role),
      initials: text(person.initials) || initialsOf(text(person.name)),
      highlight: Boolean(person.highlight),
    }));
  const left = paragraphs(str(intro, "left"));
  const right = paragraphs(str(intro, "right"));
  const D = DEFAULT_ABOUT;

  return {
    heading: str(intro, "title") || D.heading,
    introLeft: left.length > 0 ? left : D.introLeft,
    introRight: right.length > 0 ? right : D.introRight,
    tagline: str(intro, "note") || D.tagline,
    coverageHeading: str(coverage, "title") || D.coverageHeading,
    coverage: items(coverage, D.coverage),
    bureausHeading: str(bureaus, "title") || D.bureausHeading,
    bureaus: items(bureaus, D.bureaus),
    teamHeading: str(newsroom, "title") || D.teamHeading,
    teamLinkLabel: D.teamLinkLabel,
    teamLinkUrl: D.teamLinkUrl,
    team: team.length > 0 ? team : D.team,
    contactHeading: D.contactHeading,
    contactText: D.contactText,
    contactEmail: D.contactEmail,
    briefKicker: D.briefKicker,
    briefHeading: D.briefHeading,
    briefText: D.briefText,
    briefButton: D.briefButton,
    briefUrl: D.briefUrl,
  };
}
