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
    <h2 className="type-h2 mb-8 sm:mb-12 max-w-2xl">{title}</h2>
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
      <div className="surface-soft p-6 sm:p-8">
        <h3 className="type-h3 mb-6 text-heading">{leftTitle}</h3>
        <ul className="space-y-4">
          {leftItems.map((item) => (
            <li key={item} className="flex gap-3 type-body-sm">
              <Check className="text-accent shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`rounded-2xl p-6 sm:p-8 surface-dark ${
          rightDark
            ? 'bg-heading text-white'
            : 'surface-soft'
        }`}
      >
        <h3 className={`type-h3 mb-6 ${rightDark ? 'text-white' : 'text-heading'}`}>{rightTitle}</h3>
        <ul className="space-y-4">
          {rightItems.map((item) => (
            <li
              key={item}
              className={`flex gap-3 type-body-sm ${rightDark ? 'text-white/80' : ''}`}
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
