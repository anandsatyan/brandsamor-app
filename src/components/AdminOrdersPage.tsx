import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminShell, type AdminStats } from './admin/AdminShell';
import {
  formatCountry,
  formatDateTime,
  formatFragranceRecommendation,
  formatMoney,
  statusMeta,
} from './admin/adminFormat';

type AdminOrder = {
  sessionId: string;
  status: string;
  order: {
    sampleOrderNumber?: number;
    sampleOrderLabel?: string;
    transactionId?: string;
    amount?: number;
    currency?: string;
    paidAt?: string;
    canceledAt?: string | null;
    cancelReason?: string | null;
    refund?: {
      amount?: number | null;
      currency?: string | null;
      refundedAt?: string | null;
      note?: string | null;
      recordedBy?: string | null;
    } | null;
  } | null;
  payment: Record<string, unknown> | null;
  lead: {
    fullName?: string;
    email?: string;
    phone?: string;
    brandName?: string;
    country?: string;
  } | null;
  checkout: Record<string, unknown> | null;
  recommendations: Array<{
    fragranceId?: string;
    fragranceSlug?: string;
    fragranceNumber?: string | number | null;
    fragranceName?: string | null;
    inspiredBy?: { brand?: string | null; fragrance?: string | null } | null;
    role?: string;
    reason?: string;
    stretch?: boolean;
    exclusionConflicts?: string[];
  }>;
  paidAt?: string | null;
  updatedAt?: string | null;
};

