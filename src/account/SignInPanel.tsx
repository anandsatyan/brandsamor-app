import { useState, type FormEvent } from 'react';
import { useAuth } from './AuthContext';

export function SignInPanel({
  nextPath,
  compact = false,
  title = 'Save & resume anywhere',
  description = 'Sign in with email to keep your scent projects and sampling brief across devices.',
  onSignedInHint,
}: {
  nextPath: string;
  compact?: boolean;
  title?: string;
  description?: string;
  onSignedInHint?: () => void;
}) {
  const { authenticated, customer, requestLink, logout, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [devUrl, setDevUrl] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setError('');
    setDevUrl('');
    try {
      const result = await requestLink(email.trim(), nextPath);
      setSent(true);
      if (result.devMagicUrl) setDevUrl(result.devMagicUrl);
      onSignedInHint?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send sign-in link');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className={`rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] ${compact ? 'px-3 py-2' : 'px-4 py-4'}`}>
        <p className="text-sm text-[var(--sampling-muted)]">Checking account…</p>
      </div>
    );
  }

  if (authenticated && customer) {
    return (
      <div className={`rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] ${compact ? 'px-3 py-2.5' : 'px-4 py-4'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="type-eyebrow tracking-[0.14em] text-[var(--sampling-muted)]">Signed in</p>
            <p className="truncate text-sm font-semibold text-[var(--sampling-heading)]">{customer.email}</p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] ${compact ? 'px-3 py-3' : 'px-4 py-4'}`}>
      {!compact && (
        <>
          <p className="type-eyebrow tracking-[0.14em] text-[var(--sampling-muted)]">Account</p>
          <h2 className="mt-1 font-serif text-phi-lg text-[var(--sampling-heading)]">{title}</h2>
          <p className="mt-1.5 text-sm text-[var(--sampling-muted)]">{description}</p>
        </>
      )}
      {compact && (
        <p className="text-sm font-semibold text-[var(--sampling-heading)]">{title}</p>
      )}

      {sent ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-[var(--sampling-heading)]">
            Check your inbox for a sign-in link{email ? ` sent to ${email}` : ''}.
          </p>
          {devUrl ? (
            <p className="break-all text-xs text-[var(--sampling-muted)]">
              Dev link:{' '}
              <a className="font-semibold text-[var(--sampling-orange)] underline" href={devUrl}>
                Open magic link
              </a>
            </p>
          ) : null}
          <button
            type="button"
            className="text-sm font-semibold text-[var(--sampling-orange)] hover:underline"
            onClick={() => {
              setSent(false);
              setDevUrl('');
            }}
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch" onSubmit={(e) => void handleSubmit(e)}>
          <label className="sr-only" htmlFor="account-email">
            Email
          </label>
          <input
            id="account-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@brand.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2.5 text-sm text-[var(--sampling-heading)] outline-none focus:border-[var(--sampling-heading)]"
          />
          <button
            type="submit"
            disabled={sending}
            className="btn-primary shrink-0 px-4 py-2.5 text-sm disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Email me a link'}
          </button>
        </form>
      )}

      {error ? <p className="mt-2 text-sm text-[var(--sampling-error)]">{error}</p> : null}
    </div>
  );
}
