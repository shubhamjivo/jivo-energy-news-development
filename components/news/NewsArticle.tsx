import type { CmsArticle } from "@/lib/article-types";
import { ArticleView } from "@/components/news/ArticleView";

export function NewsArticle({
  article,
  isFirst = false,
}: {
  article: CmsArticle;
  isFirst?: boolean;
}) {
  return (
    <div className={isFirst ? undefined : "border-t border-hairline"}>
      <ArticleView article={article} priorityImage={isFirst} />
    </div>
  );
}
