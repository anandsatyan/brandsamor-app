import type { ScentCard } from '../types';

function Attr({ label, value }: { label: string; value?: number | null }) {
  if (value == null) return null;
  return (
    <li className="flex justify-between gap-3 text-sm">
      <span className="text-[var(--sampling-muted)]">{label}</span>
      <span className="text-[var(--sampling-heading)]">{value}/10</span>
    </li>
  );
}

export function FinalConceptReview({
  card,
  onRefine,
  onRequestSamples,
}: {
  card: ScentCard;
  onRefine: () => void;
  onRequestSamples: () => void;
}) {
  const attrs = card.attributes || {};

  return (
    <section className="scent-brief-print rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-4 py-5 sm:px-6">
      <p className="type-eyebrow">Final scent concept</p>
      <h2 className="mt-2 font-serif text-phi-xl text-[var(--sampling-heading)]">{card.workingName}</h2>
      {card.oneSentenceConcept && (
        <p className="mt-3 text-sm leading-relaxed text-[var(--sampling-muted)]">
          {card.oneSentenceConcept}
        </p>
      )}

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--sampling-muted)]">Scent family</dt>
          <dd className="mt-1 capitalize text-[var(--sampling-heading)]">
            {card.primaryFamily.replace(/-/g, ' ')}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--sampling-muted)]">Development status</dt>
          <dd className="mt-1 text-[var(--sampling-heading)]">
            Concept ready for formulation review
          </dd>
        </div>
        {card.intendedAudience && (
          <div className="sm:col-span-2">
            <dt className="text-[var(--sampling-muted)]">Intended customer</dt>
            <dd className="mt-1 text-[var(--sampling-heading)]">{card.intendedAudience}</dd>
          </div>
        )}
        {card.productFormat && (
          <div>
            <dt className="text-[var(--sampling-muted)]">Product format</dt>
            <dd className="mt-1 capitalize text-[var(--sampling-heading)]">{card.productFormat}</dd>
          </div>
        )}
        {card.genderPositioning && (
          <div>
            <dt className="text-[var(--sampling-muted)]">Gender expression</dt>
            <dd className="mt-1 capitalize text-[var(--sampling-heading)]">{card.genderPositioning}</dd>
          </div>
        )}
        {card.intendedUse && card.intendedUse.length > 0 && (
          <div className="sm:col-span-2">
            <dt className="text-[var(--sampling-muted)]">Occasion / use</dt>
            <dd className="mt-1 text-[var(--sampling-heading)]">{card.intendedUse.join(' · ')}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 grid gap-3 text-sm">
        <p>
          <span className="font-semibold text-[var(--sampling-heading)]">Top · </span>
          {card.topNotes.join(' · ') || '—'}
        </p>
        <p>
          <span className="font-semibold text-[var(--sampling-heading)]">Heart · </span>
          {card.heartNotes.join(' · ') || '—'}
        </p>
        <p>
          <span className="font-semibold text-[var(--sampling-heading)]">Base · </span>
          {card.baseNotes.join(' · ') || '—'}
        </p>
        <p className="text-[var(--sampling-muted)]">{card.performanceDirection}</p>
      </div>

      {(attrs.freshness != null ||
        attrs.sweetness != null ||
        attrs.warmth != null ||
        attrs.projection != null) && (
        <ul className="mt-5 space-y-1.5 border-t border-[var(--sampling-border)] pt-4">
          <Attr label="Freshness" value={attrs.freshness} />
          <Attr label="Sweetness" value={attrs.sweetness} />
          <Attr label="Warmth" value={attrs.warmth} />
          <Attr label="Projection" value={attrs.projection} />
          <Attr label="Longevity" value={attrs.longevity} />
          <Attr label="Distinctiveness" value={attrs.distinctiveness} />
        </ul>
      )}

      {card.referenceSummary?.name && (
        <div className="mt-4 text-sm text-[var(--sampling-muted)]">
          <p>
            Reference starting point:{' '}
            <span className="text-[var(--sampling-heading)]">
              {[card.referenceSummary.brand, card.referenceSummary.name].filter(Boolean).join(' ')}
            </span>
            . This is an inspired direction, not an exact copy.
          </p>
          {card.referenceSummary.transformationSummary && (
            <p className="mt-2 text-[var(--sampling-heading)]">
              {card.referenceSummary.transformationSummary}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button type="button" className="btn-primary" onClick={onRequestSamples}>
          Request formulation and samples
        </button>
        <button
          type="button"
          onClick={onRefine}
          className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
        >
          Refine this scent
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
        >
          Print / share brief
        </button>
      </div>
    </section>
  );
}
