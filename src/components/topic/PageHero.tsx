import { Breadcrumbs } from '../Breadcrumbs';
import { ComingSoonLabel } from '../ComingSoonLabel';
import type { IllustrationComponent } from './types';

export const PageHero = ({
  badge,
  title,
  description,
  Illustration,
  breadcrumbLabel,
}: {
  badge: string;
  title: string;
  description: string;
  Illustration: IllustrationComponent;
  breadcrumbLabel: string;
}) => (
  <section className="hero-panel -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12 py-12 sm:py-16 mb-8 sm:mb-12 rounded-none sm:rounded-2xl grid md:grid-cols-2 gap-8 md:gap-12 items-center">
    <div className="space-y-6 sm:space-y-8">
      <Breadcrumbs
        variant="hero"
        items={[
          { label: 'Home', to: '/' },
          { label: breadcrumbLabel },
        ]}
      />
      <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-full border border-white/30">
        {badge}
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight text-white">{title}</h1>
      <p className="text-base sm:text-lg max-w-lg leading-relaxed">{description}</p>
      <ComingSoonLabel variant="hero" />
    </div>
    <div className="relative rounded-xl overflow-hidden w-full max-w-lg mx-auto md:mx-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <Illustration />
    </div>
  </section>
);
