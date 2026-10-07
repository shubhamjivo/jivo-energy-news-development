// Home page sections in the order of the approved design, with their
// headings. Story picks are looked up by the same slug in the "home" Page.
export const HOME_SECTIONS = [
  "lead-story",
  "what-matters-today",
  "africa-times",
  "energy-brief",
  "news",
  "reels",
  "project-watch",
  "insights",
  "investment-watch",
  "watch-listen",
  "latest-reports",
  "newsletter",
] as const;

export type HomeSectionSlug = (typeof HOME_SECTIONS)[number];

export type SectionHeading = {
  kicker: string;
  title: string;
  linkLabel: string;
  linkUrl: string;
};

const heading = (
  kicker: string,
  title: string,
  linkLabel = "",
  linkUrl = "",
): SectionHeading => ({ kicker, title, linkLabel, linkUrl });

export const DEFAULT_HEADINGS: Record<HomeSectionSlug, SectionHeading> = {
  "lead-story": heading("", ""),
  "what-matters-today": heading("TODAY", "What Matters Today", "All stories →", "/news"),
  "africa-times": heading("Four desks. One briefing.", "AFRICA TIMES"),
  "energy-brief": heading("", "Africa Energy Brief"),
  news: heading("THE NEWSROOM", "News", "Latest Africa Energy →", "/news"),
  reels: heading("", "Reels", "VIEW ALL →", "/news"),
  "project-watch": heading("THE PROJECT FILE", "Project Watch", "Explore all projects →", "/projects"),
  insights: heading("INSIGHTS", "", "MORE INSIGHTS →", "/insights"),
  "investment-watch": heading("DEALS & CAPITAL", "Energy Investment Watch", "All investment news →", "/news"),
  "watch-listen": heading("VIDEO", "Watch & Listen", "All videos →", "/news"),
  "latest-reports": heading("FROM THE DESK", "Latest Reports", "Browse the library →", "/insights"),
  newsletter: heading("", ""),
};

export const DEFAULT_DESKS = ["Trending", "Missed It", "Most Read", "The Brief"];
