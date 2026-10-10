import type { Metadata } from "next";
import { EventsIndex } from "@/components/events/EventsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getUpcomingEvents, getVideos } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/events");
}
// insight page
export default async function EventsPage() {
  const [intro, events, replays] = await Promise.all([
    pageContent("/events"),
    getUpcomingEvents(),
    getVideos("Video", 3),
  ]);

  return (
    <>
      <EventsIndex intro={intro} events={events} replays={replays} />
      <NewsletterCta />
    </>
  );
}
