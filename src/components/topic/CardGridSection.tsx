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
      <h2 className="text-3xl sm:text-4xl mb-4">{title}</h2>
      {description && <p className="text-lg text-body">{description}</p>}
    </div>
    <div className={`grid sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''} gap-4 sm:gap-6`}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-secondary border border-border rounded-[10px] p-6 sm:p-8 flex flex-col h-full min-h-[180px] relative overflow-hidden"
        >
          {card.num && (
            <span className="absolute -bottom-4 -right-4 text-[80px] sm:text-[100px] font-display text-border opacity-50 leading-none pointer-events-none select-none">
              {card.num}
            </span>
          )}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-bold text-lg leading-tight">{card.title}</h3>
            {card.num && !card.num.startsWith('0') && (
              <span className="text-accent text-sm font-medium">{card.num}</span>
            )}
          </div>
          <p className="text-body text-sm relative z-10 mt-auto">{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);
