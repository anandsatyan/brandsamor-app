import { Link } from 'react-router-dom';

export const SectionLinkButton = ({
  to,
  children,
  variant = 'primary',
}: {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'hero';
}) => (
  <Link
    to={to}
    className={variant === 'hero' ? 'btn-hero-cta' : 'btn-primary'}
  >
    {children}
  </Link>
);
