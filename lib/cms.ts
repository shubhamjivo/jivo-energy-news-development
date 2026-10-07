import "server-only";
import type { ArticleCard } from "@/lib/article-types";
import { mapArticleCard } from "@/lib/articles";
import { mediaSrc } from "@/lib/media";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import {
  strapiList,
  strapiSingle,
  type Query,
  type StrapiArticleSummary,
  type StrapiMedia,
  type StrapiSeo,
} from "@/lib/strapi";


export async function safe<T>(label: string, fallback: T, load: () => Promise<T>) {
  try {
    return await load();
  } catch (error) {
    console.error(`Could not load ${label} from Strapi`, error);
    return fallback;
  }
}

export function text(value: string | null | undefined) {
  return value?.trim() ?? "";
}

export function cards(items: StrapiArticleSummary[] | null | undefined): ArticleCard[] {
  return (items ?? []).filter((item) => item.slug).map(mapArticleCard);
}

export type StrapiStat = { value: string | null; label: string | null };
type StrapiLink = { label: string | null; url: string | null };

export type Stat = { value: string; label: string };
export type SiteLink = { label: string; href: string };

export function stats(items: StrapiStat[] | null | undefined): Stat[] {
  return (items ?? [])
    .map((item) => ({ value: text(item.value), label: text(item.label) }))
    .filter((item) => item.value);
}

function links(items: StrapiLink[] | null | undefined): SiteLink[] {
  return (items ?? [])
    .map((item) => ({ label: text(item.label), href: text(item.url) }))
    .filter((item) => item.label && item.href);
}

// ------------------------------------------------------------------ insights

export const INSIGHT_TYPES = [
  "Learning Center",
  "Technology",
  "Report",
  "Opinion",
  "Interview",
  "Analysis",
] as const;
export type InsightType = (typeof INSIGHT_TYPES)[number];

export type StrapiInsight = {
  id: number;
  title: string | null;
  slug: string | null;
  insight_type: InsightType;
  label: string | null;
  summary: string | null;
  pull_quote: string | null;
  author: string | null;
  read_time: number | null;
  publishedAt: string;
  cover?: StrapiMedia | null;
  report_file?: StrapiMedia | null;
  content?: string | null;
  seo?: StrapiSeo | null;
};

export type InsightCard = {
  id: number;
  title: string;
  slug: string;
  href: string;
  type: InsightType;
  label: string;
  summary: string;
  pullQuote: string;
  author: string;
  readTime: string;
  byline: string;
  image: string;
  reportFile: string;
  publishedAt: string;
};

export function mapInsight(item: StrapiInsight): InsightCard {
  const readTime = item.read_time && item.read_time > 0 ? `${item.read_time} min read` : "";
  const author = text(item.author);
  return {
    id: item.id,
    title: text(item.title),
    slug: item.slug ?? "",
    href: `/insights/${item.slug}`,
    type: item.insight_type,
    label: text(item.label) || item.insight_type.toUpperCase(),
    summary: text(item.summary),
    pullQuote: text(item.pull_quote),
    author,
    readTime,
    byline: [author ? `By ${author}` : "", readTime].filter(Boolean).join(" · "),
    image: mediaSrc(item.cover),
    reportFile: mediaSrc(item.report_file),
    publishedAt: item.publishedAt,
  };
}

// One request for every insight; pages pick their types from the result.
export async function getInsights(options: { types?: InsightType[]; limit?: number } = {}) {
  const all = await safe("insights", [] as InsightCard[], async () => {
    const payload = await strapiList<StrapiInsight>("insights", {
      populate: "*",
      sort: "publishedAt:desc",
      pagination: { pageSize: 100 },
    });
    return payload.data.filter((item) => item.slug).map(mapInsight);
  });
  const { types, limit } = options;
  const picked = types?.length ? all.filter((item) => types.includes(item.type)) : all;
  return limit ? picked.slice(0, limit) : picked;
}

export async function getInsightBySlug(slug: string) {
  const payload = await strapiList<StrapiInsight>("insights", {
    filters: { slug: { $eq: slug } },
    populate: ["cover", "report_file", "seo.metaImage"],
  });
  const item = payload.data[0];
  if (!item) return null;
  return {
    ...mapInsight(item),
    content: item.content ?? "",
    seoTitle: text(item.seo?.metaTitle),
    seoDescription: text(item.seo?.metaDescription),
    seoImage: mediaSrc(item.seo?.metaImage),
  };
}

