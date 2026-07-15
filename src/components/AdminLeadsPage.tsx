import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminShell, type AdminStats } from './admin/AdminShell';
import {
  formatDateTime,
  formatFragranceRecommendation,
  formatList,
  formatMoney,
  statusMeta,
  stepLabel,
} from './admin/adminFormat';

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
  createdAt?: string | null;
  updatedAt?: string | null;
};

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'curated', label: 'Curated' },
  { value: 'checkout_started', label: 'Checkout' },
  { value: 'paid', label: 'Paid' },
] as const;

export const AdminLeadsPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [selected, setSelected] = useState<AdminLead | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
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
        if (debouncedQuery) params.set('q', debouncedQuery);

        const [statsRes, listRes] = await Promise.all([
          fetch('/api/admin/stats', { credentials: 'include' }),
          fetch(`/api/admin/leads?${params.toString()}`, { credentials: 'include' }),
        ]);

        if (statsRes.status === 401 || listRes.status === 401) {
          navigate('/login?next=/admin', { replace: true });
          return;
        }

        const statsData = await statsRes.json();
        const listData = await listRes.json();
        if (!cancelled) {
          setStats(statsData.stats ?? null);
          setLeads(listData.leads ?? []);
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
  }, [debouncedQuery, navigate, statusFilter]);

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
          <div className="space-y-3 border-b border-border/50 px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="type-h4">Leads</h2>
                <p className="mt-1 type-caption text-body">
                  {leads.length} shown
                  {statusFilter !== 'all' ? ` · ${statusFilter.replace(/_/g, ' ')}` : ''}
                </p>
              </div>
              <Link
                to="/admin/orders"
                className="shrink-0 text-sm font-semibold text-accent hover:underline"
              >
                View orders →
              </Link>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, brand, phone…"
                className="w-full rounded-[2px] border border-border bg-white px-3 py-2 text-sm text-heading placeholder:text-body/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((filter) => {
                const active = statusFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setStatusFilter(filter.value)}
                    className={`rounded-[2px] border px-2.5 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-heading bg-heading text-white'
                        : 'border-border/70 bg-white text-body hover:text-heading'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="px-4 py-3 text-sm text-[#B42318]">{error}</p>}

          <ul className="max-h-[70vh] divide-y divide-border/50 overflow-y-auto">
            {leads.map((lead) => {
              const active = lead.sessionId === sessionId;
              const meta = statusMeta(lead.status);
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
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-heading">
                          {lead.lead?.fullName || 'Unknown contact'}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-body">
                          {lead.lead?.email || 'No email'}
                          {lead.lead?.brandName ? ` · ${lead.lead.brandName}` : ''}
                        </p>
                        <p className="mt-1 type-caption text-body/80">
                          Last step: {stepLabel(lead.lastCompletedStep, lead.currentStep)}
                          {' · '}
                          {formatDateTime(lead.updatedAt)}
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
            <LeadDetail lead={detail} />
          )}
        </section>
      </div>
    </AdminShell>
  );
};

function LeadDetail({ lead }: { lead: AdminLead }) {
  const meta = statusMeta(lead.status);
  const shipping = lead.checkout?.shipping;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="type-eyebrow">Lead detail</p>
          <h2 className="mt-2 type-h3">{lead.lead?.fullName || 'Unknown contact'}</h2>
          <p className="mt-1 text-sm text-body">{lead.lead?.email}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-xs font-semibold ${meta.className}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
          {meta.label}
        </span>
      </div>

      <dl className="grid gap-3 rounded-[2px] bg-surface p-4 text-sm sm:grid-cols-2">
        <Detail term="Phone" value={lead.lead?.phone} />
        <Detail term="Brand" value={lead.lead?.brandName} />
        <Detail term="Country" value={lead.lead?.country} />
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
                    shipping.country,
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
        <Section title="Paid order">
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

      {lead.stepHistory.length > 0 && (
        <Section title="Step history">
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
        </Section>
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
