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
  <section id={id} className="py-12 sm:py-24 border-t border-[#f1ece0]" aria-labelledby={`${id}-heading`}>
    <div className="max-w-3xl mx-auto">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 id={`${id}-heading`} className="text-3xl sm:text-4xl mb-4">
        {title}
      </h2>
      <p className="text-[#77736E] text-base sm:text-lg mb-8 sm:mb-12">{description}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <details
            key={item.question}
            className="group bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] overflow-hidden"
            open={index === 0}
          >
            <summary className="flex items-start justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base sm:text-lg font-semibold text-[#2D302B]">
                {item.question}
              </h3>
              <ChevronDown
                size={18}
                className="shrink-0 mt-1 text-[#A8BBBF] transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-[#77736E] leading-relaxed">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);
