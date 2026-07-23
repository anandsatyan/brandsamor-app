import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminShell, type AdminStats } from './admin/AdminShell';
import {
  formatCountry,
  formatDateTime,
  formatFragranceRecommendation,
  formatList,
  formatMoney,
  heatMeta,
  statusMeta,
  stepLabel,
} from './admin/adminFormat';

type LeadScore = {
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  label: string;
  summary: string;
  signals: Array<{ key: string; label: string; points: number; detail: string }>;
  hasExistingBrandSignal: boolean;
  ageDays?: number | null;
  ageDecay?: string | null;
  baseScore?: number;
  baseTier?: 'hot' | 'warm' | 'cold';
};

type AdminLead = {
  sessionId: string;
  status: string;
  currentStep: number | null;
  lastCompletedStep: string | null;
  stepHistory: Array<{ step: string | null; completedAt: string | null }>;
  lead: {
    fullName?: string;
    email?: string;
    phone?: string;
    brandName?: string | null;
    country?: string;
    consent?: boolean;
  } | null;
  answers: {
    brandStage?: string | null;
    businessType?: string | null;
    businessTypeOther?: string | null;
    scentExpression?: string | null;
    brandPersonalities?: string[];
    scentFamilies?: string[];
    intensity?: string | null;
    useCase?: string | null;
    exclusions?: string[];
    likedFragrances?: string | null;
    additionalNotes?: string | null;
    packagingDirection?: string | null;
    bottleSize?: string | null;
  };
  recommendations: Array<{
    fragranceSlug?: string | null;
    fragranceNumber?: string | number | null;
    fragranceName?: string | null;
    inspiredBy?: { brand?: string | null; fragrance?: string | null } | null;
    role?: string | null;
    reason?: string | null;
    stretch?: boolean;
    exclusionConflicts?: string[];
  }>;
  selectionSummary?: string | null;
  checkout?: {
    email?: string | null;
    phone?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    shipping?: Record<string, string> | null;
    billing?: Record<string, string> | null;
  } | null;
  order?: {
    sampleOrderNumber?: number | null;
    sampleOrderLabel?: string | null;
    transactionId?: string | null;
    amount?: number | null;
    currency?: string | null;
    paidAt?: string | null;
  } | null;
  payment?: {
    amount?: number | null;
    currency?: string | null;
    paidAt?: string | null;
    receiptUrl?: string | null;
  } | null;
  paymentIntent?: {
    status?: string | null;
    lastPaymentError?: string | null;
  } | null;
  comments?: Array<{
    id?: string | null;
    body: string;
    author?: string | null;
    createdAt?: string | null;
  }>;
  leadScore?: LeadScore | null;
  priorOrders?: Array<{
    sessionId?: string;
    status?: string;
    sampleOrderNumber?: number | null;
    sampleOrderLabel?: string | null;
    amount?: number | null;
    currency?: string | null;
    paidAt?: string | null;
    canceledAt?: string | null;
  }>;
  priorOrderCount?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'curated', label: 'Curated' },
  { value: 'checkout_started', label: 'Checkout' },
] as const;

const HEAT_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'hot', label: 'Hot' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
] as const;

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'heat', label: 'Hottest first' },
] as const;

type FunnelStats = {
  totalSessions: number;
  steps: Array<{
    key: string;
    label: string;
    reached: number;
    completed: number;
    dropped: number;
    dropOffRate: number;
    conversionFromPrev: number;
  }>;
  questions: Array<{
    key: string;
    step: string;
    label: string;
    optional?: boolean;
    reachedStep: number;
    answered: number;
    missing: number;
    missingRate: number;
  }>;
  saveExitByStep: Record<string, number>;
  insights?: {
    worstStep?: { label: string; dropOffRate: number; dropped: number } | null;
    worstQuestion?: { label: string; step: string; missingRate: number } | null;
    suggestion?: string;
  };
};

