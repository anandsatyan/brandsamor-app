export const ComingSoonLabel = ({
  className = '',
  variant = 'primary',
}: {
  className?: string;
  variant?: 'primary' | 'hero';
}) => (
  <span
    className={`inline-flex items-center px-5 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg ${
      variant === 'hero' ? 'btn-hero-cta' : 'btn-primary'
    } ${className}`}
  >
    Coming soon
  </span>
);
