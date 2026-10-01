import type { ArticleCard } from "@/lib/article-types";
import { getArticleBySlug, mapArticleCard } from "@/lib/articles";
import { defaultHomeSections, resolveHomeSections, type HomeSection } from "@/lib/home-sections";
import { mediaSrc } from "@/lib/media";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import {
  MEDIA_FIELDS,
  strapiList,
  strapiSingle,
  SUMMARY_FIELDS,
  SUMMARY_POPULATE,
  type Query,
  type StrapiArticleSummary,
  type StrapiMedia,
  type StrapiSeo,
} from "@/lib/strapi";

const IMAGE: Query = { fields: MEDIA_FIELDS };
const ARTICLE_CARDS: Query = { fields: SUMMARY_FIELDS, populate: SUMMARY_POPULATE };
const SEO: Query = { populate: { metaImage: IMAGE } };

async function safe<T>(label: string, fallback: T, load: () => Promise<T>) {
  try {
    return await load();
  } catch (error) {
    console.error(`Could not load ${label} from Strapi`, error);
    return fallback;
  }
}

function text(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function cards(items: StrapiArticleSummary[] | null | undefined): ArticleCard[] {
  return (items ?? []).filter((item) => item.slug).map(mapArticleCard);
}

type StrapiStat = { value: string | null; label: string | null };
type StrapiLink = { label: string | null; url: string | null };

export type Stat = { value: string; label: string };
export type SiteLink = { label: string; href: string };

function stats(items: StrapiStat[] | null | undefined): Stat[] {
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

type StrapiInsight = {
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

const INSIGHT_CARD_FIELDS = [
  "title",
  "slug",
  "insight_type",
  "label",
  "summary",
  "pull_quote",
  "author",
  "read_time",
  "publishedAt",
];
const INSIGHT_CARD_POPULATE: Query = {
  cover: IMAGE,
  report_file: { fields: ["url"] },
};

function mapInsight(item: StrapiInsight): InsightCard {
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

export async function getInsights(options: { types?: InsightType[]; limit?: number } = {}) {
  return safe("insights", [] as InsightCard[], async () => {
    const filters: Query = {};
    if (options.types?.length) filters.insight_type = { $in: options.types };
    const payload = await strapiList<StrapiInsight>("insights", {
      fields: INSIGHT_CARD_FIELDS,
      populate: INSIGHT_CARD_POPULATE,
      filters,
      sort: ["publishedAt:desc"],
      pagination: { pageSize: options.limit ?? 24 },
    });
    return payload.data.filter((item) => item.slug).map(mapInsight);
  });
}

export async function getInsightBySlug(slug: string) {
  const payload = await strapiList<StrapiInsight>("insights", {
    filters: { slug: { $eq: slug } },
    populate: { ...INSIGHT_CARD_POPULATE, seo: SEO },
    pagination: { pageSize: 1 },
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
      populate: {
        default_share_image: IMAGE,
        footer_columns: { populate: { links: true } },
        social_links: true,
        menu_featured_insight: { fields: INSIGHT_CARD_FIELDS, populate: INSIGHT_CARD_POPULATE },
      },
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

// --------------------------------------------------------------------- pages

export type SitePage =
  | "Home"
  | "News"
  | "Projects"
  | "Companies"
  | "Countries"
  | "Insights"
  | "Learning Center"
  | "Technology"
  | "Reports"
  | "Opinion"
  | "Interviews"
  | "Events"
  | "About";

export type PageContent = {
  kicker: string;
  title: string;
  intro: string;
  stats: Stat[];
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
};

export async function getPageContent(
  sitePage: SitePage,
  fallback: { kicker: string; title: string; intro: string },
): Promise<PageContent> {
  const empty: PageContent = {
    ...fallback,
    stats: [],
    seoTitle: "",
    seoDescription: "",
    seoImage: "",
  };
  return safe(`page ${sitePage}`, empty, async () => {
    const payload = await strapiList<{
      title: string | null;
      kicker: string | null;
      intro: string | null;
      stats?: StrapiStat[];
      seo?: StrapiSeo | null;
    }>("pages", {
      filters: { site_page: { $eq: sitePage } },
      populate: { stats: true, seo: SEO },
      pagination: { pageSize: 1 },
    });
    const page = payload.data[0];
    if (!page) return empty;
    return {
      kicker: text(page.kicker) || fallback.kicker,
      title: text(page.title) || fallback.title,
      intro: text(page.intro) || fallback.intro,
      stats: stats(page.stats),
      seoTitle: text(page.seo?.metaTitle),
      seoDescription: text(page.seo?.metaDescription),
      seoImage: mediaSrc(page.seo?.metaImage),
    };
  });
}

// ----------------------------------------------------------------- home page

export type HomePage = {
  sections: HomeSection[];
  leadSlug: string;
  whatMatters: ArticleCard[];
  trending: ArticleCard[];
  missedIt: ArticleCard[];
  mostRead: ArticleCard[];
  theBrief: ArticleCard[];
  featuredInsight: InsightCard | null;
};

const EMPTY_HOME: HomePage = {
  sections: defaultHomeSections(),
  leadSlug: "",
  whatMatters: [],
  trending: [],
  missedIt: [],
  mostRead: [],
  theBrief: [],
  featuredInsight: null,
};

export async function getHomePage(): Promise<HomePage> {
  return safe("home page", EMPTY_HOME, async () => {
    const data = await strapiSingle<{
      sections?: {
        section: string;
        kicker: string | null;
        title: string | null;
        link_label: string | null;
        link_url: string | null;
        hidden: boolean | null;
      }[];
      lead_story?: StrapiArticleSummary | null;
      what_matters_today?: StrapiArticleSummary[];
      trending?: StrapiArticleSummary[];
      missed_it?: StrapiArticleSummary[];
      most_read?: StrapiArticleSummary[];
      the_brief?: StrapiArticleSummary[];
      featured_insight?: StrapiInsight | null;
    }>("home-page", {
      populate: {
        sections: true,
        lead_story: { fields: ["slug"] },
        what_matters_today: ARTICLE_CARDS,
        trending: ARTICLE_CARDS,
        missed_it: ARTICLE_CARDS,
        most_read: ARTICLE_CARDS,
        the_brief: ARTICLE_CARDS,
        featured_insight: { fields: INSIGHT_CARD_FIELDS, populate: INSIGHT_CARD_POPULATE },
      },
    });
    if (!data) return EMPTY_HOME;
    return {
      sections: resolveHomeSections(data.sections ?? []),
      leadSlug: data.lead_story?.slug ?? "",
      whatMatters: cards(data.what_matters_today),
      trending: cards(data.trending),
      missedIt: cards(data.missed_it),
      mostRead: cards(data.most_read),
      theBrief: cards(data.the_brief),
      featuredInsight: data.featured_insight?.slug ? mapInsight(data.featured_insight) : null,
    };
  });
}

// The editor-picked lead story with its full record (for the gallery and
// related list); falls back to the newest article.
export async function getLeadArticle() {
  return safe("lead article", null, async () => {
    const home = await getHomePage();
    if (home.leadSlug) {
      const lead = await getArticleBySlug(home.leadSlug);
      if (lead) return lead;
    }
    const newest = await strapiList<StrapiArticleSummary>("articles", {
      fields: ["slug"],
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 1 },
    });
    const slug = newest.data[0]?.slug;
    return slug ? getArticleBySlug(slug) : null;
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
      fields: ["label", "headline"],
      populate: { article: { fields: ["slug"] } },
      filters: { is_active: { $eq: true } },
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 20 },
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
      image?: StrapiMedia | null;
      energy_mix?: { technology: string; projects: number }[];
    }>("countries", {
      populate: { image: IMAGE, energy_mix: true },
      sort: ["sort_order:asc", "name:asc"],
      pagination: { pageSize: 60 },
    });
    const count = (value: number | null) => (value === null ? "—" : value.toLocaleString("en-GB"));
    return payload.data.map((item) => ({
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
      populate: { image: IMAGE, spotlight_stats: true },
      sort: ["name:asc"],
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

export type ProjectEntry = {
  slug: string;
  name: string;
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

export async function getProjects(limit = 100) {
  return safe("projects", [] as ProjectEntry[], async () => {
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
      populate: { image: IMAGE, country: { fields: ["name"] } },
      sort: ["updatedAt:desc"],
      pagination: { pageSize: limit },
    });
    return payload.data.map((item) => {
      const country = item.country?.name ?? "";
      const updated = relativeDays(item.updatedAt);
      return {
        slug: item.slug,
        name: item.name,
        technology: item.technology,
        status: item.project_status,
        country,
        developer: text(item.developer),
        capacity: text(item.capacity),
        image: mediaSrc(item.image),
        kicker: [country, item.technology].filter(Boolean).join(" · ").toUpperCase(),
        meta: [text(item.capacity), item.project_status, text(item.developer)].filter(Boolean).join(" · "),
        updated,
      };
    });
  });
}

// ---------------------------------------------------------------------- deals

export type DealEntry = {
  title: string;
  type: string;
  value: string;
  markets: string;
  href: string;
};

export async function getDeals(limit = 8) {
  return safe("deals", [] as DealEntry[], async () => {
    const payload = await strapiList<{
      title: string;
      deal_type: string;
      value: string | null;
      markets: string | null;
      article?: { slug: string | null } | null;
    }>("deals", {
      populate: { article: { fields: ["slug"] } },
      sort: ["deal_date:desc", "publishedAt:desc"],
      pagination: { pageSize: limit },
    });
    return payload.data.map((item) => ({
      title: item.title,
      type: item.deal_type.toUpperCase(),
      value: text(item.value),
      markets: text(item.markets),
      href: item.article?.slug ? `/news/${item.article.slug}` : "",
    }));
  });
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
      populate: { image: IMAGE, highlights: true },
      // An event stays listed until it has ended.
      filters: {
        $or: [{ end_date: { $gte: today } }, { end_date: { $null: true }, start_date: { $gte: today } }],
      },
      sort: ["start_date:asc"],
      pagination: { pageSize: 50 },
    });
    return payload.data.map((item) => {
      const start = new Date(`${item.start_date}T00:00:00Z`);
      return {
        slug: item.slug,
        title: item.title,
        type: item.event_type.toUpperCase(),
        day: String(start.getUTCDate()).padStart(2, "0"),
        month: start.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }).toUpperCase(),
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

export async function getVideos(type: "Reel" | "Video", limit = 12) {
  return safe(`${type} videos`, [] as VideoEntry[], async () => {
    const payload = await strapiList<{
      id: number;
      title: string;
      source: string | null;
      duration: string | null;
      youtube_url: string | null;
      thumbnail?: StrapiMedia | null;
    }>("videos", {
      populate: { thumbnail: IMAGE },
      filters: { video_type: { $eq: type } },
      sort: ["publishedAt:desc"],
      pagination: { pageSize: limit },
    });
    return payload.data
      .map((item) => {
        const id = youtubeId(text(item.youtube_url));
        return {
          id: item.id,
          title: item.title,
          source: text(item.source),
          duration: text(item.duration),
          youtubeId: id,
          href: id ? `https://www.youtube.com/watch?v=${id}` : "",
          image: mediaSrc(item.thumbnail) || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ""),
        };
      })
      .filter((item) => item.image && (type === "Video" || item.youtubeId));
  });
}
