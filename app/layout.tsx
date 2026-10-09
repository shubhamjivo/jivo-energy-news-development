import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/cms";
import { DEFAULT_SHARE_IMAGE } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const DEFAULT_KEYWORDS = [
  "Africa energy news",
  "renewable energy Africa",
  "solar",
  "wind",
  "battery storage",
  "green hydrogen",
  "grid investment",
  "energy policy",
];

// Site-wide defaults from Site Settings; pages override them with their own
// "SEO & sharing" fields (see lib/seo.ts).
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const image = settings.shareImage || DEFAULT_SHARE_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: settings.description,
    applicationName: SITE_NAME,
    keywords: settings.keywords.length > 0 ? settings.keywords : DEFAULT_KEYWORDS,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "news",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: settings.description,
      images: [{ url: image, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      site: settings.twitterHandle || undefined,
      title: SITE_NAME,
      description: settings.description,
      images: [image],
    },
    verification: settings.googleVerification
      ? { google: settings.googleVerification }
      : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#030e50",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <JsonLd />
        <Header insightsFeature={settings.menuFeature} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
