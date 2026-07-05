import { BUSINESS_FACTS, COMMERCIAL_COPY } from '../seo/businessFacts';

const commercialFacts = [
  {
    label: 'Starting production order value',
    value: BUSINESS_FACTS.minimumProductionOrderValueLabel,
  },
  {
    label: 'Production timeline',
    value: BUSINESS_FACTS.productionTimeline,
  },
  {
    label: 'Sample dispatch',
    value: BUSINESS_FACTS.sampleDispatch,
  },
  {
    label: 'Service area',
    value: BUSINESS_FACTS.serviceArea,
  },
] as const;

export const CommercialFactsStrip = () => (
  <section
    id="commercial-facts"
    aria-label="Key commercial facts"
    className="py-8 sm:py-10 border-y border-border bg-secondary/40"
  >
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {commercialFacts.map((fact) => (
        <div key={fact.label}>
          <p className="text-xs uppercase tracking-wider text-body/80 mb-1">{fact.label}</p>
          <p className="font-display text-xl sm:text-2xl text-heading">{fact.value}</p>
        </div>
      ))}
    </div>
    <p className="mt-6 text-xs sm:text-sm text-body/80 max-w-4xl leading-relaxed">
      {COMMERCIAL_COPY.minimumOrderValue} {COMMERCIAL_COPY.productionTimeline}{' '}
      {COMMERCIAL_COPY.sampleDispatch}
    </p>
  </section>
);
