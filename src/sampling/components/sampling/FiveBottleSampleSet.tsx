import { IMAGE_ALT } from '../../../seo/imageAlt';

type FiveBottleSampleSetProps = {
  className?: string;
  /** Max width utility classes for the image container */
  size?: 'sm' | 'md' | 'lg';
};

const sizeClass = {
  sm: 'max-w-[14rem] sm:max-w-[16.8rem]', // ~70% of md
  md: 'max-w-xs sm:max-w-sm',
  lg: 'max-w-sm sm:max-w-md',
};

/** Shared five-bottle curated sample set artwork. */
export const FiveBottleSampleSet = ({ className = '', size = 'md' }: FiveBottleSampleSetProps) => (
  <div className={`mx-auto w-full ${sizeClass[size]} ${className}`.trim()}>
    <img
      src="/five-bottle-sample-set.png"
      alt={IMAGE_ALT.homepage.sampleKit}
      width={640}
      height={360}
      className="h-auto w-full object-contain"
      decoding="async"
    />
  </div>
);
