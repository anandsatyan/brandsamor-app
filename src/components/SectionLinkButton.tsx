import { Link } from 'react-router-dom';

export const SectionLinkButton = ({
  to,
  children,
  variant = 'primary',
}: {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'hero';
}) => (
  <Link
    to={to}
    className={
      variant === 'hero' ? 'btn-hero-cta' : variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
    }
  >
    {children}
  </Link>
);
