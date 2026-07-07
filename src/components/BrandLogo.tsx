import { IMAGE_ALT } from '../seo/imageAlt';

type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className = '' }: BrandLogoProps) => (
  <img
    src="/brandsamor-logo.png"
    alt={IMAGE_ALT.brandLogo}
    width={156}
    height={32}
    className={`h-auto w-[156px] ${className}`}
  />
);
