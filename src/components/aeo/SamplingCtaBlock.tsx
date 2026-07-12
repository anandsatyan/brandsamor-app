import { ComingSoonLabel } from '../ComingSoonLabel';
import { CURATED_SAMPLING_PATH, PRIMARY_CTA_LABEL } from '../../routes/leadForm';
import { trackComingSoonCta } from '../../analytics/siteAnalytics';
import { Link } from 'react-router-dom';

/** Mid-page sampling CTA used on commercial / new money pages. */
export const SamplingCtaBlock = ({
  trackingLocation = 'sampling_cta_block',
  title = 'Start with curated fragrance sampling',
  description = 'Tell Brandsamor about your brand and customers. We curate five fragrances for you to evaluate before bottle, packaging and production decisions.',
}: {
  trackingLocation?: string;
  title?: string;
  description?: string;
}) => (
  <section className="py-10 sm:py-14 border-t border-border scroll-mt-28">
    <div className="max-w-3xl">
      <h2 className="type-h2-sm mb-3">{title}</h2>
      <p className="type-body mb-6">{description}</p>
      <div className="flex flex-wrap gap-3">
        <ComingSoonLabel trackingLocation={trackingLocation}>{PRIMARY_CTA_LABEL}</ComingSoonLabel>
        <Link
          to={CURATED_SAMPLING_PATH}
          onClick={() => trackComingSoonCta(`${trackingLocation}_text`)}
          className="inline-flex items-center type-body font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
        >
          Open the curated sampling brief
        </Link>
      </div>
    </div>
  </section>
);
