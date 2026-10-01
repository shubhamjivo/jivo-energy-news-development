export const HOME_SECTION_KEYS = [
  "Lead story",
  "What Matters Today",
  "Africa Times",
  "Energy Brief",
  "News",
  "Reels",
  "Project Watch",
  "Insights",
  "Investment Watch",
  "Watch & Listen",
  "Latest Reports",
  "Newsletter",
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number];

export type SectionHeading = {
  kicker: string;
  title: string;
  linkLabel: string;
  linkUrl: string;
};

export type HomeSection = SectionHeading & { section: HomeSectionKey };

const heading = (
  kicker: string,
  title: string,
  linkLabel = "",
  linkUrl = "",
): SectionHeading => ({ kicker, title, linkLabel, linkUrl });

// Headings used when the Home Page entry leaves a field empty, and the layout
// used when it has no sections at all.
export const DEFAULT_HEADINGS: Record<HomeSectionKey, SectionHeading> = {
  "Lead story": heading("", ""),
  "What Matters Today": heading("TODAY", "What Matters Today", "All stories →", "/news"),
  "Africa Times": heading("Four desks. One briefing.", "AFRICA TIMES"),
  "Energy Brief": heading("", "Africa Energy Brief"),
  News: heading("THE NEWSROOM", "News", "Latest Africa Energy →", "/news"),
  Reels: heading("", "Reels", "VIEW ALL →", "/news"),
  "Project Watch": heading("THE PROJECT FILE", "Project Watch", "Explore all projects →", "/projects"),
  Insights: heading("INSIGHTS", "", "MORE INSIGHTS →", "/insights"),
  "Investment Watch": heading("DEALS & CAPITAL", "Energy Investment Watch", "All investment news →", "/news"),
  "Watch & Listen": heading("VIDEO", "Watch & Listen", "All videos →", "/news"),
  "Latest Reports": heading("FROM THE DESK", "Latest Reports", "Browse the library →", "/insights"),
  Newsletter: heading("", ""),
};

export function defaultHomeSections(): HomeSection[] {
  return HOME_SECTION_KEYS.map((section) => ({ section, ...DEFAULT_HEADINGS[section] }));
}

export function resolveHomeSections(
  rows: {
    section: string;
    kicker?: string | null;
    title?: string | null;
    link_label?: string | null;
    link_url?: string | null;
    hidden?: boolean | null;
  }[],
): HomeSection[] {
  if (rows.length === 0) return defaultHomeSections();
  const seen = new Set<string>();
  const sections: HomeSection[] = [];
  for (const row of rows) {
    const key = row.section as HomeSectionKey;
    // Each section renders once; unknown or repeated rows are ignored.
    if (!(key in DEFAULT_HEADINGS) || seen.has(key)) continue;
    seen.add(key);
    if (row.hidden) continue;
    const fallback = DEFAULT_HEADINGS[key];
    sections.push({
      section: key,
      kicker: row.kicker?.trim() || fallback.kicker,
      title: row.title?.trim() || fallback.title,
      linkLabel: row.link_label?.trim() || fallback.linkLabel,
      linkUrl: row.link_url?.trim() || fallback.linkUrl,
    });
  }
  return sections;
}
