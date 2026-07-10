import { IMAGE_ALT } from '../seo/imageAlt';

type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className = '' }: BrandLogoProps) => (
  <img
    src="/brandsamor-neue-logo.png"
    alt={IMAGE_ALT.brandLogo}
    width={156}
    height={53}
    className={`h-auto w-[156px] ${className}`}
  />
);
