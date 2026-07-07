import { ComingSoonLabel } from '../ComingSoonLabel';
import type { IllustrationComponent } from './types';
import type { ReactNode } from 'react';

export const PageCtaSection = ({
  eyebrow,
  title,
  description,
  Illustration,
  footerText,
}: {
  eyebrow: string;
  title: string;
  description: string;
  Illustration?: IllustrationComponent;
  footerText?: ReactNode;
}) => (
  <section className="bg-heading py-12 sm:py-24 text-white">
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid ${Illustration ? 'md:grid-cols-2' : ''} gap-10 md:gap-16 items-center`}
    >
      <div>
        <h4 className="type-eyebrow mb-6">{eyebrow}</h4>
        <h2 className="type-h1 mb-6 text-white">{title}</h2>
        <p className="type-body-lg text-white/85 mb-8 sm:mb-10 max-w-md">{description}</p>
        <ComingSoonLabel variant="primary" />
        {footerText && <p className="type-body-sm text-white/65 mt-6">{footerText}</p>}
      </div>
      {Illustration && <Illustration />}
    </div>
  </section>
);