export const AdminLeadsPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [funnel, setFunnel] = useState<FunnelStats | null>(null);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [selected, setSelected] = useState<AdminLead | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [heatFilter, setHeatFilter] = useState('all');
  const [sortMode, setSortMode] = useState<'heat' | 'newest'>('newest');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'all') params.set('status', statusFilter);
        if (heatFilter !== 'all') params.set('heat', heatFilter);
        if (sortMode) params.set('sort', sortMode);
        if (debouncedQuery) params.set('q', debouncedQuery);

        const [statsRes, listRes, funnelRes] = await Promise.all([
          fetch('/api/admin/stats', { credentials: 'include' }),
          fetch(`/api/admin/leads?${params.toString()}`, { credentials: 'include' }),
          fetch('/api/admin/funnel', { credentials: 'include' }),
        ]);

        if (statsRes.status === 401 || listRes.status === 401 || funnelRes.status === 401) {
          navigate('/login?next=/admin', { replace: true });
          return;
        }

        const statsData = await statsRes.json();
        const listData = await listRes.json();
        const funnelData = await funnelRes.json().catch(() => ({}));
        if (!cancelled) {
          setStats(statsData.stats ?? null);
          setLeads(listData.leads ?? []);
          setFunnel(funnelData.funnel ?? null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load leads');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, heatFilter, navigate, sortMode, statusFilter]);

  useEffect(() => {
    if (!sessionId) {
      setSelected(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/leads/${encodeURIComponent(sessionId)}`, {
          credentials: 'include',
        });
        if (res.status === 401) {
          navigate('/login?next=/admin', { replace: true });
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error ?? 'Lead not found');
        }
        const data = await res.json();
        if (!cancelled) setSelected(data.lead ?? null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load lead');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, sessionId]);

  const selectedFromList = useMemo(
    () => leads.find((lead) => lead.sessionId === sessionId) ?? null,
    [leads, sessionId],
  );

  const detail = selected ?? selectedFromList;

  return (
    <AdminShell
      title="Admin Leads | Brandsamor"
      description="Private Brandsamor sampling leads CRM."
      canonicalUrl="https://www.brandsamor.com/admin"
      activeTab="leads"
      loading={loading && leads.length === 0}
      stats={stats}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <section className="rounded-[2px] border border-border/60 bg-secondary/40">
          <div className="space-y-2 border-b border-border/50 px-3 py-3 sm:px-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-baseline gap-2.5">
                <h2 className="type-h4">Leads</h2>
                <p className="text-base font-semibold tabular-nums text-heading">
                  {leads.length}
                  <span className="ml-1 text-sm font-medium text-body">
                    shown
                    {typeof stats?.leadsCount === 'number' ? ` of ${stats.leadsCount}` : ''}
                  </span>
                </p>
              </div>
              <Link
                to="/admin/orders"
                className="shrink-0 text-sm font-semibold text-accent hover:underline"
              >
                Orders →
              </Link>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, brand, phone…"
                className="w-full rounded-[2px] border border-border bg-white px-3 py-1.5 text-sm text-heading placeholder:text-body/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
              <div
                className="flex shrink-0 overflow-hidden rounded-[2px] border border-border/70 bg-white"
                role="group"
                aria-label="Sort leads"
              >
                {SORT_OPTIONS.map((option) => {
                  const active = sortMode === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSortMode(option.value)}
                      className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-heading text-white'
                          : 'text-body hover:bg-secondary/60 hover:text-heading'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by heat">
              {HEAT_FILTERS.map((filter) => {
                const active = heatFilter === filter.value;
                const count =
                  filter.value === 'all'
                    ? stats?.leadsCount
                    : stats?.byHeat?.[filter.value];
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setHeatFilter(filter.value)}
                    className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-heading bg-heading text-white'
                        : 'border-border/70 bg-white text-body hover:text-heading'
                    }`}
                  >
                    {filter.label}
                    {typeof count === 'number' && (
                      <span
                        className={`rounded-[2px] px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                          active ? 'bg-white/20 text-white' : 'bg-secondary text-heading'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by status">
              {STATUS_FILTERS.map((filter) => {
                const active = statusFilter === filter.value;
                const count =
                  filter.value === 'all'
                    ? stats?.leadsCount
                    : stats?.byStatus?.[filter.value];
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setStatusFilter(filter.value)}
                    className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-heading bg-heading text-white'
                        : 'border-border/70 bg-white text-body hover:text-heading'
                    }`}
                  >
                    {filter.label}
                    {typeof count === 'number' && (
                      <span
                        className={`rounded-[2px] px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                          active ? 'bg-white/20 text-white' : 'bg-secondary text-heading'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="px-4 py-3 text-sm text-[#B42318]">{error}</p>}

          {funnel && (
            <div className="border-b border-border/50 px-3 py-3 sm:px-4">
              <button
                type="button"
                onClick={() => setFunnelOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-heading">Funnel drop-off</p>
                  <p className="mt-0.5 type-caption text-body">
                    {funnel.insights?.suggestion ||
                      `Based on ${funnel.totalSessions} sampling sessions`}
                  </p>
                </div>
                {funnelOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-body" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-body" />
                )}
              </button>
              {funnelOpen && (
                <div className="mt-3 space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[28rem] text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-body">
                          <th className="py-1.5 pr-2 font-semibold">Step</th>
                          <th className="py-1.5 pr-2 font-semibold">Reached</th>
                          <th className="py-1.5 pr-2 font-semibold">Dropped</th>
                          <th className="py-1.5 font-semibold">Drop %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {funnel.steps.map((step) => (
                          <tr key={step.key} className="border-b border-border/40 text-heading">
                            <td className="py-1.5 pr-2">{step.label}</td>
                            <td className="py-1.5 pr-2 tabular-nums">{step.reached}</td>
                            <td className="py-1.5 pr-2 tabular-nums">{step.dropped}</td>
                            <td className="py-1.5 tabular-nums">
                              {Math.round(step.dropOffRate * 100)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-heading">Questions most often unanswered</p>
                    <ul className="mt-2 space-y-1.5">
                      {funnel.questions
                        .filter((q) => !q.optional)
                        .slice(0, 6)
                        .map((q) => (
                          <li
                            key={q.key}
                            className="flex items-baseline justify-between gap-3 text-xs text-body"
                          >
                            <span>
                              <span className="font-medium text-heading">{q.label}</span>
                              <span className="text-body/70"> · {q.step}</span>
                            </span>
                            <span className="shrink-0 tabular-nums text-heading">
                              {Math.round(q.missingRate * 100)}% missing
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {Object.keys(funnel.saveExitByStep || {}).length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-heading">Save + exit by step</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(funnel.saveExitByStep).map(([step, count]) => (
                          <li
                            key={step}
                            className="rounded-[2px] border border-border/70 bg-white px-2 py-1 text-[11px] text-heading"
                          >
                            {step}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <ul className="max-h-[70vh] divide-y divide-border/50 overflow-y-auto">
            {leads.map((lead) => {
              const active = lead.sessionId === sessionId;
              const meta = statusMeta(lead.status);
              const heat = heatMeta(lead.leadScore?.tier);
              const score = lead.leadScore?.score ?? 0;
              return (
                <li key={lead.sessionId}>
                  <button
                    type="button"
                    className={`w-full px-4 py-4 text-left transition-colors ${
                      active ? 'bg-white' : 'hover:bg-white/70'
                    }`}
                    onClick={() => navigate(`/admin/leads/${lead.sessionId}`)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${heat.glowClassName}`}
                            aria-hidden
                          />
                          <p className="truncate font-semibold text-heading">
                            {lead.lead?.fullName || 'Unknown contact'}
                          </p>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-body">
                          {lead.lead?.email || 'No email'}
                          {lead.lead?.brandName ? ` · ${lead.lead.brandName}` : ''}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div
                            className="h-1.5 w-16 overflow-hidden rounded-[2px] bg-border/70"
                            aria-hidden
                          >
                            <div
                              className={`h-full rounded-[2px] ${heat.barClassName}`}
                              style={{ width: `${Math.max(8, score)}%` }}
                            />
                          </div>
                          <span
                            className={`rounded-[2px] border px-1.5 py-0.5 text-[11px] font-semibold ${heat.className}`}
                          >
                            {lead.leadScore?.label ?? 'Cold'} · {score}
                          </span>
                        </div>
                        <p className="mt-1 type-caption text-body/80">
                          Last step: {stepLabel(lead.lastCompletedStep, lead.currentStep)}
                          {' · '}
                          {formatDateTime(lead.updatedAt)}
                          {lead.lead?.country ? ` · ${formatCountry(lead.lead.country)}` : ''}
                          {(lead.priorOrderCount ?? 0) > 0
                            ? ` · ${lead.priorOrderCount} prior order${lead.priorOrderCount === 1 ? '' : 's'}`
                            : ''}
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-[2px] border px-2 py-0.5 text-[11px] font-semibold capitalize ${meta.className}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
                        {meta.label}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
            {!loading && leads.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-body">
                No leads match this filter.
              </li>
            )}
            {loading && leads.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-body">Loading leads…</li>
            )}
          </ul>
        </section>

        <section className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6">
          {!detail ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <p className="type-eyebrow">Lead detail</p>
              <p className="mt-3 max-w-sm type-body text-body">
                Select a lead to see contact details, questionnaire answers, curated fragrances, and
                checkout progress.
              </p>
            </div>
          ) : (
            <LeadDetail
              lead={detail}
              onLeadUpdated={(next) => {
                setSelected(next);
                setLeads((prev) =>
                  prev.map((item) => (item.sessionId === next.sessionId ? { ...item, ...next } : item)),
                );
              }}
            />
          )}
        </section>
      </div>
    </AdminShell>
  );
};

function LeadDetail({
  lead,
  onLeadUpdated,
}: {
  lead: AdminLead;
  onLeadUpdated: (lead: AdminLead) => void;
}) {
  const meta = statusMeta(lead.status);
  const heat = heatMeta(lead.leadScore?.tier);
  const shipping = lead.checkout?.shipping;
  const [detailTab, setDetailTab] = useState<'overview' | 'history'>('overview');
  const [heatOpen, setHeatOpen] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [commentError, setCommentError] = useState('');
  const [savingComment, setSavingComment] = useState(false);
  const comments = lead.comments ?? [];

  useEffect(() => {
    setDetailTab('overview');
    setHeatOpen(false);
    setCommentDraft('');
    setCommentError('');
  }, [lead.sessionId]);

  async function submitComment() {
    const body = commentDraft.trim();
    if (!body || savingComment) return;
    setSavingComment(true);
    setCommentError('');
    try {
      const res = await fetch(`/api/admin/leads/${encodeURIComponent(lead.sessionId)}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? 'Failed to save comment');
      }
      if (data.lead) onLeadUpdated(data.lead as AdminLead);
      setCommentDraft('');
    } catch (e) {
      setCommentError(e instanceof Error ? e.message : 'Failed to save comment');
    } finally {
      setSavingComment(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="type-eyebrow">Lead detail</p>
          <h2 className="mt-2 type-h3">{lead.lead?.fullName || 'Unknown contact'}</h2>
          <p className="mt-1 text-sm text-body">{lead.lead?.email}</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {lead.leadScore && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-xs font-semibold ${heat.className}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${heat.glowClassName}`} />
              {lead.leadScore.label} · {lead.leadScore.score}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-xs font-semibold ${meta.className}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
            {meta.label}
          </span>
        </div>
      </div>

      <nav className="flex gap-1 border-b border-border/60" aria-label="Lead detail sections">
        {(
          [
            { id: 'overview' as const, label: 'Overview' },
            {
              id: 'history' as const,
              label: `Step history${lead.stepHistory.length ? ` (${lead.stepHistory.length})` : ''}`,
            },
          ] as const
        ).map((tab) => {
          const active = detailTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDetailTab(tab.id)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'border-heading text-heading'
                  : 'border-transparent text-body hover:text-heading'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {detailTab === 'history' ? (
        <Section title="Step history">
          {lead.stepHistory.length === 0 ? (
            <p className="text-sm text-body">No step history recorded yet.</p>
          ) : (
            <ol className="space-y-2 border-l border-border/70 pl-4">
              {[...lead.stepHistory]
                .slice()
                .reverse()
                .map((entry, index) => (
                  <li key={`${entry.step}-${entry.completedAt}-${index}`} className="text-sm">
                    <p className="font-medium text-heading">{stepLabel(entry.step)}</p>
                    <p className="type-caption text-body">{formatDateTime(entry.completedAt)}</p>
                  </li>
                ))}
            </ol>
          )}
        </Section>
      ) : (
        <>
      {lead.leadScore && (
        <section className="rounded-[2px] border border-border/60 bg-surface">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            onClick={() => setHeatOpen((open) => !open)}
            aria-expanded={heatOpen}
          >
            <div className="min-w-0">
              <p className="type-eyebrow">Lead heat</p>
              <p className="mt-1 font-semibold text-heading">
                {lead.leadScore.label} · {lead.leadScore.score}/100
                {lead.leadScore.ageDays != null ? ` · ${lead.leadScore.ageDays}d old` : ''}
              </p>
              <p className="mt-0.5 truncate text-sm text-body">{lead.leadScore.summary}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden w-20 sm:block" aria-hidden>
                <div className="h-1.5 overflow-hidden rounded-[2px] bg-border/70">
                  <div
                    className={`h-full rounded-[2px] ${heat.barClassName}`}
                    style={{ width: `${Math.max(6, lead.leadScore.score)}%` }}
                  />
                </div>
              </div>
              {heatOpen ? (
                <ChevronUp className="h-4 w-4 text-body" aria-hidden />
              ) : (
                <ChevronDown className="h-4 w-4 text-body" aria-hidden />
              )}
            </div>
          </button>

          {heatOpen && (
            <div className="space-y-3 border-t border-border/50 px-4 py-3">
              {lead.leadScore.hasExistingBrandSignal && (
                <p className="text-xs font-semibold text-heading">
                  Existing / formalized brand signals detected
                </p>
              )}
              {lead.leadScore.signals.length > 0 && (
                <ul className="space-y-2">
                  {lead.leadScore.signals.map((signal) => (
                    <li
                      key={signal.key}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-heading">{signal.label}</p>
                        <p className="text-body">{signal.detail}</p>
                      </div>
                      <span className="shrink-0 font-semibold text-heading">
                        {signal.points > 0 ? `+${signal.points}` : signal.points}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="type-caption text-body/80">
                Score uses sampling brief and funnel signals, then cools with age: hot→warm after 1
                week, anything→cold after 2 weeks. No live web lookup yet.
              </p>
            </div>
          )}
        </section>
      )}

      <dl className="grid gap-3 rounded-[2px] bg-surface p-4 text-sm sm:grid-cols-2">
        <Detail term="Phone" value={lead.lead?.phone} />
        <Detail term="Brand" value={lead.lead?.brandName} />
        <Detail term="Country" value={formatCountry(lead.lead?.country)} />
        <Detail term="Consent" value={lead.lead?.consent ? 'Yes' : 'No'} />
        <Detail
          term="Current step"
          value={stepLabel(null, lead.currentStep)}
        />
        <Detail
          term="Last completed"
          value={stepLabel(lead.lastCompletedStep, lead.currentStep)}
        />
        <Detail term="Created" value={formatDateTime(lead.createdAt)} />
        <Detail term="Updated" value={formatDateTime(lead.updatedAt)} />
        <Detail term="Session" value={lead.sessionId} mono />
      </dl>

      <Section title="Comments">
        <div className="space-y-3">
          <textarea
            value={commentDraft}
            onChange={(e) => setCommentDraft(e.target.value)}
            rows={3}
            placeholder="Add a note from your conversation…"
            className="w-full rounded-[2px] border border-border bg-white px-3 py-2 text-sm text-heading placeholder:text-body/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void submitComment()}
              disabled={!commentDraft.trim() || savingComment}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingComment ? 'Saving…' : 'Add comment'}
            </button>
            {commentError && <p className="text-sm text-[#B42318]">{commentError}</p>}
          </div>
          {comments.length === 0 ? (
            <p className="text-sm text-body">No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment, index) => (
                <li
                  key={comment.id ?? `${comment.createdAt}-${index}`}
                  className="rounded-[2px] border border-border/50 bg-surface px-3 py-2.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="text-xs font-semibold text-heading">
                      {comment.author || 'Admin'}
                    </p>
                    <p className="type-caption text-body">
                      {formatDateTime(comment.createdAt)}
                    </p>
                  </div>
                  <p className="mt-1.5 whitespace-pre-wrap text-sm text-heading">{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section title="Brand & business">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Detail term="Brand stage" value={lead.answers.brandStage} />
          <Detail
            term="Business type"
            value={
              lead.answers.businessTypeOther
                ? `${lead.answers.businessType} (${lead.answers.businessTypeOther})`
                : lead.answers.businessType
            }
          />
          <Detail term="Scent expression" value={lead.answers.scentExpression} />
          <Detail term="Intensity" value={lead.answers.intensity} />
          <Detail term="Use case" value={lead.answers.useCase} />
          <Detail term="Packaging" value={lead.answers.packagingDirection} />
          <Detail term="Bottle size" value={lead.answers.bottleSize} />
        </dl>
      </Section>

      <Section title="Scent preferences">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Detail term="Personalities" value={formatList(lead.answers.brandPersonalities)} />
          <Detail term="Families" value={formatList(lead.answers.scentFamilies)} />
          <Detail term="Exclusions" value={formatList(lead.answers.exclusions)} />
          <Detail term="Liked fragrances" value={lead.answers.likedFragrances} />
          <div className="sm:col-span-2">
            <Detail term="Additional notes" value={lead.answers.additionalNotes} />
          </div>
        </dl>
      </Section>

      {(lead.recommendations.length > 0 || lead.selectionSummary) && (
        <Section title="Curated kit">
          {lead.selectionSummary && (
            <p className="mb-3 text-sm text-body">{lead.selectionSummary}</p>
          )}
          <ul className="space-y-2">
            {lead.recommendations.map((rec, index) => (
              <li
                key={`${rec.fragranceSlug}-${index}`}
                className="rounded-[2px] border border-border/50 bg-surface px-3 py-2.5 text-sm"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {rec.fragranceNumber != null && rec.fragranceNumber !== '' && (
                    <span className="type-caption font-semibold uppercase tracking-[0.12em] text-accent">
                      No. {rec.fragranceNumber}
                    </span>
                  )}
                  {rec.role ? (
                    <span className="text-xs capitalize text-body">
                      {rec.role.replace(/-/g, ' ')}
                    </span>
                  ) : null}
                  {rec.stretch && (
                    <span className="rounded-[2px] border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-900">
                      Stretch — touches an exclusion
                      {rec.exclusionConflicts?.length
                        ? ` (${rec.exclusionConflicts.map((c) => c.replace(/-/g, ' ')).join(', ')})`
                        : ''}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-medium text-heading">
                  {rec.fragranceName || formatFragranceRecommendation(rec)}
                </p>
                {(rec.inspiredBy?.brand || rec.inspiredBy?.fragrance) && (
                  <p className="mt-1 text-sm text-body">
                    Inspired by{' '}
                    <span className="text-heading">
                      {[rec.inspiredBy.brand, rec.inspiredBy.fragrance].filter(Boolean).join(' — ')}
                    </span>
                  </p>
                )}
                {rec.reason && <p className="mt-1 text-body">{rec.reason}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {lead.checkout && (
        <Section title="Checkout details">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <Detail
              term="Name"
              value={[lead.checkout.firstName, lead.checkout.lastName].filter(Boolean).join(' ')}
            />
            <Detail term="Company" value={lead.checkout.company} />
            <Detail term="Checkout email" value={lead.checkout.email} />
            <Detail term="Checkout phone" value={lead.checkout.phone} />
            {shipping && (
              <div className="sm:col-span-2">
                <Detail
                  term="Shipping"
                  value={[
                    shipping.line1,
                    shipping.line2,
                    [shipping.city, shipping.state, shipping.postalCode].filter(Boolean).join(', '),
                    formatCountry(shipping.country),
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                />
              </div>
            )}
          </dl>
          {lead.paymentIntent?.status && (
            <p className="mt-3 text-sm text-body">
              Payment intent: <span className="text-heading">{lead.paymentIntent.status}</span>
              {lead.paymentIntent.lastPaymentError
                ? ` · ${lead.paymentIntent.lastPaymentError}`
                : ''}
            </p>
          )}
        </Section>
      )}

      {lead.order && (
        <Section title={lead.status === 'canceled' ? 'Canceled order' : 'Paid order'}>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <Detail term="Order" value={lead.order.sampleOrderLabel} />
            <Detail
              term="Amount"
              value={formatMoney(
                lead.payment?.amount ?? lead.order.amount,
                String(lead.payment?.currency ?? lead.order.currency ?? 'usd'),
              )}
            />
            <Detail term="Transaction" value={lead.order.transactionId} mono />
            <Detail term="Paid at" value={formatDateTime(lead.order.paidAt ?? lead.payment?.paidAt)} />
            {lead.status === 'canceled' && (
              <Detail term="Status" value="Canceled — refund recorded" />
            )}
          </dl>
          {lead.order.sampleOrderNumber != null && (
            <Link
              to={`/admin/orders/${lead.order.sampleOrderNumber}`}
              className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              Open in Orders →
            </Link>
          )}
        </Section>
      )}

      {(lead.priorOrders?.length ?? 0) > 0 && (
        <Section title="Prior orders">
          <p className="mb-3 text-sm text-body">
            This contact ordered before and started a new sampling journey.
          </p>
          <ul className="space-y-2">
            {lead.priorOrders!.map((order) => (
              <li
                key={`${order.sessionId}-${order.sampleOrderNumber}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-[2px] bg-surface px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-heading">
                    {order.sampleOrderLabel ?? `SO-${order.sampleOrderNumber ?? '—'}`}
                  </p>
                  <p className="type-caption text-body/80">
                    {statusMeta(order.status).label}
                    {order.paidAt ? ` · ${formatDateTime(order.paidAt)}` : ''}
                    {order.amount != null
                      ? ` · ${formatMoney(order.amount, String(order.currency ?? 'usd'))}`
                      : ''}
                  </p>
                </div>
                {order.sampleOrderNumber != null && (
                  <Link
                    to={`/admin/orders/${order.sampleOrderNumber}`}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    Open →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="type-h5">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Detail({
  term,
  value,
  mono = false,
}: {
  term: string;
  value?: string | number | null;
  mono?: boolean;
}) {
  const display =
    value === null || value === undefined || value === '' ? '—' : String(value);
  return (
    <div>
      <dt className="text-body">{term}</dt>
      <dd className={`mt-1 text-heading ${mono ? 'break-all font-mono text-xs' : ''}`}>
        {display}
      </dd>
    </div>
  );
}
