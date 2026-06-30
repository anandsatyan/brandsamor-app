import type { ReactNode } from 'react';
import { HeroMistEffect } from './HeroMistEffect';

const HERO_BLEED = '-mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12';

export const HeroPanel = ({
  children,
  className = '',
  id,
  layout = 'default',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  layout?: 'default' | 'viewport';
}) => {
  const isViewport = layout === 'viewport';

  return (
    <section
      id={id}
      className={[
        'hero-panel relative overflow-hidden bg-accent text-white',
        isViewport ? 'hero-panel--viewport w-full' : `min-h-[300px] sm:min-h-[320px] ${HERO_BLEED}`,
        className,
      ].join(' ')}
    >
      <img
        src="/hero-background.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />
      <HeroMistEffect />
      <div
        className={`relative z-[2] ${isViewport ? 'flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-6' : ''}`}
      >
        {children}
      </div>
    </section>
  );
};
