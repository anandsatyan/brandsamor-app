import { TopicPageLayout } from './topic/TopicPageLayout';
import { NEW_PAGE_CONFIGS } from '../content/newPages/registry';
import { NotFoundPage } from './NotFoundPage';

export const CommercialTopicPage = ({ path }: { path: string }) => {
  const config = NEW_PAGE_CONFIGS[path];
  if (!config) return <NotFoundPage />;
  return <TopicPageLayout config={config} />;
};

/** Build a zero-prop page component closed over a commercial route path. */
export const createCommercialPage = (path: string) => {
  const Page = () => <CommercialTopicPage path={path} />;
  Page.displayName = `CommercialPage(${path})`;
  return Page;
};