export async function getInsightSlugs() {
  return safe("insight slugs", [] as { slug: string; updatedAt: string }[], async () => {
    const payload = await strapiList<{ slug: string | null; updatedAt: string }>("insights", {
      fields: ["slug", "updatedAt"],
      pagination: { pageSize: 100 },
    });
    return payload.data
      .filter((item) => item.slug)
      .map((item) => ({ slug: item.slug as string, updatedAt: item.updatedAt }));
  });
}

// ------------------------------------------------------------- site settings

export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  shareImage: string;
  newsletterHeading: string;
  newsletterText: string;
  newsletterButton: string;
  footerColumns: { heading: string; links: SiteLink[] }[];
  socialLinks: SiteLink[];
  copyright: string;
  menuFeature: InsightCard | null;
};

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: SITE_NAME,
  tagline: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  shareImage: "",
  newsletterHeading: "The 5 energy stories you need to know today.",
  newsletterText: "Africa Energy Brief — intelligence from Johannesburg, Lagos and Nairobi.",
  newsletterButton: "Subscribe to the Brief",
  footerColumns: [],
  socialLinks: [],
  copyright: `© ${new Date().getFullYear()} Africa Energy. All rights reserved.`,
  menuFeature: null,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  return safe("site settings", DEFAULT_SETTINGS, async () => {
    const data = await strapiSingle<{
      site_name: string | null;
      tagline: string | null;
      site_description: string | null;
      newsletter_heading: string | null;
      newsletter_text: string | null;
      newsletter_button: string | null;
      copyright_text: string | null;
      default_share_image?: StrapiMedia | null;
      footer_columns?: { heading: string | null; links?: StrapiLink[] }[];
      social_links?: StrapiLink[];
      menu_featured_insight?: StrapiInsight | null;
    }>("site-setting", {
      populate: [
        "default_share_image",
        "footer_columns.links",
        "social_links",
        "menu_featured_insight.cover",
      ],
    });
    if (!data) return DEFAULT_SETTINGS;
    return {
      siteName: text(data.site_name) || DEFAULT_SETTINGS.siteName,
      tagline: text(data.tagline) || DEFAULT_SETTINGS.tagline,
      description: text(data.site_description) || DEFAULT_SETTINGS.description,
      shareImage: mediaSrc(data.default_share_image),
      newsletterHeading: text(data.newsletter_heading) || DEFAULT_SETTINGS.newsletterHeading,
      newsletterText: text(data.newsletter_text) || DEFAULT_SETTINGS.newsletterText,
      newsletterButton: text(data.newsletter_button) || DEFAULT_SETTINGS.newsletterButton,
      footerColumns: (data.footer_columns ?? [])
        .map((column) => ({ heading: text(column.heading), links: links(column.links) }))
        .filter((column) => column.links.length > 0),
      socialLinks: links(data.social_links),
      copyright: text(data.copyright_text) || DEFAULT_SETTINGS.copyright,
      menuFeature: data.menu_featured_insight?.slug ? mapInsight(data.menu_featured_insight) : null,
    };
  });
}

// --------------------------------------------------------------- energy brief

export type BriefItem = { label: string; text: string; href: string };

export async function getBriefItems() {
  return safe("energy brief", [] as BriefItem[], async () => {
    const payload = await strapiList<{
      label: string | null;
      headline: string | null;
      article?: { slug: string | null } | null;
    }>("tickers", {
      populate: "*",
      filters: { is_active: { $eq: true } },
      sort: "publishedAt:desc",
    });
    return payload.data
      .map((item) => ({
        label: text(item.label),
        text: text(item.headline),
        href: item.article?.slug ? `/news/${item.article.slug}` : "",
      }))
      .filter((item) => item.text);
  });
}

// ------------------------------------------------------------------ countries

export type CountryEntry = {
  slug: string;
  name: string;
  region: string;
  label: string;
  summary: string;
  image: string;
  capacity: string;
  projects: string;
  companies: string;
  pipeline: string;
  mix: { name: string; count: number }[];
  news: string;
  investment: string;
  policy: string;
};

