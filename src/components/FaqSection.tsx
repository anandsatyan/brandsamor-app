import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../seo/siteConfig';

export const FaqSection = () => (
  <section
    id="faq"
    className="py-12 sm:py-24 border-t border-border"
    aria-labelledby="faq-heading"
  >
    <div className="max-w-3xl mx-auto">
      <h4 className="text-accent text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
        <span className="w-8 h-px bg-border" />
        FAQ
      </h4>
      <h2 id="faq-heading" className="text-3xl sm:text-4xl mb-4">
        Private Label Perfume Questions, Answered
      </h2>
      <p className="text-body text-base sm:text-lg mb-8 sm:mb-12">
        Clear answers for brands researching how to start a perfume line, launch faster, and sell under their own name.
      </p>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <details
            key={item.question}
            className="group border-b border-border/70 py-1"
            open={index === 0}
          >
            <summary className="flex items-start justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base sm:text-lg font-semibold text-heading">
                {item.question}
              </h3>
              <ChevronDown
                size={18}
                className="shrink-0 mt-1 text-accent transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-body leading-relaxed">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);
