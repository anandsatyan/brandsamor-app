import { Star } from 'lucide-react';

type Testimonial = {
  name: string;
  quote: string;
};

const trustStats = [
  { value: '4.8/5', label: 'Average customer rating' },
  { value: '4,000+', label: 'Brands served worldwide' },
  { value: '4 regions', label: 'Team presence across US, India, Dubai & China' },
] as const;

export const TrustStrip = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <section id="trust" className="py-10 sm:py-14 border-y border-[#f1ece0] bg-[#FFFDFC]/60">
    <div className="grid sm:grid-cols-3 gap-8 sm:gap-6 mb-10 sm:mb-12">
      {trustStats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            {stat.value === '4.8/5' && (
              <div className="flex text-[#A8BBBF]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            )}
            <p className="font-display text-2xl sm:text-3xl text-[#2D302B]">{stat.value}</p>
          </div>
          <p className="text-sm text-[#77736E]">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
      {testimonials.map((t) => (
        <blockquote
          key={t.name}
          className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-6 sm:p-8"
        >
          <p className="italic text-[#2D302B] text-sm leading-relaxed mb-4">"{t.quote}"</p>
          <footer className="text-xs text-[#77736E]">
            <span className="font-semibold text-[#2D302B]">{t.name}</span>
            <span> · Brandsamor customer</span>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);
