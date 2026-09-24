import type { Metadata } from "next";
import { AboutIndex } from "@/components/about/AboutIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";

const title = "About";
const description =
  "About Africa Energy News — energy intelligence from Johannesburg, Lagos, and Nairobi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutIndex />
      <NewsletterCta />
    </>
  );
}
