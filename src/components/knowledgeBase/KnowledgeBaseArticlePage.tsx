import { Navigate, useParams } from 'react-router-dom';
import { getKbArticle } from '../../content/knowledgeBase/articles';
import { buildKbArticleMetadata } from '../../seo/pageMetadata';
import { buildKnowledgeBaseArticleStructuredData } from '../../seo/buildKnowledgeBaseStructuredData';
import { ArticlePageLayout } from './ArticlePageLayout';

export const KnowledgeBaseArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getKbArticle(slug) : undefined;
  const meta = slug ? buildKbArticleMetadata(slug) : null;

  if (!article || !meta) {
    return <Navigate to="/knowledge-base" replace />;
  }

  return (
    <ArticlePageLayout
      meta={meta}
      article={article}
      structuredData={buildKnowledgeBaseArticleStructuredData(meta, article)}
    />
  );
};
