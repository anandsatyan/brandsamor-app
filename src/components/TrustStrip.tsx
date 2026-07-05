import { Star } from 'lucide-react';
import { BUSINESS_FACTS, COMMERCIAL_COPY, PACKAMOR_ABOUT_URL } from '../seo/businessFacts';
import { trackPackamorTrustLink } from '../analytics/siteAnalytics';

type Testimonial = {
  name: string;
  quote: string;
  role: string;
};

const trustProofPoints = [
  { value: `${BUSINESS_FACTS.brandsServed} brands served`, detail: 'Packamor packaging customers' },
  { value: `${BUSINESS_FACTS.customerRating} Packamor customer rating`, detail: 'Fragrance-packaging service' },
  { value: `${BUSINESS_FACTS.countriesShipped} countries shipped to`, detail: 'Packamor packaging orders' },
  { value: `${BUSINESS_FACTS.yearsOperating} years serving fragrance brands`, detail: 'Packamor operating history' },
  {
    value: 'Team presence across the US, India, China and the UAE',
    detail: 'Sourcing and coordination',
  },
] as const;

export const TrustStrip = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <section id="trust" className="py-12 sm:py-16">
    <div className="mb-8 sm:mb-10">
      <h4 className="text-accent text-sm uppercase tracking-widest font-semibold mb-4 flex items-center gap-4">
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        TRUST
      </h4>
      <h2 className="text-3xl sm:text-4xl text-heading mb-4">{COMMERCIAL_COPY.trustHeading}</h2>
      <p className="text-body leading-relaxed max-w-3xl">{COMMERCIAL_COPY.trustCopy}</p>
      <p className="mt-3 text-sm text-body/80 max-w-3xl">
        These figures reflect Packamor&apos;s fragrance-packaging business — not Brandsamor private-label
        manufacturing results.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
      {trustProofPoints.map((point) => (
        <div
          key={point.value}
          className="rounded-xl border border-border bg-secondary/50 px-5 py-4 sm:px-6 sm:py-5"
        >
          <div className="flex items-start gap-2 mb-1">
            {point.value.includes(BUSINESS_FACTS.customerRating) && (
              <div className="flex text-accent pt-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
            )}
            <p className="font-medium text-heading text-sm sm:text-base leading-snug">{point.value}</p>
          </div>
          <p className="text-xs text-body/80">{point.detail}</p>
        </div>
      ))}
    </div>

    <p className="mb-6">
      <a
        href={PACKAMOR_ABOUT_URL}
        className="inline-flex items-center text-sm font-semibold text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
        onClick={() => trackPackamorTrustLink('Learn about Packamor', PACKAMOR_ABOUT_URL)}
      >
        Learn about Packamor
      </a>
    </p>

    <div className="border-t border-border pt-8 sm:pt-10">
      <p className="text-sm sm:text-base text-body max-w-3xl mb-6 sm:mb-8 leading-relaxed">
        {COMMERCIAL_COPY.reviewsIntro}
      </p>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="bg-surface border border-border rounded-[10px] p-6 sm:p-8"
          >
            <p className="italic text-body text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
            <footer className="text-xs text-body">
              <span className="font-semibold text-heading">{t.name}</span>
              <span> · {t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);
