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
  <section className="py-10 sm:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
    <div className="space-y-6 sm:space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: breadcrumbLabel },
        ]}
      />
      <span className="inline-block px-3 py-1 bg-[#E7DED2] text-[#2D302B] text-xs font-semibold uppercase tracking-wider rounded-full">
        {badge}
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h1>
      <p className="text-base sm:text-lg text-[#2D302B] max-w-lg leading-relaxed">{description}</p>
      <ComingSoonLabel />
    </div>
    <div className="relative rounded-xl overflow-hidden w-full max-w-lg mx-auto md:mx-0">
      <Illustration />
    </div>
  </section>
);
