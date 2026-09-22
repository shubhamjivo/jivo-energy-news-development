import type { CmsArticle } from "@/lib/article-types";
import { ArticleView } from "@/components/news/ArticleView";
import { UpNextDivider } from "@/components/news/UpNextDivider";

export function NewsArticle({
  article,
  isFirst = false,
}: {
  article: CmsArticle;
  isFirst?: boolean;
}) {
  return (
    <div>
      {isFirst ? null : <UpNextDivider />}
      <ArticleView article={article} priorityImage={isFirst} />
    </div>
  );
}
