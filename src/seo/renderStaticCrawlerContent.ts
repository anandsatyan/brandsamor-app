import { batchProcessStages, BATCH_PROCESS_FAQ } from '../content/batchProcess';
import type { TopicPageConfig } from '../components/topic/types';
import type { InfoSection } from '../components/info/InfoPageLayout';
import type { PageMetadata } from './pageMetadata';
import { aboutSections } from '../content/about';
import {
  privacyPolicySections,
  refundPolicySections,
  termsSections,
} from '../content/policies';
import { KNOWLEDGE_BASE_ARTICLES } from '../content/knowledgeBase/articles';
import { kbArticlePath } from '../content/knowledgeBase/types';
import type { KbArticleBase } from '../content/knowledgeBase/types';
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

const renderInfoStatic = (meta: PageMetadata, sections: InfoSection[]) => `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  ${sections
    .map(
      (section) => `<section id="${escapeHtml(section.id)}">
  <h2>${escapeHtml(section.title)}</h2>
  ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n  ')}
  ${renderBullets(section.bullets)}
</section>`,
    )
    .join('\n')}
</main>`;

const renderKbArticleStatic = (meta: PageMetadata, article: KbArticleBase) => `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(article.excerpt)}</p>
  ${article.sections
    .map(
      (section) => `<section id="${escapeHtml(section.id)}">
  <h2>${escapeHtml(section.title)}</h2>
  ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n  ')}
  ${renderBullets(section.bullets)}
</section>`,
    )
    .join('\n')}
  ${article.faq
    .map(
      (item) => `<article>
  <h3>${escapeHtml(item.question)}</h3>
  <p>${escapeHtml(item.answer)}</p>
</article>`,
    )
    .join('\n')}
</main>`;

export const renderStaticCrawlerContent = (route: string, meta: PageMetadata) => {
  if (route === '/') {
    return renderHomeStatic(meta);
  }

  if (route === '/about') {
    return renderInfoStatic(meta, aboutSections);
  }

  if (route === '/privacy-policy') {
    return renderInfoStatic(meta, privacyPolicySections);
  }

  if (route === '/terms') {
    return renderInfoStatic(meta, termsSections);
  }

  if (route === '/refund-and-cancellation-policy') {
    return renderInfoStatic(meta, refundPolicySections);
  }

  if (route === '/how-your-batch-is-made') {
    return `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  ${batchProcessStages
    .map(
      (stage) => `<section id="${escapeHtml(stage.id)}">
  <h2>${escapeHtml(stage.title)}</h2>
  <p>${escapeHtml(stage.summary)}</p>
  ${renderBullets(stage.details)}
</section>`,
    )
    .join('\n')}
  ${BATCH_PROCESS_FAQ.map(
    (item) => `<article>
  <h3>${escapeHtml(item.question)}</h3>
  <p>${escapeHtml(item.answer)}</p>
</article>`,
  ).join('\n')}
</main>`;
  }

  if (route === '/contact') {
    return `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  <p>Contact Brandsamor by email or phone for private-label fragrance questions.</p>
</main>`;
  }

  if (route === '/login') {
    return `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  <p>Sign in with your Brandsamor account email and password.</p>
</main>`;
  }

  if (route === '/knowledge-base') {
    return `<main id="brandsamor-static-content">
  <h1>${escapeHtml(meta.h1)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  ${KNOWLEDGE_BASE_ARTICLES.map(
    (article) => `<article>
  <h2><a href="${escapeHtml(kbArticlePath(article.slug))}">${escapeHtml(article.title)}</a></h2>
  <p>${escapeHtml(article.excerpt)}</p>
</article>`,
  ).join('\n')}
</main>`;
  }

  const kbArticle = KNOWLEDGE_BASE_ARTICLES.find((article) => kbArticlePath(article.slug) === route);
  if (kbArticle) {
    return renderKbArticleStatic(meta, kbArticle);
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
