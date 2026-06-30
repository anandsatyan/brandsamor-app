import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SeoHead } from './SeoHead';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { PAGE_METADATA } from '../seo/pageMetadata';

const inputClassName =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 pl-11 text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent';

export const LoginPage = () => {
  const meta = PAGE_METADATA['/login'];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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
                autoComplete="email"
                placeholder="you@yourbrand.com"
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
                placeholder="Enter your password"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-body">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
              />
              Remember me
            </label>
            <a href="#" className="font-medium text-accent hover:opacity-80">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn-primary w-full justify-center rounded-lg">
            Sign in
          </button>

          {submitted && (
            <p className="rounded-lg border border-border bg-surface px-4 py-3 text-center text-sm text-body" role="status">
              Customer accounts are launching soon. This sign-in page is a preview of the experience ahead.
            </p>
          )}

          <p className="text-center text-xs leading-relaxed text-body">
            Need help before launch?{' '}
            <Link to="/contact" className="font-medium text-accent hover:opacity-80">
              Contact the Brandsamor team
            </Link>
            .
          </p>
        </form>
      </main>
    </div>
  );
};
