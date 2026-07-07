import { ChevronDown } from 'lucide-react';
import { SectionEyebrow } from './SectionEyebrow';
import type { FaqItem } from '../../seo/siteConfig';

export const PageFaqSection = ({
  id = 'page-faq',
  eyebrow,
  title,
  description,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
}) => (
  <section id={id} className="py-12 sm:py-24 border-t border-border" aria-labelledby={`${id}-heading`}>
    <div className="max-w-3xl mx-auto">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 id={`${id}-heading`} className="type-h2 mb-4">
        {title}
      </h2>
      <p className="type-body-lg mb-8 sm:mb-12">{description}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <details
            key={item.question}
            className="group border-b border-border/70 py-1"
            open={index === 0}
          >
            <summary className="flex items-start justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="type-h4">
                {item.question}
              </h3>
              <ChevronDown
                size={18}
                className="shrink-0 mt-1 text-accent transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 type-body-sm">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);
