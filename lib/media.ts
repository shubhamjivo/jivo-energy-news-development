import type { StrapiMedia } from "@/lib/strapi";

// Strapi serves uploads from /uploads; the site proxies them through /media so
// next/image treats them as local images. Absolute URLs (cloud upload
// providers) are used as-is.
export function mediaSrc(media: StrapiMedia | null | undefined) {
  if (!media?.url) return "";
  if (media.url.startsWith("/uploads/")) {
    return `/media/${media.url.slice("/uploads/".length)}`;
  }
  return media.url;
}
