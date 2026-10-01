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

// Content pasted from Docs/Gemini carries inline typography that overrides the
// site's article styles. Keep layout declarations (width, text-align, ...).
const PASTED_STYLE_PROPS =
  /^(font(-[a-z]+)?|line-height|letter-spacing|color|background(-color)?)$/i;

function stripPastedStyles(html: string) {
  return html.replace(
    /\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi,
    (_match, _quoted, double: string | undefined, single: string | undefined) => {
      const kept = (double ?? single ?? "")
        .replace(/&quot;/g, '"')
        .split(";")
        .map((decl) => decl.trim())
        .filter((decl) => {
          const prop = decl.split(":")[0]?.trim() ?? "";
          return decl.includes(":") && !PASTED_STYLE_PROPS.test(prop);
        })
        .join("; ");
      return kept ? ` style="${kept.replace(/"/g, "&quot;")}"` : "";
    },
  );
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
  let out = rewriteMediaUrls(
    stripPastedStyles(sanitizeArticleHtml(html)),
    cmsUrl,
  );
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