export const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [selected, setSelected] = useState<AdminOrder | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [showCancelForm, setShowCancelForm] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [statsRes, listRes] = await Promise.all([
          fetch('/api/admin/stats', { credentials: 'include' }),
          fetch('/api/admin/orders', { credentials: 'include' }),
        ]);

        if (statsRes.status === 401 || listRes.status === 401) {
          navigate('/login?next=/admin/orders', { replace: true });
          return;
        }

        const statsData = await statsRes.json();
        const listData = await listRes.json();
        if (!cancelled) {
          setStats(statsData.stats ?? null);
          setOrders(listData.orders ?? []);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load orders');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (!orderNumber) {
      setSelected(null);
      setShowCancelForm(false);
      setCancelNote('');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}`, {
          credentials: 'include',
        });
        if (res.status === 401) {
          navigate('/login?next=/admin/orders', { replace: true });
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error ?? 'Order not found');
        }
        const data = await res.json();
        if (!cancelled) {
          setSelected(data.order ?? null);
          setShowCancelForm(false);
          setCancelNote('');
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load order');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderNumber, navigate]);

  async function handleCancelOrder() {
    if (!selected?.order?.sampleOrderNumber || canceling) return;
    const number = selected.order.sampleOrderNumber;
    const amountLabel = formatMoney(
      typeof selected.payment?.amount === 'number'
        ? (selected.payment.amount as number)
        : selected.order?.amount,
      String(selected.payment?.currency ?? selected.order?.currency ?? 'usd'),
    );

    const confirmed = window.confirm(
      `Cancel SO-${number} and record a ${amountLabel} refund?\n\nLead data will be kept. Status will change from Paid to Canceled.`,
    );
    if (!confirmed) return;

    setCanceling(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(String(number))}/cancel`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: 'Unable to service — refunded to customer',
          note:
            cancelNote.trim() ||
            `Full refund of ${amountLabel} recorded after refund to customer`,
        }),
      });
      if (res.status === 401) {
        navigate('/login?next=/admin/orders', { replace: true });
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? 'Failed to cancel order');
      }
      const updated = data.order as AdminOrder;
      setSelected(updated);
      setOrders((prev) =>
        prev.map((o) => (o.sessionId === updated.sessionId ? { ...o, ...updated } : o)),
      );
      setShowCancelForm(false);
      setCancelNote('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to cancel order');
    } finally {
      setCanceling(false);
    }
  }

  return (
    <AdminShell
      title="Admin Orders | Brandsamor"
      description="Private Brandsamor sample kit order administration."
      canonicalUrl="https://www.brandsamor.com/admin/orders"
      activeTab="orders"
      loading={loading && orders.length === 0}
      stats={stats}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <section className="rounded-[2px] border border-border/60 bg-secondary/40">
          <div className="flex items-start justify-between gap-3 border-b border-border/50 px-4 py-4">
            <div>
              <h2 className="type-h4">Sample kit orders</h2>
              <p className="mt-1 type-caption text-body">{orders.length} orders</p>
            </div>
            <Link to="/admin" className="shrink-0 text-sm font-semibold text-accent hover:underline">
              ← Leads
            </Link>
          </div>
          {error && <p className="px-4 py-3 text-sm text-[#B42318]">{error}</p>}
          <ul className="max-h-[70vh] divide-y divide-border/50 overflow-y-auto">
            {orders.map((order) => {
              const number = order.order?.sampleOrderNumber;
              const active = String(number) === String(orderNumber);
              const meta = statusMeta(order.status);
              return (
                <li key={order.sessionId}>
                  <button
                    type="button"
                    className={`w-full px-4 py-4 text-left transition-colors ${
                      active ? 'bg-white' : 'hover:bg-white/70'
                    }`}
                    onClick={() => navigate(`/admin/orders/${number}`)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-heading">
                          {order.order?.sampleOrderLabel ?? `SO-${number ?? '—'}`}
                        </p>
                        <p className="mt-1 truncate text-sm text-body">
                          {order.lead?.fullName || 'Unknown'} · {order.lead?.email || 'No email'}
                        </p>
                        <p className="mt-1 type-caption text-body/80">
                          {formatDateTime(order.order?.paidAt || order.paidAt)}
                          {order.lead?.country ? ` · ${formatCountry(order.lead.country)}` : ''}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-medium text-heading">
                          {formatMoney(
                            typeof order.payment?.amount === 'number'
                              ? (order.payment.amount as number)
                              : order.order?.amount,
                            String(order.payment?.currency ?? order.order?.currency ?? 'usd'),
                          )}
                        </p>
                        <span
                          className={`mt-1 inline-flex items-center gap-1 rounded-[2px] border px-2 py-0.5 text-[11px] font-semibold ${meta.className}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
                          {meta.label}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
            {!loading && orders.length === 0 && (
              <li className="px-4 py-8 text-sm text-body">No sample kit orders yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6">
          {!selected ? (
            <p className="type-body text-body">Select an order to view full details.</p>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="type-eyebrow">Order detail</p>
                  <h2 className="mt-2 type-h3">
                    {selected.order?.sampleOrderLabel ??
                      `SO-${selected.order?.sampleOrderNumber ?? '—'}`}
                  </h2>
                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-[2px] border px-2 py-0.5 text-[11px] font-semibold ${statusMeta(selected.status).className}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusMeta(selected.status).dotClassName}`}
                    />
                    {statusMeta(selected.status).label}
                  </span>
                </div>
                {selected.status === 'paid' && (
                  <button
                    type="button"
                    className="btn-primary shrink-0 bg-stone-800 px-3 py-2 text-sm"
                    onClick={() => setShowCancelForm((v) => !v)}
                  >
                    {showCancelForm ? 'Close cancel' : 'Cancel order'}
                  </button>
                )}
              </div>

              {showCancelForm && selected.status === 'paid' && (
                <div className="rounded-[2px] border border-stone-300 bg-stone-50 p-4">
                  <h3 className="type-h5">Cancel & record refund</h3>
                  <p className="mt-1 text-sm text-body">
                    Keeps all lead and kit data. Marks the order canceled and records a full refund of{' '}
                    {formatMoney(
                      typeof selected.payment?.amount === 'number'
                        ? (selected.payment.amount as number)
                        : selected.order?.amount,
                      String(selected.payment?.currency ?? selected.order?.currency ?? 'usd'),
                    )}
                    . Refund the customer in Stripe (or your payment method) before confirming.
                  </p>
                  <label className="mt-3 block text-sm text-body">
                    Refund note (optional)
                    <textarea
                      className="mt-1 w-full rounded-[2px] border border-border bg-white px-3 py-2 text-sm text-heading"
                      rows={3}
                      value={cancelNote}
                      onChange={(e) => setCancelNote(e.target.value)}
                      placeholder="e.g. Unable to service — $100 refunded via Stripe"
                    />
                  </label>
                  <button
                    type="button"
                    className="btn-primary mt-3 bg-stone-800 px-3 py-2 text-sm disabled:opacity-60"
                    disabled={canceling}
                    onClick={() => void handleCancelOrder()}
                  >
                    {canceling ? 'Canceling…' : 'Confirm cancel & refund'}
                  </button>
                </div>
              )}

              {selected.status === 'canceled' && selected.order?.refund && (
                <div className="rounded-[2px] border border-stone-300 bg-stone-50 p-4">
                  <h3 className="type-h5">Refund recorded</h3>
                  <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-body">Refund amount</dt>
                      <dd className="mt-1 font-medium text-heading">
                        {formatMoney(
                          selected.order.refund.amount ?? undefined,
                          String(selected.order.refund.currency ?? 'usd'),
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body">Refunded at</dt>
                      <dd className="mt-1 text-heading">
                        {formatDateTime(selected.order.refund.refundedAt)}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-body">Reason</dt>
                      <dd className="mt-1 text-heading">
                        {selected.order.cancelReason || '—'}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-body">Note</dt>
                      <dd className="mt-1 text-heading">{selected.order.refund.note || '—'}</dd>
                    </div>
                  </dl>
                </div>
              )}

              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-body">Transaction ID</dt>
                  <dd className="mt-1 break-all font-mono text-heading">
                    {selected.order?.transactionId ?? '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-body">Payment intent</dt>
                  <dd className="mt-1 break-all font-mono text-heading">
                    {String(selected.payment?.paymentIntentId ?? '—')}
                  </dd>
                </div>
                <div>
                  <dt className="text-body">Amount</dt>
                  <dd className="mt-1 text-heading">
                    {formatMoney(
                      typeof selected.payment?.amount === 'number'
                        ? (selected.payment.amount as number)
                        : selected.order?.amount,
                      String(selected.payment?.currency ?? selected.order?.currency ?? 'usd'),
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-body">Paid at</dt>
                  <dd className="mt-1 text-heading">
                    {formatDateTime(selected.order?.paidAt || selected.paidAt)}
                  </dd>
                </div>
              </dl>

              <div>
                <h3 className="type-h5">Customer</h3>
                <div className="mt-2 space-y-1 text-sm text-body">
                  <p className="text-heading">{selected.lead?.fullName}</p>
                  <p>{selected.lead?.email}</p>
                  <p>{selected.lead?.phone}</p>
                  <p>{selected.lead?.brandName}</p>
                  <p>{formatCountry(selected.lead?.country)}</p>
                </div>
                {selected.sessionId && (
                  <Link
                    to={`/admin/leads/${selected.sessionId}`}
                    className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline"
                  >
                    Open full lead CRM →
                  </Link>
                )}
              </div>

              <div>
                <h3 className="type-h5">Checkout</h3>
                <pre className="mt-2 overflow-x-auto rounded-[2px] bg-surface p-3 text-xs text-body">
                  {JSON.stringify(selected.checkout, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="type-h5">Payment record</h3>
                <pre className="mt-2 overflow-x-auto rounded-[2px] bg-surface p-3 text-xs text-body">
                  {JSON.stringify(selected.payment, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="type-h5">Recommendations</h3>
                <ul className="mt-2 space-y-2 text-sm text-body">
                  {selected.recommendations.map((rec, index) => (
                    <li
                      key={`${rec.fragranceSlug ?? rec.fragranceId}-${index}`}
                      className="rounded-[2px] bg-surface p-3"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {rec.fragranceNumber != null && rec.fragranceNumber !== '' && (
                          <span className="type-caption font-semibold uppercase tracking-[0.12em] text-accent">
                            No. {rec.fragranceNumber}
                          </span>
                        )}
                        {rec.role ? (
                          <span className="text-xs capitalize text-body">
                            {String(rec.role).replace(/-/g, ' ')}
                          </span>
                        ) : null}
                        {rec.stretch && (
                          <span className="rounded-[2px] border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-900">
                            Stretch — touches an exclusion
                            {rec.exclusionConflicts?.length
                              ? ` (${rec.exclusionConflicts
                                  .map((c) => c.replace(/-/g, ' '))
                                  .join(', ')})`
                              : ''}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-medium text-heading">
                        {rec.fragranceName || formatFragranceRecommendation(rec)}
                      </p>
                      {(rec.inspiredBy?.brand || rec.inspiredBy?.fragrance) && (
                        <p className="mt-1 text-sm">
                          Inspired by{' '}
                          <span className="text-heading">
                            {[rec.inspiredBy.brand, rec.inspiredBy.fragrance]
                              .filter(Boolean)
                              .join(' — ')}
                          </span>
                        </p>
                      )}
                      <p className="mt-1">{rec.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
};

/** Thin wrapper kept for route clarity if needed later. */
export const AdminOrderDetailPage = (props: Record<string, never>) => {
  void props;
  return <AdminOrdersPage />;
};
