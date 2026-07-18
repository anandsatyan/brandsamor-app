import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ScentCard as ScentCardType } from '../types';

function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  if (!notes?.length) return null;
  return (
    <div>
      <p className="type-caption uppercase tracking-[0.12em] text-[var(--sampling-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm text-[var(--sampling-heading)]">{notes.join(' · ')}</p>
    </div>
  );
}

export function ScentCard({ card }: { card: ScentCardType }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left sm:px-5"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <p className="type-eyebrow">Current scent</p>
          <p className="mt-1 truncate font-serif text-phi-md text-[var(--sampling-heading)]">
            {card.workingName}
          </p>
          <p className="mt-0.5 text-sm text-[var(--sampling-muted)]">
            {card.primaryFamily.replace(/-/g, ' ')}
            {card.descriptors?.length ? ` · ${card.descriptors.slice(0, 3).join(', ')}` : ''}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-[2px] border border-[var(--sampling-border)] px-2 py-0.5 text-[11px] font-semibold text-[var(--sampling-heading)]">
            {card.status}
          </span>
          {open ? (
            <ChevronUp className="h-4 w-4 text-[var(--sampling-muted)]" aria-hidden />
          ) : (
            <ChevronDown className="h-4 w-4 text-[var(--sampling-muted)]" aria-hidden />
          )}
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-[var(--sampling-border)] px-4 py-4 sm:px-5">
          {card.oneSentenceConcept && (
            <p className="text-sm text-[var(--sampling-muted)]">{card.oneSentenceConcept}</p>
          )}
          {card.descriptors?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {card.descriptors.map((d) => (
                <span
                  key={d}
                  className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-cream)] px-2 py-0.5 text-xs text-[var(--sampling-heading)]"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-3">
            <NoteRow label="Top" notes={card.topNotes} />
            <NoteRow label="Heart" notes={card.heartNotes} />
            <NoteRow label="Base" notes={card.baseNotes} />
          </div>
          <p className="text-sm text-[var(--sampling-muted)]">{card.performanceDirection}</p>
        </div>
      )}
    </div>
  );
}
