import type { ContentSectionData } from '../components/topic/types';

export const sectionBullets = (...items: string[]) => items;

export const withSteps = (
  sections: Omit<ContentSectionData, 'step' | 'eyebrow'>[],
  eyebrowPrefix = 'SECTION',
): ContentSectionData[] =>
  sections.map((section, index) => ({
    ...section,
    eyebrow: eyebrowPrefix,
    step: String(index + 1).padStart(2, '0'),
  }));
