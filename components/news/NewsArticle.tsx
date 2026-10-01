import type { ArticleCard, CmsArticle } from "@/lib/article-types";
import { ArticleView } from "@/components/news/ArticleView";
import { UpNextDivider } from "@/components/news/UpNextDivider";

export function NewsArticle({
  article,
  latest,
  isFirst = false,
}: {
  article: CmsArticle;
  latest: ArticleCard[];
  isFirst?: boolean;
}) {
  return (
    <div>
      {isFirst ? null : <UpNextDivider />}
      <ArticleView article={article} latest={latest} priorityImage={isFirst} />
    </div>
  );
}
