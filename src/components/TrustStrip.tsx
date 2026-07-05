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
      <h4 className="text-accent text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        TRUST
      </h4>
      <h2 className="text-3xl sm:text-4xl text-heading mb-4">{COMMERCIAL_COPY.trustHeading}</h2>
      <p className="text-base sm:text-lg text-body leading-relaxed mb-4">{COMMERCIAL_COPY.trustCopy}</p>
      <p>
        <a
          href={CUSTOMER_REVIEWS_URL}
          className="inline-flex items-center text-sm font-semibold text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
          onClick={() => trackPackamorTrustLink(COMMERCIAL_COPY.reviewsLinkLabel, CUSTOMER_REVIEWS_URL)}
        >
          {COMMERCIAL_COPY.reviewsLinkLabel}
        </a>
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
      {testimonials.map((t) => (
        <blockquote key={t.name} className="quote-accent">
          <p className="italic text-body text-sm sm:text-base leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
          <footer className="text-xs text-body">
            <span className="font-semibold text-heading">{t.name}</span>
            <span> · {t.role}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);
