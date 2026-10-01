export function articleHeadingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeArticleHtml(html: string) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function rewriteMediaUrls(html: string, cmsUrl: string) {
  const origin = cmsUrl.replace(/\/$/, "");
  return html
    .split(`${origin}/uploads/`)
    .join("/media/")
    .replace(/((?:src|href|srcset)=["'])\/uploads\//gi, "$1/media/");
}

export function prepareArticleHtml(
  html: string,
  articleId: number,
  cmsUrl: string,
) {
  let out = rewriteMediaUrls(sanitizeArticleHtml(html), cmsUrl);
  const headings: string[] = [];

  out = out.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, attrs = "", inner: string) => {
      const text = stripTags(inner);
      if (!text) return _match;
      headings.push(text);
      const id = `article-${articleId}-${articleHeadingId(text)}`;
      const withoutId = String(attrs).replace(/\s*id\s*=\s*(["']).*?\1/i, "");
      return `<h${level}${withoutId} id="${id}">${inner}</h${level}>`;
    },
  );

  out = out.replace(/<img\b([^>]*)>/gi, (_match, attrs: string) => {
    let next = attrs;
    if (!/\bloading\s*=/i.test(next)) next += ' loading="lazy"';
    if (!/\bdecoding\s*=/i.test(next)) next += " decoding=\"async\"";
    return `<img${next}>`;
  });

  return { html: out, headings };
}
