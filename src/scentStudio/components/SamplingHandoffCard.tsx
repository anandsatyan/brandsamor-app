import { useState, type FormEvent } from 'react';

export function SamplingHandoffCard({
  concept,
  onSubmit,
  submitting,
}: {
  concept?: string | null;
  onSubmit: (contact: {
    fullName: string;
    email: string;
    brandName: string;
    country: string;
    phone: string;
  }) => void;
  submitting?: boolean;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [approved, setApproved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!approved || submitting) return;
    onSubmit({ fullName, email, brandName, country, phone });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] p-4 sm:p-5"
    >
      <p className="type-eyebrow">Prepare for sampling</p>
      <h3 className="mt-2 font-serif text-phi-md text-[var(--sampling-heading)]">
        Share a few details
      </h3>
      {concept && <p className="mt-2 text-sm text-[var(--sampling-muted)]">{concept}</p>}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-1">
          <span className="text-[var(--sampling-muted)]">Name</span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2 text-[var(--sampling-heading)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--sampling-muted)]">Business email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2 text-[var(--sampling-heading)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--sampling-muted)]">Brand / company</span>
          <input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="mt-1 w-full rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2 text-[var(--sampling-heading)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--sampling-muted)]">Country</span>
          <input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 w-full rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2 text-[var(--sampling-heading)]"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-[var(--sampling-muted)]">Phone / WhatsApp (optional)</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2 text-[var(--sampling-heading)]"
          />
        </label>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-[var(--sampling-muted)]">
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
          className="mt-1"
        />
        <span>
          I approve this as the starting direction for physical fragrance development. I understand
          that the fragrance may evolve after formulation, evaluation and sample feedback.
        </span>
      </label>

      <button
        type="submit"
        disabled={!approved || submitting}
        className="btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Send to Brandsamor'}
      </button>
    </form>
  );
}
