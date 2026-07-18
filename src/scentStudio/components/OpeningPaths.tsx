type StartMode = 'scratch' | 'inspiration' | 'guided';

const PATHS: Array<{
  id: StartMode;
  title: string;
  description: string;
}> = [
  {
    id: 'scratch',
    title: 'Create from scratch',
    description: 'Describe the feeling, audience, notes, or story you want the fragrance to express.',
  },
  {
    id: 'inspiration',
    title: 'Modify an existing fragrance',
    description:
      'Use a fragrance you know as a starting point and tell us what you want to preserve, reduce, or change.',
  },
  {
    id: 'guided',
    title: 'Guide me',
    description: 'Answer a few simple questions and we’ll help you discover the right direction.',
  },
];

export function OpeningPaths({
  onSelect,
  busy,
}: {
  onSelect: (mode: StartMode) => void;
  busy?: boolean;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <p className="type-eyebrow">Brandsamor Scent Designer</p>
      <h1 className="mt-3 font-serif text-phi-2xl leading-tight text-[var(--sampling-heading)] sm:text-phi-3xl">
        Let’s create your fragrance.
      </h1>
      <p className="mt-4 max-w-lg type-body text-[var(--sampling-muted)]">
        Start with an idea, modify a fragrance you already know, or let the Brandsamor Scent Designer
        guide you.
      </p>

      <ul className="mt-10 space-y-3">
        {PATHS.map((path) => (
          <li key={path.id}>
            <button
              type="button"
              disabled={busy}
              onClick={() => onSelect(path.id)}
              className="w-full rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-5 py-5 text-left transition-colors hover:border-[var(--sampling-heading)] disabled:opacity-50"
            >
              <p className="font-semibold text-[var(--sampling-heading)]">{path.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--sampling-muted)]">
                {path.description}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
