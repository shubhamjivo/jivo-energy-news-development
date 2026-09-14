import type { Metadata } from "next";
import { routeByHref } from "@/lib/site";

export function pageMetadata(href: string): Metadata {
  const route = routeByHref(href);
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: route.href },
    openGraph: {
      title: route.title,
      description: route.description,
      url: route.href,
    },
  };
}
