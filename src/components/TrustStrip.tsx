import { COMMERCIAL_COPY, CUSTOMER_REVIEWS_URL } from '../seo/businessFacts';
import { trackPackamorTrustLink } from '../analytics/siteAnalytics';

type Testimonial = {
  name: string;
  quote: string;
  role: string;
};

export const TrustStrip = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <section id="trust" className="py-12 sm:py-24 border-t border-border">
    <div className="mb-8 sm:mb-10 max-w-3xl">
      <h4 className="type-eyebrow mb-6 flex items-center gap-4">
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        TRUST
      </h4>
      <h2 className="type-h2 mb-4">{COMMERCIAL_COPY.trustHeading}</h2>
      <p className="type-body-lg mb-4">{COMMERCIAL_COPY.trustCopy}</p>
      <p>
        <a
          href={CUSTOMER_REVIEWS_URL}
          className="inline-flex items-center type-body-sm font-semibold text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
          onClick={() => trackPackamorTrustLink(COMMERCIAL_COPY.reviewsLinkLabel, CUSTOMER_REVIEWS_URL)}
        >
          {COMMERCIAL_COPY.reviewsLinkLabel}
        </a>
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
      {testimonials.map((t) => (
        <blockquote key={t.name} className="quote-accent">
          <p className="italic type-body-sm mb-4">&ldquo;{t.quote}&rdquo;</p>
          <footer className="type-caption">
            <span className="font-semibold text-heading">{t.name}</span>
            <span> · {t.role}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);
