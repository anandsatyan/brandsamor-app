import { Check } from 'lucide-react';
import { SectionEyebrow } from './SectionEyebrow';
import { MarbleBottleIllustration } from '../Illustrations';
import type { ContentSectionData } from './types';

export const ContentSection = ({
  id,
  eyebrow,
  step,
  title,
  description,
  bullets,
  Illustration = MarbleBottleIllustration,
  reverse = false,
}: ContentSectionData & { reverse?: boolean }) => (
  <section
    id={id}
    className="py-12 sm:py-20 border-t border-border grid md:grid-cols-2 gap-10 md:gap-16 items-center"
  >
    <div className={reverse ? 'md:order-2' : ''}>
      {eyebrow && (
        <SectionEyebrow>
          {step ? `${eyebrow} · ${step}` : eyebrow}
        </SectionEyebrow>
      )}
      <h2 className="text-3xl sm:text-4xl mb-6">{title}</h2>
      <p className="text-base sm:text-lg text-body mb-6 leading-relaxed">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm sm:text-base text-body">
              <Check className="text-accent shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className={`rounded-xl overflow-hidden ${reverse ? 'md:order-1' : ''}`}>
      <Illustration />
    </div>
  </section>
);

export const ContentSections = ({ sections }: { sections: ContentSectionData[] }) =>
  sections.map((section, index) => (
    <ContentSection key={section.id} {...section} reverse={index % 2 === 1} />
  ));
