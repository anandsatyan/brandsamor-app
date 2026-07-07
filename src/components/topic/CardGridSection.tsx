import { SectionEyebrow } from './SectionEyebrow';
import type { CardItem } from './types';

export const CardGridSection = ({
  id,
  eyebrow,
  title,
  description,
  cards,
  columns = 3,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  cards: CardItem[];
  columns?: 2 | 3;
}) => (
  <section id={id} className="py-12 sm:py-24 border-t border-border">
    {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
    <div className="max-w-2xl mb-8 sm:mb-12">
      <h2 className="type-h2 mb-4">{title}</h2>
      {description && <p className="type-body-lg">{description}</p>}
    </div>
    <div className={`grid sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''} gap-4 sm:gap-6`}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="surface-soft p-6 sm:p-8 flex flex-col h-full min-h-[180px] relative overflow-hidden"
        >
          {card.num && (
            <span className="type-display-watermark">
              {card.num}
            </span>
          )}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="type-h3 leading-tight">{card.title}</h3>
            {card.num && !card.num.startsWith('0') && (
              <span className="text-accent type-body-sm font-medium">{card.num}</span>
            )}
          </div>
          <p className="type-body-sm relative z-10 mt-auto">{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);
