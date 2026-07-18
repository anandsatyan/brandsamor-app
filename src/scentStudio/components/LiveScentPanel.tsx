import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ScentCard } from '../types';

function AttributeBar({ label, value }: { label: string; value: number | null | undefined }) {
  if (value == null) return null;
  const pct = Math.max(0, Math.min(100, value * 10));
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="type-caption text-[var(--sampling-muted)]">{label}</span>
        <span className="type-caption text-[var(--sampling-heading)]">{value}/10</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-[2px] bg-[var(--sampling-border)]">
        <div
          className="h-full rounded-[2px] bg-[var(--sampling-orange)] transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function NoteLine({ label, notes }: { label: string; notes: string[] }) {
  if (!notes?.length) return null;
  return (
    <div>
      <p className="type-caption uppercase tracking-[0.12em] text-[var(--sampling-muted)]">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--sampling-heading)]">
        {notes.join(' · ')}
      </p>
    </div>
  );
}

export function LiveScentPanel({
  card,
  collapsedDefault = false,
}: {
  card: ScentCard;
  collapsedDefault?: boolean;
}) {
  const [open, setOpen] = useState(!collapsedDefault);
  const attrs = card.attributes || {};
  const direction = [card.primaryFamily?.replace(/-/g, ' '), ...(card.descriptors || []).slice(0, 3)]
    .filter(Boolean)
    .join(' · ');

  return (
    <section
      className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)]"
      aria-label="Your scent so far"
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left sm:px-5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="min-w-0">
          <p className="type-eyebrow">Your scent so far</p>
          <p className="mt-1 truncate font-serif text-phi-md text-[var(--sampling-heading)]">
            {card.workingName}
          </p>
          <p className="mt-0.5 truncate text-sm capitalize text-[var(--sampling-muted)]">{direction}</p>
        </div>
        {open ? (
          <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-[var(--sampling-muted)]" />
        ) : (
          <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--sampling-muted)]" />
        )}
      </button>

      {open && (
        <div className="space-y-4 border-t border-[var(--sampling-border)] px-4 py-4 sm:px-5">
          {card.oneSentenceConcept && (
            <p className="text-sm leading-relaxed text-[var(--sampling-muted)]">
              {card.oneSentenceConcept}
            </p>
          )}

          {card.recentChanges && card.recentChanges.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-live="polite">
              {card.recentChanges.map((change) => (
                <li
                  key={change}
                  className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-cream)] px-2 py-0.5 text-[11px] font-semibold text-[var(--sampling-heading)]"
                >
                  {change}
                </li>
              ))}
            </ul>
          )}

          <div className="grid gap-3">
            <NoteLine label="Top notes" notes={card.topNotes} />
            <NoteLine label="Heart notes" notes={card.heartNotes} />
            <NoteLine label="Base notes" notes={card.baseNotes} />
          </div>

          <div className="grid gap-2.5">
            <AttributeBar label="Freshness" value={attrs.freshness} />
            <AttributeBar label="Sweetness" value={attrs.sweetness} />
            <AttributeBar label="Warmth" value={attrs.warmth} />
            <AttributeBar label="Woodiness" value={attrs.woodiness} />
            <AttributeBar label="Floral" value={attrs.floral} />
            <AttributeBar label="Projection" value={attrs.projection} />
            <AttributeBar label="Longevity" value={attrs.longevity} />
            <AttributeBar label="Distinctiveness" value={attrs.distinctiveness} />
          </div>

          {(card.intendedAudience || card.intendedUse?.length) && (
            <div className="space-y-2 text-sm">
              {card.intendedAudience && (
                <p>
                  <span className="text-[var(--sampling-muted)]">Audience · </span>
                  <span className="text-[var(--sampling-heading)]">{card.intendedAudience}</span>
                </p>
              )}
              {card.intendedUse && card.intendedUse.length > 0 && (
                <p>
                  <span className="text-[var(--sampling-muted)]">Use · </span>
                  <span className="text-[var(--sampling-heading)]">{card.intendedUse.join(' · ')}</span>
                </p>
              )}
            </div>
          )}

          <p className="type-caption text-[var(--sampling-muted)]">
            Directional indicators only — not laboratory measurements. Status: {card.status}
          </p>
        </div>
      )}
    </section>
  );
}
