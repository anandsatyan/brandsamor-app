import { Globe, Clock, Sparkles, Star, Truck } from 'lucide-react';
import { BUSINESS_FACTS, COMMERCIAL_COPY } from '../seo/businessFacts';
import { ORGANIZATION } from '../seo/siteConfig';

const primaryStats = [
  {
    icon: Sparkles,
    label: COMMERCIAL_COPY.startingPathLabel,
    value: COMMERCIAL_COPY.startingPathValue,
    detail: COMMERCIAL_COPY.startingPathDetail,
  },
  {
    icon: Clock,
    label: 'Production timeline',
    value: BUSINESS_FACTS.productionTimeline,
    detail: COMMERCIAL_COPY.productionTimeline,
  },
  {
    icon: Truck,
    label: 'Sample dispatch',
    value: BUSINESS_FACTS.sampleDispatch,
    detail: `${COMMERCIAL_COPY.sampleDispatch} ${COMMERCIAL_COPY.sampleDeliveryNote}`,
  },
  {
    icon: Globe,
    label: 'Service area',
    value: BUSINESS_FACTS.serviceArea,
    detail: COMMERCIAL_COPY.worldwideService,
  },
] as const;

const heritageFacts = [
  { label: 'Brands served', value: `${BUSINESS_FACTS.brandsServed} brands` },
  { label: 'Customer rating', value: BUSINESS_FACTS.customerRating, showStars: true },
  { label: 'Countries shipped to', value: `${BUSINESS_FACTS.countriesShipped} countries` },
  { label: 'Years serving fragrance brands', value: `${BUSINESS_FACTS.yearsOperating} years` },
] as const;

const operationalFacts = [
  { label: 'Operated by', value: ORGANIZATION.legalName },
  { label: 'Team presence', value: `Across ${BUSINESS_FACTS.teamRegions}` },
  {
    label: 'Coordinated for you',
    value: 'Packaging, filling and quality checks',
  },
] as const;

export const HomeFactsBento = () => (
  <section
    id="at-a-glance"
    aria-labelledby="at-a-glance-heading"
    className="py-12 sm:py-24 border-t border-border"
  >
    <div id="commercial-facts" className="sr-only" aria-hidden="true">
      {COMMERCIAL_COPY.startingPathDetail} {COMMERCIAL_COPY.productionTimeline}{' '}
      {COMMERCIAL_COPY.sampleDispatch}
    </div>

    <div className="mb-10 sm:mb-14 max-w-3xl">
      <h4 className="type-eyebrow mb-6 flex items-center gap-4">
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        AT A GLANCE
      </h4>
      <h2 id="at-a-glance-heading" className="type-h2 mb-4">
        Brandsamor at a Glance
      </h2>
      <p className="type-body-lg mb-6">
        {COMMERCIAL_COPY.brandIntro}
      </p>
      <p className="type-body-sm">
        {COMMERCIAL_COPY.suitabilityNote} {COMMERCIAL_COPY.formatMinimumNote}
      </p>
    </div>

    <div className="surface-soft p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border/60">
        {primaryStats.map((stat) => (
          <article key={stat.label} className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <stat.icon size={18} className="mb-3 text-accent/90" aria-hidden="true" />
            <p className="type-caption uppercase tracking-wider text-body/80 mb-2">{stat.label}</p>
            <p className="type-h2 mb-3">{stat.value}</p>
            <p className="type-body-sm">{stat.detail}</p>
          </article>
        ))}
      </div>
    </div>

    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
      {operationalFacts.map((fact) => (
        <div key={fact.label}>
          <dt className="type-caption uppercase tracking-wider text-body/80 mb-1.5">{fact.label}</dt>
          <dd className="type-body-sm font-medium text-heading leading-snug">{fact.value}</dd>
        </div>
      ))}
    </dl>

    <div>
      <p className="type-caption uppercase tracking-wider text-body/80 mb-5">Brandsamor by the numbers</p>
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {heritageFacts.map((fact) => (
          <div key={fact.label}>
            <dt className="type-caption uppercase tracking-wider text-body/80 mb-1.5">{fact.label}</dt>
            <dd className="flex items-center gap-2 type-h4 leading-snug">
              {'showStars' in fact && fact.showStars && (
                <span className="flex text-accent" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </span>
              )}
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
