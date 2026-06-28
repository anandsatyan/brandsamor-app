import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '../seo/siteConfig';
import { OG_IMAGE, OG_SITE_NAME } from '../seo/pageMetadata';
import { structuredDataGraph } from '../seo/structuredData';

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

type SeoHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  robots?: string;
  structuredData?: object;
};

export const SeoHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url,
  robots = 'index, follow',
  structuredData = structuredDataGraph,
}: SeoHeadProps) => {
  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', OG_SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:locale', 'en_US');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('name', 'twitter:image', OG_IMAGE);

    if (url) {
      upsertMeta('property', 'og:url', url);
      upsertLink('canonical', url);
    }

    const scriptId = 'brandsamor-structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);
  }, [title, description, url, robots, structuredData]);

  return null;
};
