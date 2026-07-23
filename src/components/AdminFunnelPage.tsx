import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminShell, type AdminStats } from './admin/AdminShell';

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
    options?: Array<{
      value: string;
      label: string;
      count: number;
    }>;
    topOption?: {
      value: string;
      label: string;
      count: number;
    } | null;
    totalSelections?: number;
  }>;
  saveExitByStep: Record<string, number>;
  insights?: {
    worstStep?: {
      key?: string;
      label: string;
      dropOffRate: number;
      dropped: number;
      reached?: number;
    } | null;
    worstQuestion?: {
      key?: string;
      label: string;
      step: string;
      missingRate: number;
      missing?: number;
      reachedStep?: number;
    } | null;
    suggestion?: string;
  };
};

export const AdminFunnelPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [funnel, setFunnel] = useState<FunnelStats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const [statsRes, funnelRes] = await Promise.all([
          fetch('/api/admin/stats', { credentials: 'include' }),
          fetch('/api/admin/funnel', { credentials: 'include' }),
        ]);

        if (statsRes.status === 401 || funnelRes.status === 401) {
          navigate('/login?next=/admin/funnel', { replace: true });
          return;
        }

        const statsData = await statsRes.json();
        const funnelData = await funnelRes.json();
        if (!funnelRes.ok) {
          throw new Error(funnelData?.error ?? 'Failed to load funnel');
        }
        if (!cancelled) {
          setStats(statsData.stats ?? null);
          setFunnel(funnelData.funnel ?? null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load funnel');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const requiredQuestions = (funnel?.questions ?? []).filter((q) => !q.optional);
  const optionalQuestions = (funnel?.questions ?? []).filter((q) => q.optional);
  const choiceQuestions = (funnel?.questions ?? []).filter(
    (q) => Array.isArray(q.options) && q.options.length > 0,
  );
  const saveExitEntries = Object.entries(funnel?.saveExitByStep ?? {}).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <AdminShell
      title="Admin Funnel | Brandsamor"
      description="Sampling funnel drop-off by step and question."
      canonicalUrl="https://www.brandsamor.com/admin/funnel"
      activeTab="funnel"
      loading={loading && !funnel}
      stats={stats}
    >
      <div className="space-y-6">
        <div className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6">
          <p className="type-eyebrow">Funnel drop-off</p>
          <h2 className="mt-2 type-h3">Where sampling journeys stall</h2>
          <p className="mt-2 max-w-3xl type-body-sm text-body">
            Built from sampling session history and answers. Use this to shorten, clarify, or remove
            the step or question with the highest drop-off.
          </p>
          {funnel && (
            <p className="mt-3 text-sm text-heading">
              <span className="font-semibold tabular-nums">{funnel.totalSessions}</span>
              <span className="text-body"> sessions analyzed</span>
            </p>
          )}
          {funnel?.insights?.suggestion && (
            <p className="mt-4 rounded-[2px] border border-border/70 bg-secondary/40 px-4 py-3 text-sm text-heading">
              {funnel.insights.suggestion}
            </p>
          )}
          {error && <p className="mt-4 text-sm text-[#B42318]">{error}</p>}
        </div>

        {funnel && (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6">
              <h3 className="type-h5">Step drop-off</h3>
              <p className="mt-1 type-caption text-body">
                Reached vs progressed past each wizard step
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-body">
                      <th className="py-2 pr-3 font-semibold">Step</th>
                      <th className="py-2 pr-3 font-semibold">Reached</th>
                      <th className="py-2 pr-3 font-semibold">Completed</th>
                      <th className="py-2 pr-3 font-semibold">Dropped</th>
                      <th className="py-2 pr-3 font-semibold">Drop %</th>
                      <th className="py-2 font-semibold">From prev</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnel.steps.map((step) => {
                      const isWorst = funnel.insights?.worstStep?.label === step.label;
                      return (
                        <tr
                          key={step.key}
                          className={`border-b border-border/40 ${
                            isWorst ? 'bg-amber-50/80 text-heading' : 'text-heading'
                          }`}
                        >
                          <td className="py-2 pr-3 font-medium">{step.label}</td>
                          <td className="py-2 pr-3 tabular-nums">{step.reached}</td>
                          <td className="py-2 pr-3 tabular-nums">{step.completed}</td>
                          <td className="py-2 pr-3 tabular-nums">{step.dropped}</td>
                          <td className="py-2 pr-3 tabular-nums">
                            {Math.round(step.dropOffRate * 100)}%
                          </td>
                          <td className="py-2 tabular-nums">
                            {Math.round(step.conversionFromPrev * 100)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6">
              <h3 className="type-h5">Questions most often unanswered</h3>
              <p className="mt-1 type-caption text-body">
                Among people who reached that step — required questions first
              </p>
              <ul className="mt-4 space-y-2">
                {requiredQuestions.map((q) => {
                  const isWorst = funnel.insights?.worstQuestion?.key === q.key;
                  return (
                    <li
                      key={q.key}
                      className={`flex items-baseline justify-between gap-3 rounded-[2px] px-3 py-2 text-sm ${
                        isWorst ? 'bg-amber-50/80' : 'bg-surface'
                      }`}
                    >
                      <span>
                        <span className="font-medium text-heading">{q.label}</span>
                        <span className="text-body"> · {q.step}</span>
                        <span className="mt-0.5 block type-caption text-body/80">
                          {q.answered}/{q.reachedStep} answered
                        </span>
                      </span>
                      <span className="shrink-0 tabular-nums font-semibold text-heading">
                        {Math.round(q.missingRate * 100)}% missing
                      </span>
                    </li>
                  );
                })}
              </ul>

              {optionalQuestions.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-body">
                    Optional fields
                  </p>
                  <ul className="mt-2 space-y-2">
                    {optionalQuestions.map((q) => (
                      <li
                        key={q.key}
                        className="flex items-baseline justify-between gap-3 rounded-[2px] bg-surface px-3 py-2 text-sm"
                      >
                        <span>
                          <span className="font-medium text-heading">{q.label}</span>
                          <span className="text-body"> · {q.step}</span>
                        </span>
                        <span className="shrink-0 tabular-nums text-heading">
                          {Math.round(q.missingRate * 100)}% blank
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6 lg:col-span-2">
              <h3 className="type-h5">Most popular answers</h3>
              <p className="mt-1 type-caption text-body">
                For each choice question, how often each option was selected among people who
                reached that step. Multi-select questions count each option once per session.
              </p>
              {choiceQuestions.length === 0 ? (
                <p className="mt-4 text-sm text-body">No choice answers recorded yet.</p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {choiceQuestions.map((q) => {
                    const maxCount = Math.max(...(q.options ?? []).map((o) => o.count), 0);
                    return (
                      <div
                        key={q.key}
                        className="rounded-[2px] border border-border/50 bg-surface px-4 py-3"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div>
                            <p className="font-medium text-heading">{q.label}</p>
                            <p className="type-caption text-body">
                              {q.step} · {q.answered}/{q.reachedStep} answered
                            </p>
                          </div>
                          {q.topOption && (
                            <p className="text-sm text-heading">
                              <span className="text-body">Top: </span>
                              <span className="font-semibold">{q.topOption.label}</span>
                              <span className="ml-1 tabular-nums text-body">
                                ({q.topOption.count})
                              </span>
                            </p>
                          )}
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {(q.options ?? [])
                            .filter((o) => o.count > 0 || (q.options?.length ?? 0) <= 12)
                            .map((option) => {
                              const width =
                                maxCount > 0 ? Math.round((option.count / maxCount) * 100) : 0;
                              const isTop = q.topOption?.value === option.value && option.count > 0;
                              return (
                                <li key={option.value} className="text-sm">
                                  <div className="flex items-baseline justify-between gap-3">
                                    <span
                                      className={
                                        isTop ? 'font-semibold text-heading' : 'text-heading'
                                      }
                                    >
                                      {option.label}
                                    </span>
                                    <span className="shrink-0 tabular-nums text-body">
                                      {option.count}
                                    </span>
                                  </div>
                                  <div className="mt-1 h-1 overflow-hidden rounded-[1px] bg-border/40">
                                    <div
                                      className={`h-full ${isTop ? 'bg-heading' : 'bg-heading/40'}`}
                                      style={{ width: `${width}%` }}
                                    />
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="rounded-[2px] border border-border/60 bg-white p-5 sm:p-6 lg:col-span-2">
              <h3 className="type-h5">Save + exit by step</h3>
              <p className="mt-1 type-caption text-body">
                Where people clicked Save + exit (tracked for new exits with step context)
              </p>
              {saveExitEntries.length === 0 ? (
                <p className="mt-4 text-sm text-body">
                  No Save + exit step tags yet. New exits will appear here with the step they left.
                </p>
              ) : (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {saveExitEntries.map(([step, count]) => (
                    <li
                      key={step}
                      className="rounded-[2px] border border-border/70 bg-surface px-3 py-2 text-sm text-heading"
                    >
                      <span className="font-medium">{step}</span>
                      <span className="ml-2 tabular-nums text-body">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {!loading && !funnel && !error && (
          <p className="type-body text-body">No funnel data available yet.</p>
        )}
      </div>
    </AdminShell>
  );
};
