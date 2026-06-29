import { Star } from 'lucide-react';

type Testimonial = {
  name: string;
  quote: string;
  role: string;
};

const trustStats = [
  { value: '4.8/5', label: 'Average customer rating' },
  { value: '4,000+', label: 'Brands served worldwide' },
  { value: '4 regions', label: 'Team presence across US, India, Dubai & China' },
] as const;

export const TrustStrip = ({
  intro,
  testimonials,
}: {
  intro?: string;
  testimonials: Testimonial[];
}) => (
  <section id="trust" className="py-10 sm:py-14 border-y border-border">
    <div className="grid sm:grid-cols-3 gap-8 sm:gap-6 mb-10 sm:mb-12">
      {trustStats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            {stat.value === '4.8/5' && (
              <div className="flex text-accent">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            )}
            <p className="font-display text-2xl sm:text-3xl text-heading">{stat.value}</p>
          </div>
          <p className="text-sm text-body">{stat.label}</p>
        </div>
      ))}
    </div>

    {intro && (
      <p className="text-sm sm:text-base text-body max-w-3xl mb-8 sm:mb-10 leading-relaxed">
        {intro}
      </p>
    )}

    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
      {testimonials.map((t) => (
        <blockquote
          key={t.name}
          className="bg-surface border border-border rounded-[10px] p-6 sm:p-8"
        >
          <p className="italic text-body text-sm leading-relaxed mb-4">"{t.quote}"</p>
          <footer className="text-xs text-body">
            <span className="font-semibold text-heading">{t.name}</span>
            <span> · {t.role}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);
