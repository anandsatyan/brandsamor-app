export const SaveStatus = ({ visible }: { visible: boolean }) => (
  <span
    className={[
      'text-xs font-semibold text-[var(--sampling-success)] transition-opacity duration-200',
      visible ? 'opacity-100' : 'pointer-events-none opacity-0',
    ].join(' ')}
    aria-live="polite"
  >
    Saved!
  </span>
);
