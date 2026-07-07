import { Link } from 'react-router-dom';
import { LEAD_FORM_PATH } from '../routes/leadForm';
import { trackComingSoonCta } from '../analytics/siteAnalytics';

export const ComingSoonLabel = ({
  className = '',
  variant = 'primary',
  children = 'Start your project',
  trackingLocation = 'unspecified',
}: {
  className?: string;
  variant?: 'primary' | 'hero';
  children?: string;
  trackingLocation?: string;
}) => (
  <Link
    to={LEAD_FORM_PATH}
    onClick={() => trackComingSoonCta(trackingLocation)}
    className={`inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider transition-opacity hover:opacity-90 ${
      variant === 'hero' ? 'btn-hero-cta' : 'btn-primary'
    } ${className}`}
  >
    {children}
  </Link>
);
