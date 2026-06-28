export const ComingSoonLabel = ({
  className = '',
  variant = 'light',
}: {
  className?: string;
  variant?: 'light' | 'dark';
}) => (
  <span
    className={`inline-flex items-center px-5 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg ${
      variant === 'dark'
        ? 'bg-white/10 text-white/90 border border-white/20'
        : 'bg-[#E7DED2] text-[#2D302B]'
    } ${className}`}
  >
    Coming soon
  </span>
);
