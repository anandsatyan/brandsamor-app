const HERO_SERVICES = [
  'Fragrance Sampling',
  'Scent Selection',
  'Bottle & Cap Selection',
  'Packaging Design',
  'Label Application',
  'Bottle Printing',
  'Screen Printing',
  'Filling',
  'Crimping & Assembly',
  'Labelling',
  'Boxing',
  'Quality Checks',
  'Batch Documentation',
  'Worldwide Delivery',
] as const;

/** Sixteen-point star separator — distinct from a classic five-point star. */
const StarSeparator = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="shrink-0 text-accent/80"
    aria-hidden="true"
  >
    <path d="M8.00 0.50 L8.78 4.08 L10.87 1.07 L10.22 4.67 L13.30 2.70 L11.33 5.78 L14.93 5.13 L11.92 7.22 L15.50 8.00 L11.92 8.78 L14.93 10.87 L11.33 10.22 L13.30 13.30 L10.22 11.33 L10.87 14.93 L8.78 11.92 L8.00 15.50 L7.22 11.92 L5.13 14.93 L5.78 11.33 L2.70 13.30 L4.67 10.22 L1.07 10.87 L4.08 8.78 L0.50 8.00 L4.08 7.22 L1.07 5.13 L4.67 5.78 L2.70 2.70 L5.78 4.67 L5.13 1.07 L7.22 4.08 Z" />
  </svg>
);

const ServiceItem = ({ label }: { label: string }) => (
  <span className="flex shrink-0 items-center gap-phi-4 px-phi-4 sm:gap-phi-5 sm:px-phi-5">
    <span className="font-serif text-phi-lg sm:text-phi-xl whitespace-nowrap font-normal tracking-wide text-white/92">
      {label}
    </span>
    <StarSeparator />
  </span>
);

export const HeroServicesTicker = () => {
  const track = [...HERO_SERVICES, ...HERO_SERVICES];

  return (
    <div
      className="hero-services-ticker relative w-full border-t border-white/10 bg-[#010100]"
      aria-label="Brandsamor private label fragrance services"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-phi-6 bg-gradient-to-r from-[#010100] to-transparent sm:w-phi-5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-phi-6 bg-gradient-to-l from-[#010100] to-transparent sm:w-phi-5"
        aria-hidden="true"
      />

      <div className="hero-services-ticker__viewport overflow-hidden py-phi-1 sm:py-phi-2">
        <div className="hero-services-ticker__track flex w-max items-center" aria-hidden="true">
          {track.map((label, index) => (
            <ServiceItem key={`${label}-${index}`} label={label} />
          ))}
        </div>

        <ul className="hidden flex-wrap items-center justify-center gap-x-phi-3 gap-y-phi-3 px-phi-3 list-none m-0 p-0 motion-reduce:flex">
          {HERO_SERVICES.map((label) => (
            <li key={label} className="flex items-center gap-phi-3">
              <span className="font-serif text-phi-lg sm:text-phi-xl tracking-wide text-white/92">
                {label}
              </span>
              <StarSeparator />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
