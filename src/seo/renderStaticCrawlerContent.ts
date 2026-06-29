import type { TopicPageConfig } from '../components/topic/types';
import type { PageMetadata } from './pageMetadata';
import { HOMEPAGE_STATIC_SECTIONS, TOPIC_ROUTE_CONFIGS } from './routeContentRegistry';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const renderBullets = (bullets?: string[]) =>
  bullets && bullets.length > 0
    ? `<ul>${bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';

const renderSections = (sections: TopicPageConfig['sections']) =>
  sections
    .map(
      (section) => `<section id="${escapeHtml(section.id)}">
  <h2>${escapeHtml(section.title)}</h2>
  <p>${escapeHtml(section.description)}</p>
  ${renderBullets(section.bullets)}
</section>`,
    )
    .join('\n');

const renderFaq = (faq?: TopicPageConfig['faq']) =>
  faq && faq.items.length > 0
    ? `<section id="${escapeHtml(faq.id ?? 'faq')}">
  <h2>${escapeHtml(faq.title)}</h2>
  <p>${escapeHtml(faq.description)}</p>
  ${faq.items
    .map(
      (item) => `<article>
    <h3>${escapeHtml(item.question)}</h3>
    <p>${escapeHtml(item.answer)}</p>
  </article>`,
    )
    .join('\n')}
</section>`
    : '';

const renderTopicStatic = (meta: PageMetadata, config: TopicPageConfig) => `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(config.hero.description)}</p>
  ${renderSections(config.sections)}
  ${renderFaq(config.faq)}
</main>`;

const renderHomeStatic = (meta: PageMetadata) => `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  ${HOMEPAGE_STATIC_SECTIONS.map(
    (section) => `<section>
  <h2>${escapeHtml(section.title)}</h2>
  <p>${escapeHtml(section.description)}</p>
</section>`,
  ).join('\n')}
</main>`;

export const renderStaticCrawlerContent = (route: string, meta: PageMetadata) => {
  if (route === '/') {
    return renderHomeStatic(meta);
  }

  const config = TOPIC_ROUTE_CONFIGS[route];
  if (!config) {
    return `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
</main>`;
  }

  return renderTopicStatic(meta, config);
};
