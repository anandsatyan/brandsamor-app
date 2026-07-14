export type AdminStatus = 'in_progress' | 'curated' | 'checkout_started' | 'paid' | string;

export const STATUS_META: Record<
  string,
  { label: string; className: string; dotClassName: string }
> = {
  in_progress: {
    label: 'In progress',
    className: 'border-amber-200 bg-amber-50 text-amber-900',
    dotClassName: 'bg-amber-500',
  },
  curated: {
    label: 'Curated',
    className: 'border-sky-200 bg-sky-50 text-sky-900',
    dotClassName: 'bg-sky-500',
  },
  checkout_started: {
    label: 'Checkout started',
    className: 'border-violet-200 bg-violet-50 text-violet-900',
    dotClassName: 'bg-violet-500',
  },
  paid: {
    label: 'Paid',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    dotClassName: 'bg-emerald-500',
  },
};

export const STEP_KEY_LABELS: Record<string, string> = {
  contact: 'Contact',
  brand: 'Your brand',
  scent: 'Scent direction',
  experience: 'Experience',
  preferences: 'Preferences',
  save_exit: 'Saved & exited',
  curation: 'Kit curated',
  paid: 'Paid',
};

export const STEP_INDEX_LABELS: Record<number, string> = {
  0: 'Welcome',
  1: 'Contact',
  2: 'Your brand',
  3: 'Scent direction',
  4: 'Experience',
  5: 'Preferences',
  6: 'Review',
  7: 'Curation',
  8: 'Results',
  9: 'Complete',
  10: 'Checkout',
  11: 'Done',
};

export function statusMeta(status?: string | null) {
  return (
    STATUS_META[status ?? ''] ?? {
      label: status ? status.replace(/_/g, ' ') : 'Unknown',
      className: 'border-border bg-surface text-heading',
      dotClassName: 'bg-body',
    }
  );
}

export function stepLabel(stepKey?: string | null, stepIndex?: number | null) {
  if (stepKey && STEP_KEY_LABELS[stepKey]) return STEP_KEY_LABELS[stepKey];
  if (typeof stepIndex === 'number' && STEP_INDEX_LABELS[stepIndex]) {
    return STEP_INDEX_LABELS[stepIndex];
  }
  if (stepKey) return stepKey.replace(/_/g, ' ');
  return '—';
}

export function formatDateTime(value?: string | Date | null) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatMoney(amount?: number | null, currency = 'usd') {
  if (typeof amount !== 'number') return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format(amount / 100);
}

export function formatList(values?: string[] | null) {
  if (!values?.length) return '—';
  return values.join(', ');
}

export function formatFragranceRecommendation(rec?: {
  fragranceNumber?: string | number | null;
  fragranceName?: string | null;
  fragranceSlug?: string | null;
  fragranceId?: string | null;
} | null) {
  const name = rec?.fragranceName || rec?.fragranceSlug || rec?.fragranceId || 'Fragrance';
  if (rec?.fragranceNumber != null && rec.fragranceNumber !== '') {
    return `No. ${rec.fragranceNumber} — ${name}`;
  }
  return name;
}
