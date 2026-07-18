const STAGES = [
  { id: 'direction', label: 'Direction' },
  { id: 'character', label: 'Character' },
  { id: 'notes', label: 'Notes' },
  { id: 'performance', label: 'Performance' },
  { id: 'review', label: 'Final concept' },
] as const;

function stageIndex(current?: string | null) {
  const map: Record<string, number> = {
    opening: 0,
    discovery: 0,
    direction: 0,
    character: 1,
    notes: 2,
    performance: 3,
    commercial: 3,
    review: 4,
    complete: 4,
    refining: 1,
    ready_for_formula: 4,
  };
  return map[String(current || 'opening')] ?? 0;
}

export function ProgressIndicator({ currentStage }: { currentStage?: string | null }) {
  const active = stageIndex(currentStage);
  const currentLabel = STAGES[active]?.label ?? STAGES[0].label;

  return (
    <nav aria-label="Scent development progress" className="w-full">
      {/* Mobile: one clear step, no crammed uppercase strip */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <p
          className="type-caption font-semibold uppercase tracking-[0.1em] text-[var(--sampling-heading)]"
          aria-current="step"
        >
          {currentLabel}
        </p>
        <p className="type-caption text-[var(--sampling-muted)]">
          Step {active + 1} of {STAGES.length}
        </p>
      </div>
      <ol className="mt-2 flex items-center gap-1.5 sm:hidden" aria-hidden>
        {STAGES.map((stage, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <li
              key={stage.id}
              className={[
                'h-1 flex-1 rounded-[2px]',
                current
                  ? 'bg-[var(--sampling-heading)]'
                  : done
                    ? 'bg-[var(--sampling-success)]'
                    : 'bg-[var(--sampling-border)]',
              ].join(' ')}
            />
          );
        })}
      </ol>

      {/* sm+: full stage labels */}
      <ol className="hidden flex-wrap items-center gap-x-2 gap-y-1 sm:flex">
        {STAGES.map((stage, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <li key={stage.id} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[var(--sampling-border)]" aria-hidden>
                  →
                </span>
              )}
              <span
                className={[
                  'type-caption font-semibold uppercase tracking-[0.1em]',
                  current
                    ? 'text-[var(--sampling-heading)]'
                    : done
                      ? 'text-[var(--sampling-success)]'
                      : 'text-[var(--sampling-muted)]/70',
                ].join(' ')}
                aria-current={current ? 'step' : undefined}
              >
                {done ? '✓ ' : ''}
                {stage.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
