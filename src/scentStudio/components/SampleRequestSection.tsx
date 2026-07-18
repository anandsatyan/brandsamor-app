import { BUSINESS_FACTS, COMMERCIAL_COPY } from '../../seo/businessFacts';

export function SampleRequestSection({
  onContinue,
  onSaveLater,
}: {
  onContinue: () => void;
  onSaveLater: () => void;
}) {
  return (
    <section className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-4 py-5 sm:px-6">
      <p className="type-eyebrow">What happens next</p>
      <h2 className="mt-2 font-serif text-phi-lg text-[var(--sampling-heading)]">
        Turn this direction into physical samples
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sampling-muted)]">
        Brandsamor will review the scent direction for manufacturability, develop suitable formula
        options and prepare samples for your evaluation before production.
      </p>

      <ol className="mt-5 space-y-2 text-sm text-[var(--sampling-heading)]">
        <li>1. We review your scent direction.</li>
        <li>2. We assess materials, feasibility and commercial requirements.</li>
        <li>3. We develop suitable formulation directions.</li>
        <li>4. We prepare physical samples.</li>
        <li>5. You test and provide feedback.</li>
        <li>6. Production begins only after approval.</li>
      </ol>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--sampling-muted)]">What happens after you request</dt>
          <dd className="mt-1 text-[var(--sampling-heading)]">
            Brandsamor reviews your custom scent direction for manufacturability, then prepares
            physical samples for evaluation before production.
          </dd>
        </div>
        <div>
          <dt className="text-[var(--sampling-muted)]">Dispatch</dt>
          <dd className="mt-1 text-[var(--sampling-heading)]">{COMMERCIAL_COPY.sampleDispatch}</dd>
        </div>
        <div>
          <dt className="text-[var(--sampling-muted)]">Production MOQ</dt>
          <dd className="mt-1 text-[var(--sampling-heading)]">
            From {BUSINESS_FACTS.minimumOrderQuantity} units after approvals
          </dd>
        </div>
        <div>
          <dt className="text-[var(--sampling-muted)]">Production timeline</dt>
          <dd className="mt-1 text-[var(--sampling-heading)]">{COMMERCIAL_COPY.productionTimeline}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-[var(--sampling-muted)]">Development status</dt>
          <dd className="mt-1 text-[var(--sampling-heading)]">
            Concept ready for formulation review — not a finished production formula
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
        <button type="button" className="btn-primary" onClick={onContinue}>
          Request formulation and samples
        </button>
        <button
          type="button"
          onClick={onSaveLater}
          className="text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
        >
          Save and continue later
        </button>
      </div>
    </section>
  );
}
