import { ChevronDown } from 'lucide-react';
import { BATCH_PROCESS_FAQ } from '../../content/batchProcess';

export const BatchProcessFaq = () => (
  <section id="batch-faq" className="py-phi-5 sm:py-phi-6 border-t border-border" aria-labelledby="batch-faq-heading">
    <h2 id="batch-faq-heading" className="type-h2 mb-phi-4">
      Production Questions
    </h2>
    <div className="max-w-3xl space-y-3">
      {BATCH_PROCESS_FAQ.map((item, index) => (
        <details
          key={item.question}
          className="group border-b border-border/70 py-1"
          open={index === 0}
        >
          <summary className="flex items-start justify-between gap-4 p-phi-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="type-h4">{item.question}</h3>
            <ChevronDown
              size={18}
              className="shrink-0 mt-1 text-accent transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <div className="px-phi-3 pb-phi-3 type-body-sm">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  </section>
);
