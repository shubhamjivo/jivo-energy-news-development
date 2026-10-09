import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

// A schema.org block. Renders nothing for empty or non-object data, so an
// entry's optional "Structured data" field can be passed straight in.
export function JsonLdScript({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        slogan: SITE_TAGLINE,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo/${encodeURIComponent("Africa Energy News Logo with background.jpg")}`,
          width: 2981,
          height: 2000,
        },
        publishingPrinciples: `${SITE_URL}/about`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return <JsonLdScript data={jsonLd} />;
}
