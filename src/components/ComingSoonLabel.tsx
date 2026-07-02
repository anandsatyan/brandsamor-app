import { Link } from 'react-router-dom';
import { LEAD_FORM_PATH } from '../routes/leadForm';

export const ComingSoonLabel = ({
  className = '',
  variant = 'primary',
  children = 'Start your project',
}: {
  className?: string;
  variant?: 'primary' | 'hero';
  children?: string;
}) => (
  <Link
    to={LEAD_FORM_PATH}
    className={`inline-flex items-center px-5 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg transition-opacity hover:opacity-90 ${
      variant === 'hero' ? 'btn-hero-cta' : 'btn-primary'
    } ${className}`}
  >
    {children}
  </Link>
);
