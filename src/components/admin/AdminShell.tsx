import { Link, useNavigate } from 'react-router-dom';
import { type ReactNode, useEffect, useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { SeoHead } from '../SeoHead';

export type AdminStats = {
  leadsCount: number;
  ordersCount: number;
  byStatus?: Record<string, number>;
  byHeat?: Record<string, number>;
};

type AdminShellProps = {
  title: string;
  description: string;
  canonicalUrl: string;
  activeTab: 'leads' | 'orders' | 'funnel';
  children: ReactNode;
  loading?: boolean;
  stats?: AdminStats | null;
};

export const AdminShell = ({
  title,
  description,
  canonicalUrl,
  activeTab,
  children,
  loading = false,
  stats = null,
}: AdminShellProps) => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [localStats, setLocalStats] = useState<AdminStats | null>(stats);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    setLocalStats(stats);
  }, [stats]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sessionRes = await fetch('/api/admin/session', { credentials: 'include' });
        const sessionData = await sessionRes.json();
        if (!sessionData?.authenticated) {
          if (!cancelled) {
            setAuthenticated(false);
            setAuthChecked(true);
            const next =
              activeTab === 'orders'
                ? '/admin/orders'
                : activeTab === 'funnel'
                  ? '/admin/funnel'
                  : '/admin';
            navigate(`/login?next=${encodeURIComponent(next)}`, { replace: true });
          }
          return;
        }
        if (!cancelled) {
          setAuthenticated(true);
          setAuthChecked(true);
        }

        if (!stats) {
          const statsRes = await fetch('/api/admin/stats', { credentials: 'include' });
          if (statsRes.status === 401) {
            navigate('/login?next=/admin', { replace: true });
            return;
          }
          const statsData = await statsRes.json();
          if (!cancelled) setLocalStats(statsData.stats ?? null);
        }
      } catch (e) {
        if (!cancelled) {
          setStatsError(e instanceof Error ? e.message : 'Failed to load dashboard');
          setAuthChecked(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeTab, navigate, stats]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    navigate('/login', { replace: true });
  };

  if (!authChecked || (loading && !authenticated)) {
    return (
      <div className="min-h-screen bg-surface px-4 py-16 text-center type-body text-body">
        Loading admin…
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-surface text-heading">
      <SeoHead title={title} description={description} url={canonicalUrl} robots="noindex, nofollow" />

      <header className="border-b border-border/60 bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link to="/admin" className="shrink-0">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-4">
            <p className="hidden type-eyebrow sm:block">Ops console</p>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="text-sm font-semibold text-accent"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow">Brandsamor admin</p>
            <h1 className="mt-1 type-h3">Sampling CRM</h1>
            <p className="mt-1 max-w-2xl type-body-sm text-body">
              Track open sampling journeys in Leads, completed kits in Orders, and drop-off in
              Funnel.
            </p>
          </div>
        </div>

        {statsError && (
          <p className="mt-4 rounded-[2px] border border-[#F5D0C8] bg-[#FFF6F4] px-4 py-3 text-sm text-[#B42318]">
            {statsError}
          </p>
        )}

        <nav className="mt-6 flex gap-1 border-b border-border/60" aria-label="Admin sections">
          <TabLink to="/admin" active={activeTab === 'leads'}>
            Leads
            {typeof localStats?.leadsCount === 'number' && (
              <span className="tabular-nums text-body/80">{localStats.leadsCount}</span>
            )}
          </TabLink>
          <TabLink to="/admin/orders" active={activeTab === 'orders'}>
            Orders
            {typeof localStats?.ordersCount === 'number' && (
              <span className="tabular-nums text-body/80">{localStats.ordersCount}</span>
            )}
          </TabLink>
          <TabLink to="/admin/funnel" active={activeTab === 'funnel'}>
            Funnel
          </TabLink>
        </nav>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

function TabLink({ to, active, children }: { to: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? 'border-heading text-heading'
          : 'border-transparent text-body hover:text-heading'
      }`}
    >
      {children}
    </Link>
  );
}
