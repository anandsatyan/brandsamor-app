import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from '../seo/siteConfig';
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

export const SeoHead = () => {
  useEffect(() => {
    document.title = DEFAULT_TITLE;

    upsertMeta('name', 'description', DEFAULT_DESCRIPTION);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', DEFAULT_TITLE);
    upsertMeta('property', 'og:description', DEFAULT_DESCRIPTION);
    upsertMeta('property', 'og:url', SITE_URL);
    upsertMeta('property', 'og:locale', 'en_US');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', DEFAULT_TITLE);
    upsertMeta('name', 'twitter:description', DEFAULT_DESCRIPTION);
    upsertLink('canonical', SITE_URL);

    const scriptId = 'brandsamor-structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredDataGraph);
  }, []);

  return null;
};
