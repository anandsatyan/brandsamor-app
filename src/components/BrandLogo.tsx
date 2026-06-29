import { Heart } from 'lucide-react';
import { BRAND_GRADIENT_CLASS } from './brandGradient';

type BrandLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl',
};

const heartSizes = {
  sm: 7,
  md: 8,
  lg: 10,
} as const;

export const BrandLogo = ({ className = '', size = 'md' }: BrandLogoProps) => (
  <span
    className={`inline-flex items-start font-display font-bold tracking-tight leading-none ${sizeClasses[size]} ${className}`}
  >
    <span className={BRAND_GRADIENT_CLASS}>Brandsamo</span>
    <span className="relative inline-block leading-none">
      <span className={BRAND_GRADIENT_CLASS}>r</span>
      <Heart
        size={heartSizes[size]}
        className="absolute top-0 left-full -ml-[0.62em] text-accent fill-accent shrink-0 pointer-events-none"
        aria-hidden="true"
      />
    </span>
  </span>
);
