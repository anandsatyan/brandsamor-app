import type { ReactNode } from 'react';

const HERO_BLEED = '-mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12';

export const HeroPanel = ({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <section
    id={id}
    className={`hero-panel relative overflow-hidden bg-accent text-white min-h-[300px] sm:min-h-[320px] ${HERO_BLEED} ${className}`}
  >
    <img
      src="/hero-background.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      fetchPriority="high"
      decoding="async"
    />
    <div className="hero-panel__noise pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
    <div className="relative z-[2]">{children}</div>
  </section>
);
