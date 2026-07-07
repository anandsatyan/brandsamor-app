import { BATCH_PROCESS_OVERVIEW_STEPS } from '../../content/batchProcess';

export const BatchProcessOverview = () => (
  <section id="production-overview" className="py-phi-5 sm:py-phi-6 border-t border-border">
    <h2 className="type-h2 mb-phi-3 max-w-2xl">
      One Approved Product. A Controlled Production Sequence.
    </h2>
    <p className="type-body-lg mb-phi-4 max-w-3xl">
      Production is not a single filling step. Fragrance preparation, component readiness, filling,
      closure application, branding, inspection and packing must work together as one coordinated
      sequence.
    </p>

    <ol className="flex flex-wrap gap-phi-2" aria-label="Production sequence overview">
      {BATCH_PROCESS_OVERVIEW_STEPS.map((step, index) => (
        <li key={step} className="flex items-center gap-phi-2">
          <span className="type-num-inline text-accent">{`0${index + 1}`}</span>
          <span className="type-body-sm text-heading">{step}</span>
          {index < BATCH_PROCESS_OVERVIEW_STEPS.length - 1 && (
            <span className="text-border hidden sm:inline" aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  </section>
);
