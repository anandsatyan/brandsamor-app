import type { ReactNode } from 'react';
import { ComingSoonLabel } from '../ComingSoonLabel';
import { QuoteCtaGroup } from '../aeo/QuoteCtaGroup';
import { BodyCopy } from '../BodyCopy';
import { HeroPanel } from '../HeroPanel';

export const PageHero = ({
  badge,
  title,
  description,
  trackingLocation = 'topic_hero',
  dualCta = false,
  actions,
}: {
  badge: string;
  title: string;
  description: string;
  trackingLocation?: string;
  dualCta?: boolean;
  actions?: ReactNode;
}) => (
  <HeroPanel className="py-12 sm:py-16 mb-8 sm:mb-12 rounded-none sm:rounded-2xl text-center">
    <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 sm:space-y-8">
      <span className="inline-block px-3 py-1 bg-white/20 text-white type-caption font-semibold uppercase tracking-wider rounded-full border border-white/30">
        {badge}
      </span>
      <h1 className="type-h1 text-white">{title}</h1>
      <p className="type-body-lg max-w-2xl">
        <BodyCopy>{description}</BodyCopy>
      </p>
      {actions ? (
        actions
      ) : dualCta ? (
        <QuoteCtaGroup variant="hero" trackingLocation={trackingLocation} className="justify-center" />
      ) : (
        <ComingSoonLabel variant="hero" trackingLocation={trackingLocation} />
      )}
    </div>
  </HeroPanel>
);
