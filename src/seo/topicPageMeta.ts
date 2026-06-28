import { PAGE_METADATA } from './pageMetadata';

type PublicRoute = keyof typeof PAGE_METADATA;

export const createTopicPageMeta = (path: PublicRoute) => {
  const meta = PAGE_METADATA[path];

  return {
    seo: {
      path: meta.path,
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
    },
    h1: meta.h1,
  };
};
