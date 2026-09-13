export { NAV_LINKS } from "@/lib/site";

export const UTILITY_LINKS = [
  { href: "/#latest", label: "Latest" },
  { href: "/#africa-times", label: "Trending" },
  { href: "/#brief", label: "Africa Energy Brief" },
  { href: "/events", label: "Events" },
  { href: "/#newsletter", label: "Newsletter" },
] as const;

export const DATE_LINE =
  "Thursday, August 27, 2026 · Johannesburg · Lagos · Nairobi · 10:46 UTC";

export const MOBILE_DATE = "Thu, Aug 27, 2026";
export const MOBILE_TIME = "10:46 UTC";

export const LATEST_STORIES = [
  {
    kicker: "SOLAR",
    title: "Egypt advances new solar-plus-storage investment programme",
    meta: "42 min ago · Egypt",
    image: "/images/latest-solar.png",
  },
  {
    kicker: "BATTERY STORAGE",
    title: "Utility-scale battery deployment accelerates across Southern Africa",
    meta: "1 hr ago · South Africa · Zambia",
    image: "/images/latest-battery.png",
  },
  {
    kicker: "WIND",
    title: "New wind development pipeline expands in East Africa",
    meta: "3 hr ago · Kenya · Ethiopia",
    image: "/images/latest-wind.png",
  },
  {
    kicker: "GREEN HYDROGEN",
    title: "Green hydrogen projects move from announcements toward execution",
    meta: "5 hr ago · Namibia · Mauritania",
    image: "/images/latest-hydrogen.png",
  },
  {
    kicker: "GRID",
    title: "Kenya accelerates solar and wind development as grid investment grows",
    meta: "2 hr ago · Kenya",
    image: "/images/latest-grid.png",
  },
  {
    kicker: "INVESTMENT",
    title: "West African solar consortium reaches $340M financial close",
    meta: "6 hr ago · Nigeria · Ghana · Senegal",
    image: "/images/latest-investment.png",
  },
] as const;

export const LEAD_STORY = {
  image: "/images/lead-featured.png",
  caption: "1 / 4 · Utility-scale solar array at sunrise — West Africa",
  kicker: "SOLAR · INVESTMENT",
  markets: "NIGERIA · GHANA · SENEGAL",
  title: "Africa's Renewable Energy Investment Pipeline Enters a New Phase",
  dek: "A wave of financial closes across West Africa signals growing confidence from development finance institutions and private capital in utility-scale solar and storage.",
  byline: "By Amara Chukwu · 18 min ago · 6 min read",
} as const;

export const RELATED_NEWS = [
  {
    kicker: "HYDROGEN",
    title: "Green hydrogen projects move from announcements toward execution",
    dek: "Namibia and Mauritania advance offtake talks as hubs near FID.",
    image: "/images/related-hydrogen.png",
  },
  {
    kicker: "POLICY",
    title: "Mission 300 financing framework reaches new milestones",
    dek: "Concessional capital is stacked against private offtake in four markets.",
    image: "/images/related-policy.png",
  },
  {
    kicker: "POLICY",
    title: "Mission 300 financing framework reaches new milestones",
    dek: "Concessional capital is stacked against private offtake in four markets.",
    image: "/images/related-policy.png",
  },
  {
    kicker: "STORAGE",
    title: "Malawi advances utility-scale battery storage deployment",
    dek: "A first-of-kind bid window is designed to firm hydro in the dry season.",
    image: "/images/related-storage.png",
  },
] as const;

