import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { type FormEvent, useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SeoHead } from './SeoHead';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { PAGE_METADATA } from '../seo/pageMetadata';

const inputClassName =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 pl-11 text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent';

export const LoginPage = () => {
  const meta = PAGE_METADATA['/login'];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? 'Wrong email or password.');
      }
      const next = searchParams.get('next') || '/admin/orders';
      navigate(next.startsWith('/') ? next : '/admin/orders', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Wrong email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans flex flex-col items-center justify-center px-4 py-12 sm:py-16">
      <SeoHead
        title={meta.title}
        description={meta.description}
        url={meta.canonical}
        robots={meta.robots}
        structuredData={buildStructuredDataForPath(meta)}
      />

      <Link to="/" className="mb-8 sm:mb-10">
        <BrandLogo />
      </Link>

      <main className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-secondary p-6 sm:p-8 shadow-sm"
          noValidate
        >
          <div className="space-y-1">
            <h1 className="type-h3">Admin sign in</h1>
            <p className="type-body-sm text-body">Access sample kit orders and payment records.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="login-email" className="block text-sm font-medium text-heading">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body"
                aria-hidden="true"
              />
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="you@brandsamor.com"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="block text-sm font-medium text-heading">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body"
                aria-hidden="true"
              />
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className={inputClassName}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>

          {error && (
            <p
              className="rounded-lg border border-border bg-surface px-4 py-3 text-center text-sm text-heading"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};
