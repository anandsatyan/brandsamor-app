type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className = '' }: BrandLogoProps) => (
  <img
    src="/brandsamor-logo.png"
    alt="Brandsamor"
    width={156}
    height={32}
    className={`h-auto w-[156px] ${className}`}
  />
);
