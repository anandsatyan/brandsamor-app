import { Check } from 'lucide-react';
import { SectionEyebrow } from './SectionEyebrow';

export const SplitPanelSection = ({
  eyebrow,
  title,
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  rightDark = true,
}: {
  eyebrow?: string;
  title: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
  rightDark?: boolean;
}) => (
  <section className="py-12 sm:py-24 border-t border-border">
    {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
    <h2 className="text-3xl sm:text-4xl mb-8 sm:mb-12 max-w-2xl">{title}</h2>
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
      <div className="bg-secondary border border-border rounded-[10px] p-6 sm:p-8">
        <h3 className="font-display text-xl sm:text-2xl mb-6">{leftTitle}</h3>
        <ul className="space-y-4">
          {leftItems.map((item) => (
            <li key={item} className="flex gap-3 text-sm sm:text-base text-body">
              <Check className="text-accent shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`rounded-[10px] p-6 sm:p-8 border ${
          rightDark
            ? 'bg-heading text-white border-heading'
            : 'bg-secondary border-border'
        }`}
      >
        <h3 className="font-display text-xl sm:text-2xl mb-6">{rightTitle}</h3>
        <ul className="space-y-4">
          {rightItems.map((item) => (
            <li
              key={item}
              className={`flex gap-3 text-sm sm:text-base ${rightDark ? 'text-white/80' : 'text-body'}`}
            >
              <Check className="text-accent shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
