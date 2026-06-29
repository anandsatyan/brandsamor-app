import { Heart } from 'lucide-react';

type BrandLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl',
};

export const BrandLogo = ({ className = '', size = 'md' }: BrandLogoProps) => (
  <span className={`relative inline-flex items-start font-display font-bold tracking-tight leading-none ${sizeClasses[size]} ${className}`}>
    <span className="bg-gradient-to-r from-[rgb(255,92,0)] via-[#ff8f3f] to-[#ffd2a6] bg-clip-text text-transparent">
      Brandsamor
    </span>
    <Heart
      size={size === 'lg' ? 10 : 8}
      className="text-accent fill-accent -mt-0.5 ml-0.5 shrink-0"
      aria-hidden="true"
    />
  </span>
);
