import { ComingSoonLabel } from '../ComingSoonLabel';
import { QuoteCtaGroup } from '../aeo/QuoteCtaGroup';
import type { IllustrationComponent } from './types';
import type { ReactNode } from 'react';

export const PageCtaSection = ({
  eyebrow,
  title,
  description,
  Illustration,
  footerText,
  dualCta = false,
  actions,
  trackingLocation = 'topic_footer_cta',
}: {
  eyebrow: string;
  title: string;
  description: string;
  Illustration?: IllustrationComponent;
  footerText?: ReactNode;
  dualCta?: boolean;
  actions?: ReactNode;
  trackingLocation?: string;
}) => (
  <section className="bg-heading py-12 sm:py-24 text-white">
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid ${Illustration ? 'md:grid-cols-2' : ''} gap-10 md:gap-16 items-center`}
    >
      <div>
        <h4 className="type-eyebrow mb-6">{eyebrow}</h4>
        <h2 className="type-h1 mb-6 text-white">{title}</h2>
        <p className="type-body-lg text-white/85 mb-8 sm:mb-10 max-w-md">{description}</p>
        {actions ? (
          actions
        ) : dualCta ? (
          <QuoteCtaGroup variant="dark" trackingLocation={trackingLocation} />
        ) : (
          <ComingSoonLabel variant="primary" trackingLocation={trackingLocation} />
        )}
        {footerText && <p className="type-body-sm text-white/65 mt-6">{footerText}</p>}
      </div>
      {Illustration && <Illustration />}
    </div>
  </section>
);
