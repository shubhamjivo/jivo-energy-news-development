export const SITE_NAME = "Africa Energy News";
export const SITE_TAGLINE = "Energy intelligence, Africa-first";
export const SITE_DESCRIPTION =
  "Africa-first energy intelligence covering solar, wind, storage, hydrogen, grid investment, policy, and capital across African markets.";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.africaenergynews.com"
).replace(/\/$/, "");

export const ROUTES = [
  {
    href: "/",
    label: "Home",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    changeFrequency: "hourly" as const,
    priority: 1,
  },
  {
    href: "/news",
    label: "News",
    title: "News",
    description:
      "Latest Africa energy news and analysis across solar, wind, storage, hydrogen, grids, and policy.",
    changeFrequency: "hourly" as const,
    priority: 0.9,
  },
  {
    href: "/projects",
    label: "Projects",
    title: "Projects",
    description:
      "Track renewable energy projects across Africa, from solar and wind to storage and green hydrogen.",
    changeFrequency: "daily" as const,
    priority: 0.8,
  },
  {
    href: "/companies",
    label: "Companies",
    title: "Companies",
    description:
      "Company coverage of IPPs, developers, offtakers, and financiers shaping Africa's energy transition.",
    changeFrequency: "daily" as const,
    priority: 0.8,
  },
  {
    href: "/countries",
    label: "Countries",
    title: "Countries",
    description:
      "Country-by-country energy intelligence for African markets, including capacity, pipeline, and policy.",
    changeFrequency: "daily" as const,
    priority: 0.8,
  },
  {
    href: "/insights",
    label: "Insights",
    title: "Insights",
    description:
      "Explainers and analysis on renewable energy, storage, grids, and the economics of Africa's power sector.",
    changeFrequency: "weekly" as const,
    priority: 0.7,
  },
  {
    href: "/insights/learning-center",
    label: "Learning Center",
    title: "Learning Center",
    description:
      "Guides and explainers on solar, wind, storage, grids, and how Africa's power systems work.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    href: "/insights/technology",
    label: "Technology",
    title: "Technology",
    description:
      "Technology coverage of solar, batteries, hydrogen, and grid innovation across African markets.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    href: "/insights/reports",
    label: "Reports",
    title: "Reports",
    description:
      "Research reports on Africa energy investment, storage, solar markets, and hydrogen.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    href: "/insights/opinion",
    label: "Opinion",
    title: "Opinion",
    description:
      "Commentary and analysis on Africa's energy transition, policy, and capital.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    href: "/insights/interviews",
    label: "Interviews",
    title: "Interviews",
    description:
      "Conversations with developers, financiers, and policymakers shaping Africa's energy sector.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    href: "/events",
    label: "Events",
    title: "Events",
    description:
      "Upcoming Africa energy forums, briefings, and industry events.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    href: "/about",
    label: "About",
    title: "About",
    description:
      "About Africa Energy News — energy intelligence from Johannesburg, Lagos, and Nairobi.",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
] as const;

export const NAV_LINKS = ROUTES.filter(
  (route) => route.href.split("/").filter(Boolean).length <= 1,
).map(({ href, label }) => ({ href, label }));

export const INSIGHTS_LINKS = ROUTES.filter((route) =>
  route.href.startsWith("/insights/"),
);

export const FEATURED_INSIGHT = {
  href: "/insights/reports",
  kicker: "Featured Report",
  title: "Africa Battery Storage Outlook 2026",
  dek: "Deployment pipelines, procurement models and financing structures across ten priority markets.",
  image: "/images/report-2.png",
} as const;

export function routeByHref(href: string) {
  const route = ROUTES.find((item) => item.href === href);
  if (!route) {
    throw new Error(`Unknown route: ${href}`);
  }
  return route;
}
