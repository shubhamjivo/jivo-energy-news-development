import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Companies page was removed; send old links to the news list.
  async redirects() {
    return [{ source: "/companies", destination: "/news", permanent: true }];
  },
  // Outside production, also mark every response (images, PDFs, media) as
  // not for search engines; pages already carry a "noindex" meta tag.
  async headers() {
    if (process.env.NEXT_PUBLIC_SITE_ENV === "production") return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
