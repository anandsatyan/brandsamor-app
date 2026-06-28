import { OG_IMAGE, OG_SITE_NAME } from './pageMetadata';
import type { PageMetadata } from './pageMetadata';

export const renderHeadTags = (meta: PageMetadata, structuredDataJson?: string) => {
  const structuredDataScript = structuredDataJson
    ? `\n    <script id="brandsamor-structured-data" type="application/ld+json">${structuredDataJson}</script>`
    : '';

  return `<title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeAttr(meta.description)}" />
    <meta name="robots" content="${escapeAttr(meta.robots)}" />
    <link rel="canonical" href="${escapeAttr(meta.canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeAttr(OG_SITE_NAME)}" />
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:url" content="${escapeAttr(meta.canonical)}" />
    <meta property="og:image" content="${escapeAttr(OG_IMAGE)}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(meta.title)}" />
    <meta name="twitter:description" content="${escapeAttr(meta.description)}" />
    <meta name="twitter:image" content="${escapeAttr(OG_IMAGE)}" />${structuredDataScript}`;
};

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const escapeHtml = escapeAttr;