export async function getCountries() {
  return safe("countries", [] as CountryEntry[], async () => {
    const payload = await strapiList<{
      name: string;
      slug: string;
      region: string;
      market_label: string | null;
      summary: string | null;
      installed_capacity: string | null;
      tracked_projects: number | null;
      active_companies: number | null;
      pipeline_projects: number | null;
      latest_news: string | null;
      latest_investment: string | null;
      latest_policy: string | null;
      priority_market: boolean | null;
      image?: StrapiMedia | null;
      energy_mix?: { technology: string; projects: number }[];
    }>("countries", {
      populate: ["image", "energy_mix"],
      sort: ["sort_order:asc", "name:asc"],
      pagination: { pageSize: 60 },
    });
    const count = (value: number | null) => (value === null ? "—" : value.toLocaleString("en-GB"));
    // Countries that only exist for project links stay off the page.
    return payload.data.filter((item) => item.priority_market !== false).map((item) => ({
      slug: item.slug,
      name: item.name,
      region: item.region.toUpperCase(),
      label: text(item.market_label),
      summary: text(item.summary),
      image: mediaSrc(item.image),
      capacity: text(item.installed_capacity) || "—",
      projects: count(item.tracked_projects),
      companies: count(item.active_companies),
      pipeline: count(item.pipeline_projects),
      mix: (item.energy_mix ?? []).map((mix) => ({ name: mix.technology, count: mix.projects })),
      news: text(item.latest_news),
      investment: text(item.latest_investment),
      policy: text(item.latest_policy),
    }));
  });
}

// ------------------------------------------------------------------ companies

export type CompanyEntry = {
  slug: string;
  name: string;
  type: string;
  headquarters: string;
  meta: string;
  description: string;
  image: string;
  website: string;
  spotlight: boolean;
  stats: Stat[];
};

export async function getCompanies() {
  return safe("companies", [] as CompanyEntry[], async () => {
    const payload = await strapiList<{
      name: string;
      slug: string;
      company_type: string;
      headquarters: string | null;
      highlight: string | null;
      description: string | null;
      website: string | null;
      is_spotlight: boolean | null;
      image?: StrapiMedia | null;
      spotlight_stats?: StrapiStat[];
    }>("companies", {
      populate: "*",
      sort: "publishedAt:desc",
      pagination: { pageSize: 100 },
    });
    return payload.data.map((item) => ({
      slug: item.slug,
      name: item.name,
      type: item.company_type,
      headquarters: text(item.headquarters),
      meta: [text(item.headquarters), text(item.highlight)].filter(Boolean).join(" · "),
      description: text(item.description),
      image: mediaSrc(item.image),
      website: text(item.website),
      spotlight: Boolean(item.is_spotlight),
      stats: stats(item.spotlight_stats),
    }));
  });
}

// ------------------------------------------------------------------- projects

// CMS technology values in the order the filter chips show them, with the
// shorter chip label where the original design used one.
const TECHNOLOGY_LABELS: Record<string, string> = { "Battery Storage": "Battery" };

export type ProjectEntry = {
  slug: string;
  name: string;
  /** Short label used by filter chips and the projects table. */
  technology: string;
  status: string;
  country: string;
  developer: string;
  capacity: string;
  image: string;
  kicker: string;
  meta: string;
  updated: string;
};

function relativeDays(value: string) {
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return "";
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// One request for all projects; the home page shows the first few.
export async function getProjects(limit?: number) {
  const all = await safe("projects", [] as ProjectEntry[], async () => {
    const payload = await strapiList<{
      name: string;
      slug: string;
      technology: string;
      project_status: string;
      developer: string | null;
      capacity: string | null;
      updatedAt: string;
      image?: StrapiMedia | null;
      country?: { name: string } | null;
    }>("projects", {
      populate: "*",
      // Newest tracked asset first; "Updated" shows the last edit.
      sort: "publishedAt:desc",
      pagination: { pageSize: 100 },
    });
    return payload.data.map((item) => {
      const country = item.country?.name ?? "";
      const technology = TECHNOLOGY_LABELS[item.technology] ?? item.technology;
      const updated = relativeDays(item.updatedAt);
      return {
        slug: item.slug,
        name: item.name,
        technology,
        status: item.project_status,
        country,
        developer: text(item.developer),
        capacity: text(item.capacity),
        image: mediaSrc(item.image),
        kicker: [country, technology].filter(Boolean).join(" · ").toUpperCase(),
        meta: [text(item.capacity), item.project_status, text(item.developer)].filter(Boolean).join(" · "),
        updated,
      };
    });
  });
  return limit ? all.slice(0, limit) : all;
}

// ---------------------------------------------------------------------- deals

// Short labels for the narrow label column on the Companies page.
const DEAL_SHORT_TYPES: Record<string, string> = {
  "Financial close": "FINANCE",
  "Development finance": "DFI",
};

export type DealEntry = {
  title: string;
  type: string;
  shortType: string;
  value: string;
  markets: string;
  href: string;
};

// One request for the recent deals; pages show the first few.
export async function getDeals(limit = 8) {
  const all = await safe("deals", [] as DealEntry[], async () => {
    const payload = await strapiList<{
      title: string;
      deal_type: string;
      value: string | null;
      markets: string | null;
      article?: { slug: string | null } | null;
    }>("deals", {
      populate: "*",
      sort: ["deal_date:desc", "publishedAt:desc"],
    });
    return payload.data.map((item) => ({
      title: item.title,
      type: item.deal_type.toUpperCase(),
      shortType: DEAL_SHORT_TYPES[item.deal_type] ?? item.deal_type.toUpperCase(),
      value: text(item.value),
      markets: text(item.markets),
      href: item.article?.slug ? `/news/${item.article.slug}` : "",
    }));
  });
  return all.slice(0, limit);
}

// --------------------------------------------------------------------- events

export type EventEntry = {
  slug: string;
  title: string;
  type: string;
  day: string;
  month: string;
  dateRange: string;
  meta: string;
  venue: string;
  description: string;
  image: string;
  registrationUrl: string;
  featured: boolean;
  highlights: Stat[];
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatDateRange(start: string, end: string | null) {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
  const from = new Date(start);
  if (!end || end === start) return from.toLocaleDateString("en-GB", options).toUpperCase();
  const to = new Date(end);
  const sameMonth = from.getUTCMonth() === to.getUTCMonth() && from.getUTCFullYear() === to.getUTCFullYear();
  const head = sameMonth ? String(from.getUTCDate()) : from.toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });
  return `${head}–${to.toLocaleDateString("en-GB", options)}`.toUpperCase();
}

