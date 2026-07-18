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

  return (
    <nav aria-label="Scent development progress" className="w-full min-w-0">
      <ol className="flex flex-nowrap items-center gap-x-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-2 [&::-webkit-scrollbar]:hidden">
        {STAGES.map((stage, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <li key={stage.id} className="flex shrink-0 items-center gap-1 sm:gap-2">
              {index > 0 && (
                <span className="text-[var(--sampling-border)]" aria-hidden>
                  →
                </span>
              )}
              <span
                className={[
                  'type-caption whitespace-nowrap font-semibold uppercase tracking-[0.05em] sm:tracking-[0.1em]',
                  current
                    ? 'text-[var(--sampling-heading)]'
                    : done
                      ? 'text-[var(--sampling-success)]'
                      : 'text-[var(--sampling-muted)]/70',
                ].join(' ')}
                aria-current={current ? 'step' : undefined}
              >
                {done ? '✓ ' : ''}
                <span className="sm:hidden">
                  {stage.id === 'review' ? 'Concept' : stage.label}
                </span>
                <span className="hidden sm:inline">{stage.label}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
