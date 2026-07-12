import { Check } from 'lucide-react';
import { BodyCopy } from '../BodyCopy';
import { SectionEyebrow } from './SectionEyebrow';
import type { ContentSectionData } from './types';

export const ContentSection = ({
  id,
  eyebrow,
  step,
  title,
  description,
  bullets,
  Illustration,
  reverse = false,
}: ContentSectionData & { reverse?: boolean }) => (
  <section
    id={id}
    className={`py-12 sm:py-20 border-t border-border ${
      Illustration ? 'grid md:grid-cols-2 gap-10 md:gap-16 items-center' : ''
    }`}
  >
    <div className={Illustration && reverse ? 'md:order-2' : ''}>
      {eyebrow && (
        <SectionEyebrow>
          {step ? `${eyebrow} · ${step}` : eyebrow}
        </SectionEyebrow>
      )}
      <h2 className="type-h2 mb-6">{title}</h2>
      <p className="type-body-lg mb-6 max-w-3xl">
        <BodyCopy>{description}</BodyCopy>
      </p>
      {bullets && bullets.length > 0 && (
        <ul className="space-y-3 max-w-3xl">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 type-body-sm">
              <Check className="text-accent shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    {Illustration && (
      <div className={reverse ? 'md:order-1' : ''}>
        <Illustration />
      </div>
    )}
  </section>
);

export const ContentSections = ({ sections }: { sections: ContentSectionData[] }) =>
  sections.map((section, index) => (
    <ContentSection key={section.id} {...section} reverse={index % 2 === 1} />
  ));
