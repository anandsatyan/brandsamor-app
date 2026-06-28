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
  <section className="bg-[#2D302B] py-12 sm:py-24 text-white">
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid ${Illustration ? 'md:grid-cols-2' : ''} gap-10 md:gap-16 items-center`}
    >
      <div>
        <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6">{eyebrow}</h4>
        <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">{title}</h2>
        <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-md">{description}</p>
        <ComingSoonLabel variant="dark" />
        {footerText && <p className="text-sm text-white/60 mt-6">{footerText}</p>}
      </div>
      {Illustration && (
        <div className="rounded-xl overflow-hidden">
          <Illustration />
        </div>
      )}
    </div>
  </section>
);
