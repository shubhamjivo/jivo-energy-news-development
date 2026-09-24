import type { Metadata } from "next";
import { EventsIndex } from "@/components/events/EventsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { routeByHref } from "@/lib/site";

const route = routeByHref("/events")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
  openGraph: {
    title: route.title,
    description: route.description,
    url: route.href,
  },
};

export default function EventsPage() {
  return (
    <>
      <EventsIndex />
      <NewsletterCta />
    </>
  );
}