export const WHAT_MATTERS = [
  {
    kicker: "GRID",
    title: "Kenya accelerates solar and wind as grid investment grows",
    dek: "New transmission is unlocking a backlog of shovel-ready projects.",
    image: "/images/matters-grid.png",
  },
  {
    kicker: "POLICY",
    title: "Mission 300 financing framework reaches new milestones",
    dek: "Concessional capital is stacked against private offtake in four markets.",
    image: "/images/matters-policy.png",
  },
  {
    kicker: "STORAGE",
    title: "Malawi advances utility-scale battery storage deployment",
    dek: "A first-of-kind bid window is designed to firm hydro in the dry season.",
    image: "/images/matters-storage.png",
  },
  {
    kicker: "HYDROGEN",
    title: "Green hydrogen projects move from announcements toward execution",
    dek: "Namibia and Mauritania advance offtake talks as hubs near FID.",
    image: "/images/matters-hydrogen.png",
  },
  {
    kicker: "SOLAR",
    title: "Egypt advances new solar-plus-storage investment programme",
    dek: "Cairo is pairing desert PV with four-hour batteries to firm evening peak.",
    image: "/images/matters-solar.png",
  },
  {
    kicker: "WIND",
    title: "New wind development pipeline expands in East Africa",
    dek: "Developers are stacking hybrid configurations as grid codes tighten around variability.",
    image: "/images/matters-wind.png",
  },
  {
    kicker: "INVESTMENT",
    title: "West African solar consortium reaches $340M financial close",
    dek: "A regional vehicle pools DFI capital with independent power producers across four markets.",
    image: "/images/matters-investment.png",
  },
  {
    kicker: "COMPANIES",
    title: "Pan-African IPP acquires majority stake in Southern African storage developer",
    dek: "The deal consolidates a pipeline of utility-scale batteries in South Africa and Zambia.",
    image: "/images/matters-companies.png",
  },
] as const;

export const AFRICA_TIMES = [
  {
    title: "Trending",
    stories: [
      { title: "Egypt advances new solar-plus-storage investment programme", image: "/images/times-1.png" },
      { title: "Mission 300 financing framework reaches new milestone", image: "/images/times-2.png" },
      { title: "Malawi advances utility-scale battery storage deployment", image: "/images/times-3.png" },
      { title: "Kenya accelerates solar and wind as grid investment grows", image: "/images/times-4.png" },
    ],
  },
  {
    title: "Missed It",
    stories: [
      { title: "Climate fund approves concessional facility for Ethiopian transmission", image: "/images/times-3.png" },
      { title: "Pan-African IPP acquires majority stake in Southern African storage developer", image: "/images/times-5.png" },
      { title: "Corporate offtaker signs 15-year solar PPA for East African hub", image: "/images/times-6.png" },
      { title: "West African solar consortium reaches $340M financial close", image: "/images/times-2.png" },
    ],
  },
  {
    title: "Most Read",
    stories: [
      { title: "Kenya accelerates solar and wind development as grid investment grows", image: "/images/times-4.png" },
      { title: "Egypt advances new solar-plus-storage investment programme", image: "/images/times-1.png" },
      { title: "Mission 300 financing framework reaches new milestones", image: "/images/times-2.png" },
      { title: "Green hydrogen projects move from announcements toward execution", image: "/images/times-7.png" },
    ],
  },
  {
    title: "The Brief",
    stories: [
      { title: "Solar: new utility-scale projects announced across four markets", image: "/images/times-2.png" },
      { title: "Storage: battery deployments accelerate as tender pipelines grow", image: "/images/times-8.png" },
      { title: "Grid: transmission investment becomes the sector's top priority", image: "/images/times-9.png" },
      { title: "Policy: new renewable-energy frameworks emerge in West Africa", image: "/images/times-2.png" },
    ],
  },
] as const;

export const ENERGY_BRIEF = [
  { kicker: "Solar", text: "New utility-scale projects announced across four markets" },
  { kicker: "Storage", text: "Battery deployments accelerate as tender pipelines grow" },
  { kicker: "Policy", text: "New renewable-energy frameworks emerge in West Africa" },
] as const;

