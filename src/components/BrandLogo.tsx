import { IMAGE_ALT } from '../seo/imageAlt';

type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className = '' }: BrandLogoProps) => (
  <img
    src="/brandsamor-neue-logo.png"
    alt={IMAGE_ALT.brandLogo}
    width={140}
    height={48}
    className={`h-auto w-[120px] sm:w-[140px] ${className}`}
  />
);