export async function getUpcomingEvents() {
  return safe("events", [] as EventEntry[], async () => {
    const today = new Date().toISOString().slice(0, 10);
    const payload = await strapiList<{
      title: string;
      slug: string;
      event_type: string;
      start_date: string;
      end_date: string | null;
      city: string | null;
      venue: string | null;
      attendance: string | null;
      description: string | null;
      registration_url: string | null;
      is_featured: boolean | null;
      image?: StrapiMedia | null;
      highlights?: StrapiStat[];
    }>("events", {
      populate: "*",
      sort: "start_date:asc",
      pagination: { pageSize: 100 },
    });
    // An event stays listed until it has ended.
    const upcoming = payload.data.filter(
      (item) => (item.end_date ?? item.start_date) >= today,
    );
    return upcoming.map((item) => {
      const start = new Date(`${item.start_date}T00:00:00Z`);
      return {
        slug: item.slug,
        title: item.title,
        type: item.event_type.toUpperCase(),
        day: String(start.getUTCDate()).padStart(2, "0"),
        month: MONTHS[start.getUTCMonth()],
        dateRange: formatDateRange(item.start_date, item.end_date),
        meta: [text(item.city), text(item.attendance)].filter(Boolean).join(" · "),
        venue: text(item.venue) || text(item.city),
        description: text(item.description),
        image: mediaSrc(item.image),
        registrationUrl: text(item.registration_url),
        featured: Boolean(item.is_featured),
        highlights: stats(item.highlights),
      };
    });
  });
}

// --------------------------------------------------------------------- videos

export type VideoEntry = {
  id: number;
  title: string;
  source: string;
  duration: string;
  youtubeId: string;
  href: string;
  image: string;
};

function youtubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live)\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? "";
}

// One request for all videos; callers pick reels or videos from the result.
export async function getVideos(type: "Reel" | "Video", limit?: number) {
  const all = await safe("videos", [] as (VideoEntry & { type: string })[], async () => {
    const payload = await strapiList<{
      id: number;
      title: string;
      video_type: string;
      source: string | null;
      duration: string | null;
      youtube_url: string | null;
      thumbnail?: StrapiMedia | null;
    }>("videos", {
      populate: "*",
      sort: "publishedAt:desc",
      pagination: { pageSize: 100 },
    });
    return payload.data.map((item) => {
      const id = youtubeId(text(item.youtube_url));
      return {
        id: item.id,
        type: item.video_type,
        title: item.title,
        source: text(item.source),
        duration: text(item.duration),
        youtubeId: id,
        href: id ? `https://www.youtube.com/watch?v=${id}` : "",
        image: mediaSrc(item.thumbnail) || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ""),
      };
    });
  });
  const picked = all.filter(
    (item) => item.type === type && item.image && (type === "Video" || item.youtubeId),
  );
  return limit ? picked.slice(0, limit) : picked;
}