export const NEWS_CARDS = [
  {
    kicker: "SOLAR",
    accent: true,
    title: "West African solar consortium reaches $340M financial close",
    dek: "A regional vehicle pools DFI capital with independent power producers across four markets.",
    image: "/images/news-1.png",
  },
  {
    kicker: "GRID",
    title: "Climate fund approves concessional facility for Ethiopian transmission",
    dek: "New lines are designed to unlock a backlog of highland wind and solar.",
    image: "/images/news-2.png",
  },
  {
    kicker: "COMPANIES",
    title: "Pan-African IPP acquires majority stake in Southern African storage developer",
    dek: "The deal consolidates a pipeline of utility-scale batteries in South Africa and Zambia.",
    image: "/images/news-3.png",
  },
  {
    kicker: "OFFTAKE",
    title: "Corporate offtaker signs 15-year solar PPA for East African manufacturing hub",
    dek: "Industrial demand is becoming a bankable counterpart to sovereign tenders.",
    image: "/images/news-4.png",
  },
  {
    kicker: "SOLAR",
    title: "Egypt advances new solar-plus-storage investment programme",
    dek: "Cairo is pairing desert PV with four-hour batteries to firm evening peak.",
    image: "/images/news-5.png",
  },
  {
    kicker: "GRID",
    title: "Kenya accelerates solar and wind as grid investment grows",
    dek: "New transmission capacity is unlocking a backlog of shovel-ready projects.",
    image: "/images/news-6.png",
  },
  {
    kicker: "WIND",
    title: "New wind development pipeline expands in East Africa",
    dek: "Developers are stacking hybrid configurations as grid codes tighten.",
    image: "/images/news-7.png",
  },
  {
    kicker: "HYDROGEN",
    title: "Green hydrogen projects move from announcements toward execution",
    dek: "Namibia and Mauritania advance offtake talks as hubs near FID.",
    image: "/images/news-8.png",
  },
] as const;

export const REELS = [
  { title: "What is a solar panel?", duration: "02:14", image: "/images/reel-1.png" },
  { title: "How solar power is transforming Africa", duration: "03:48", image: "/images/reel-2.png" },
  { title: "How batteries give solar power extra mileage", duration: "01:52", image: "/images/reel-3.png" },
  { title: "How solar mini-grids power communities", duration: "02:31", image: "/images/reel-4.png" },
  { title: "From sunlight to electricity: how solar power works", duration: "01:45", image: "/images/reel-5.png" },
  { title: "Why solar energy matters for Africa", duration: "02:10", image: "/images/reel-6.png" },
] as const;

export const PROJECT_FILTERS = [
  "All",
  "Solar",
  "Wind",
  "Battery",
  "Hydrogen",
  "Hydro",
  "Geothermal",
] as const;

export const PROJECTS = [
  {
    kicker: "TANZANIA · SOLAR PV",
    title: "Dodoma Solar PV",
    meta: "Meridian Power Partners  ·  Updated 2 days ago",
    image: "/images/project-1.png",
    filter: "Solar",
  },
  {
    kicker: "SOUTH AFRICA · WIND",
    title: "Karoo Wind Extension",
    meta: "Highveld Renewables  ·  Updated 5 days ago",
    image: "/images/project-2.png",
    filter: "Wind",
  },
  {
    kicker: "NIGERIA · BATTERY STORAGE",
    title: "Lagos Grid Storage I",
    meta: "Delta Energy Systems  ·  Updated 1 day ago",
    image: "/images/project-3.png",
    filter: "Battery",
  },
  {
    kicker: "EGYPT · GREEN HYDROGEN",
    title: "Suez Hydrogen Hub",
    meta: "NorthStar H2  ·  Updated 3 days ago",
    image: "/images/project-4.png",
    filter: "Hydrogen",
  },
  {
    kicker: "KENYA · GEOTHERMAL",
    title: "Rift Valley Expansion",
    meta: "KenGen  ·  Updated 4 days ago",
    image: "/images/project-5.png",
    filter: "Geothermal",
  },
  {
    kicker: "ZAMBIA · SOLAR",
    title: "Copperbelt Solar Park",
    meta: "Globeleq  ·  Updated 5 days ago",
    image: "/images/project-1.png",
    filter: "Solar",
  },
  {
    kicker: "NAMIBIA · HYDROGEN",
    title: "Tsau Khaeb Green H2",
    meta: "Hyphen Hydrogen  ·  Updated 1 week ago",
    image: "/images/project-6.png",
    filter: "Hydrogen",
  },
  {
    kicker: "ETHIOPIA · WIND",
    title: "Aysha Wind Corridor",
    meta: "Ethiopian Electric Power  ·  Updated 1 week ago",
    image: "/images/project-7.png",
    filter: "Wind",
  },
] as const;

