import { Link } from 'react-router-dom';
import { SignInPanel } from '../account/SignInPanel';
import { useAuth } from '../account/AuthContext';
import { BrandLogo } from './BrandLogo';
import { CREATE_A_SCENT_PATH } from '../routes/leadForm';
import '../sampling/styles/sampling.css';

export function AccountPage() {
  const { authenticated, customer, consultations, openSampling, loading } = useAuth();
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const error = params.get('error');
  const signedIn = params.get('signedIn') === '1';

  return (
    <div className="min-h-[100dvh] bg-[var(--sampling-cream,#f7f1ea)] text-[var(--sampling-heading,#2b1809)]">
      <header className="border-b border-black/10 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link to="/" aria-label="Brandsamor home">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link to={CREATE_A_SCENT_PATH} className="hover:opacity-70">
              Create a scent
            </Link>
            <Link to="/curated-sampling" className="hover:opacity-70">
              Sampling
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="type-eyebrow tracking-[0.16em]">Your Brandsamor account</p>
        <h1 className="mt-3 font-serif text-phi-3xl leading-none">Resume anywhere</h1>
        <p className="mt-3 max-w-xl type-body text-[var(--sampling-muted,#725f52)]">
          One sign-in for Create a Scent and Curated Sampling. Your progress is saved in the cloud
          so you can continue on any device.
        </p>

        {error ? (
          <p className="mt-6 rounded-[2px] border border-red-200 bg-white px-4 py-3 text-sm text-red-700">
            That sign-in link is invalid or expired. Request a new one below.
          </p>
        ) : null}
        {signedIn && authenticated ? (
          <p className="mt-6 rounded-[2px] border border-[var(--sampling-border,#e7ddd2)] bg-white px-4 py-3 text-sm">
            You’re signed in{customer?.email ? ` as ${customer.email}` : ''}.
          </p>
        ) : null}

        <div className="mt-8">
          <SignInPanel nextPath="/account" />
        </div>

        {loading ? (
          <p className="mt-10 text-sm text-[var(--sampling-muted,#725f52)]">Loading your workspace…</p>
        ) : null}

        {authenticated ? (
          <div className="mt-10 space-y-8">
            <section>
              <h2 className="font-serif text-phi-xl">Scent projects</h2>
              {consultations.length === 0 ? (
                <p className="mt-2 text-sm text-[var(--sampling-muted,#725f52)]">
                  No saved scent conversations yet.{' '}
                  <Link className="font-semibold underline" to="/create-a-scent/studio">
                    Start one
                  </Link>
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {consultations.map((c) => (
                    <li key={c.consultationId}>
                      <Link
                        to="/create-a-scent/studio"
                        className="flex items-center justify-between gap-3 rounded-[2px] border border-[var(--sampling-border,#e7ddd2)] bg-white px-4 py-3 text-sm transition-colors hover:border-[var(--sampling-heading,#2b1809)]"
                        onClick={() => {
                          try {
                            localStorage.setItem(
                              'brandsamor_scent_studio_active_v1',
                              c.consultationId,
                            );
                          } catch {
                            /* ignore */
                          }
                        }}
                      >
                        <span className="font-semibold">{c.title || 'Scent conversation'}</span>
                        <span className="text-[var(--sampling-muted,#725f52)]">
                          {c.submittedAt ? 'Submitted' : c.stage || 'In progress'}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="font-serif text-phi-xl">Curated sampling</h2>
              {openSampling ? (
                <div className="mt-4 rounded-[2px] border border-[var(--sampling-border,#e7ddd2)] bg-white px-4 py-4">
                  <p className="text-sm font-semibold">Open brief ready to resume</p>
                  <p className="mt-1 text-sm text-[var(--sampling-muted,#725f52)]">
                    Step {openSampling.currentStep}
                    {openSampling.lead?.brandName ? ` · ${openSampling.lead.brandName}` : ''}
                  </p>
                  <Link
                    to="/curated-sampling"
                    className="btn-primary mt-4 inline-flex px-4 py-2.5 text-sm"
                  >
                    Continue sampling
                  </Link>
                </div>
              ) : (
                <p className="mt-2 text-sm text-[var(--sampling-muted,#725f52)]">
                  No open sampling brief.{' '}
                  <Link className="font-semibold underline" to="/curated-sampling">
                    Start curated sampling
                  </Link>
                </p>
              )}
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
