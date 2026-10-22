import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Companies page was removed; send old links to the news list.
  async redirects() {
    return [{ source: "/companies", destination: "/news", permanent: true }];
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