export const INSIGHT_FEATURED = {
  title: "What is renewable energy—and how does it work?",
  dek: "A practical guide to power from sunlight, wind, water and heat—and why these sources naturally replenish.",
  read: "7 min read",
  byline: "By Editorial Team",
  image: "/images/insight-featured.png",
} as const;

export const INSIGHT_CARDS = [
  {
    kicker: "SOLAR BASICS",
    title: "How solar panels turn sunlight into usable electricity",
    dek: "A simple look at photovoltaic cells, wiring and inverters.",
    image: "/images/insight-1.png",
  },
  {
    kicker: "BATTERY",
    title: "How batteries keep solar energy available after sunset",
    dek: "Stored daytime power supports lights and appliances at night.",
    image: "/images/insight-2.png",
  },
  {
    kicker: "SMART GRID",
    title: "How smart grids balance changing renewable power",
    dek: "Forecasting and flexible demand keep supply and use in step.",
    image: "/images/insight-3.png",
  },
] as const;

export const INSIGHT_SIDEBAR = [
  {
    title: "Solar panels explained: cells, modules and inverters",
    dek: "Learn how individual photovoltaic cells are combined into panels and connected through an inverter.",
    read: "5 min read",
  },
  {
    title: "How home batteries extend solar use into the night",
    dek: "A battery saves surplus daytime electricity so lights and appliances can run after the sun goes down.",
    read: "6 min read",
  },
  {
    title: "What happens to solar generation on cloudy days?",
    dek: "Panels still generate electricity in diffuse light, though output changes with cloud cover and system design.",
    read: "4 min read",
  },
  {
    title: "Can wind and solar power a grid around the clock?",
    dek: "A reliable renewable grid combines diverse locations, storage, transmission and flexible demand.",
    read: "7 min read",
  },
] as const;

export const INVESTMENTS = [
  {
    kicker: "FINANCIAL CLOSE",
    title: "West African solar consortium reaches $340M financial close",
    value: "$340M",
  },
  {
    kicker: "DEVELOPMENT FINANCE",
    title: "Climate fund approves concessional facility for Ethiopian transmission",
    value: "$210M",
  },
  {
    kicker: "M&A",
    title: "Pan-African IPP acquires majority stake in Southern African storage developer",
    value: "$95M",
  },
  {
    kicker: "PPA",
    title: "Corporate offtaker signs 15-year solar PPA for East African manufacturing hub",
    value: "120 MW",
  },
] as const;

export const VIDEOS = [
  {
    title: "Inside Africa's largest battery storage facility",
    image: "/images/video-1.png",
  },
  {
    title: "The financing gap: talking storage with regional lenders",
    image: "/images/video-2.png",
  },
  {
    title: "This week in Africa energy: five stories explained",
    image: "/images/video-3.png",
  },
] as const;

export const REPORTS = [
  { title: "Africa Solar Market Outlook", image: "/images/report-1.png" },
  { title: "Africa Battery Storage Outlook", image: "/images/report-2.png" },
  { title: "Africa Renewable Energy Investment Report", image: "/images/report-3.png" },
  { title: "Africa Green Hydrogen Outlook", image: "/images/report-4.png" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "NEWS",
    links: [
      { href: "/news", label: "Latest" },
      { href: "/#africa-times", label: "Trending" },
      { href: "/#brief", label: "Africa Energy Brief" },
    ],
  },
  {
    heading: "INTELLIGENCE",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/companies", label: "Companies" },
      { href: "/countries", label: "Countries" },
    ],
  },
  {
    heading: "MORE",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/events", label: "Events" },
      { href: "/about", label: "About" },
    ],
  },
] as const;
