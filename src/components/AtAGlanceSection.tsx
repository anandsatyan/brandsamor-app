import { BUSINESS_FACTS, COMMERCIAL_COPY, PACKAMOR_URL } from '../seo/businessFacts';
import { ORGANIZATION } from '../seo/siteConfig';

const glanceFacts = [
  { label: 'Operated by', value: ORGANIZATION.legalName },
  { label: 'Built on experience serving', value: `${BUSINESS_FACTS.brandsServed} brands` },
  { label: 'Packamor customer rating', value: `${BUSINESS_FACTS.customerRating}` },
  { label: 'Packamor shipments to', value: `${BUSINESS_FACTS.countriesShipped} countries` },
  { label: 'Minimum production order value', value: `From ${BUSINESS_FACTS.minimumProductionOrderValueLabel}` },
  { label: 'Typical production timeline', value: BUSINESS_FACTS.productionTimeline },
  { label: 'Sample dispatch', value: `In ${BUSINESS_FACTS.sampleDispatch}` },
  { label: 'Service area', value: BUSINESS_FACTS.serviceArea },
  {
    label: 'Coordinated for you',
    value: 'Packaging, filling and quality checks',
  },
] as const;

export const AtAGlanceSection = () => (
  <section id="at-a-glance" className="py-12 sm:py-16 border-t border-border">
    <div className="mb-8 sm:mb-10 max-w-3xl">
      <h4 className="text-accent text-sm uppercase tracking-widest font-semibold mb-4 flex items-center gap-4">
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        AT A GLANCE
      </h4>
      <h2 className="text-3xl sm:text-4xl text-heading mb-4">Brandsamor at a Glance</h2>
      <p className="text-body leading-relaxed">
        {COMMERCIAL_COPY.packamorDistinction.split('Packamor').map((part, index, parts) =>
          index < parts.length - 1 ? (
            <span key={index}>
              {part}
              <a
                href={PACKAMOR_URL}
                className="font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
              >
                Packamor
              </a>
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </p>
    </div>

    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
      {glanceFacts.map((fact) => (
        <div key={fact.label} className="bg-secondary/50 px-5 py-4 sm:px-6 sm:py-5">
          <dt className="text-xs uppercase tracking-wider text-body/80 mb-1.5">{fact.label}</dt>
          <dd className="text-sm sm:text-base font-medium text-heading leading-snug">{fact.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
