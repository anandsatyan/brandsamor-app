type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className = '' }: BrandLogoProps) => (
  <img
    src="/brandsamor-logo.png"
    alt="Brandsamor"
    width={125}
    height={25}
    className={`h-auto w-[125px] ${className}`}
  />
);
