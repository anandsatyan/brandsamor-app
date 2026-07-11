import { Link } from 'react-router-dom';
import { CURATED_SAMPLING_PATH, LEAD_FORM_PATH, PRIMARY_CTA_LABEL } from '../../routes/leadForm';
import { trackComingSoonCta } from '../../analytics/siteAnalytics';

export const SECONDARY_CTA_LABEL = 'Request a quote';

export const QuoteCtaGroup = ({
  trackingLocation = 'quote_cta',
  variant = 'light',
  className = '',
}: {
  trackingLocation?: string;
  variant?: 'light' | 'dark' | 'hero';
  className?: string;
}) => {
  const primaryClass =
    variant === 'hero' ? 'btn-hero-cta' : variant === 'dark' ? 'btn-primary' : 'btn-primary';
  const secondaryClass =
    variant === 'hero'
      ? 'inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider border border-white/40 text-white hover:bg-white/10 transition-colors rounded-[2px]'
      : variant === 'dark'
        ? 'inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider border border-white/40 text-white hover:bg-white/10 transition-colors rounded-[2px]'
        : 'inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider border border-heading/20 text-heading hover:bg-secondary transition-colors rounded-[2px]';

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link
        to={CURATED_SAMPLING_PATH}
        onClick={() => trackComingSoonCta(`${trackingLocation}_sampling`)}
        className={primaryClass}
      >
        {PRIMARY_CTA_LABEL}
      </Link>
      <Link
        to={LEAD_FORM_PATH}
        onClick={() => trackComingSoonCta(`${trackingLocation}_quote`)}
        className={secondaryClass}
      >
        {SECONDARY_CTA_LABEL}
      </Link>
    </div>
  );
};
