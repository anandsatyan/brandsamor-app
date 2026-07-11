import { Link } from 'react-router-dom';
import { CURATED_SAMPLING_PATH, PRIMARY_CTA_LABEL } from '../routes/leadForm';
import { trackComingSoonCta } from '../analytics/siteAnalytics';

export const ComingSoonLabel = ({
  className = '',
  variant = 'primary',
  children = PRIMARY_CTA_LABEL,
  trackingLocation = 'unspecified',
}: {
  className?: string;
  variant?: 'primary' | 'hero';
  children?: string;
  trackingLocation?: string;
}) => (
  <Link
    to={CURATED_SAMPLING_PATH}
    onClick={() => trackComingSoonCta(trackingLocation)}
    className={`inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider transition-opacity hover:opacity-90 ${
      variant === 'hero' ? 'btn-hero-cta' : 'btn-primary'
    } ${className}`}
  >
    {children}
  </Link>
);
