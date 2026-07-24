import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../account/AuthContext';
import { SignInPanel } from '../../account/SignInPanel';
import { BrandLogo } from '../../components/BrandLogo';
import { CREATE_A_SCENT_PATH } from '../../routes/leadForm';
import { SaveStatus } from '../../sampling/components/layout/SaveStatus';
import { ChatTranscript } from '../components/ChatTranscript';
import { Composer } from '../components/Composer';
import {
  ConversationSidebar,
  ScentsMenuToggle,
} from '../components/ConversationSidebar';
import { FinalConceptReview } from '../components/FinalConceptReview';
import { LiveScentPanel } from '../components/LiveScentPanel';
import { OpeningPaths } from '../components/OpeningPaths';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { SampleRequestSection } from '../components/SampleRequestSection';
import { SamplingHandoffCard } from '../components/SamplingHandoffCard';
import {
  createConsultation,
  loadConsultation,
  resumeRefining,
  sendMessage,
  submitForSampling,
} from '../lib/api';
import { scentStudioAnalytics } from '../lib/analytics';
import {
  getActiveConsultationId,
  getLocalConversation,
  listLocalConversations,
  setActiveConsultationId,
  upsertLocalConversation,
  type LocalConversationEntry,
} from '../lib/conversationLibrary';
import { deriveConversationTitle } from '../lib/conversationTitle';
import type { ScentConsultation } from '../types';
import '../styles/scentStudio.css';

type UiPhase = 'opening' | 'chat' | 'concept' | 'sample' | 'contact';

export function ScentStudioExperience() {
  const navigate = useNavigate();
  const { authenticated, customer, consultations: accountConsultations, syncLocalToAccount } =
    useAuth();
  const [conversations, setConversations] = useState<LocalConversationEntry[]>([]);
  const [consultation, setConsultation] = useState<ScentConsultation | null>(null);
  const [uiPhase, setUiPhase] = useState<UiPhase>('opening');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState('');
  const [statusLine, setStatusLine] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactGateShown, setContactGateShown] = useState(false);
  const [reviewDismissed, setReviewDismissed] = useState(false);
  const [reviewAvailable, setReviewAvailable] = useState(false);

  function refreshLibrary(nextConsultation?: ScentConsultation | null) {
    if (nextConsultation) {
      upsertLocalConversation(nextConsultation);
      scentStudioAnalytics.saved();
    }
    setConversations(listLocalConversations());
    if (authenticated) {
      void syncLocalToAccount();
    }
  }

  // Merge cloud library into local cache when account consultations arrive
  useEffect(() => {
    if (!accountConsultations?.length) return;
    for (const entry of accountConsultations) {
      if (entry.snapshot) {
        upsertLocalConversation(entry.snapshot);
      }
    }
    setConversations(listLocalConversations());
  }, [accountConsultations]);

  function flashSaved() {
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  useEffect(() => {
    scentStudioAnalytics.viewed();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      const localList = listLocalConversations();
      if (!cancelled) setConversations(localList);

      const activeId = getActiveConsultationId() || localList[0]?.consultationId || null;
      if (!activeId) {
        if (!cancelled) {
          setUiPhase('opening');
          setLoading(false);
        }
        return;
      }

      const local = getLocalConversation(activeId);
      if (!local) {
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const existing = await loadConsultation(local.consultationId, local.recoveryToken);
        if (cancelled) return;
        setConsultation(existing);
        refreshLibrary(existing);
        setContactGateShown(Boolean(existing.contactCaptured));
        setReviewDismissed(Boolean(existing.reviewDismissed));
        setReviewAvailable(Boolean(existing.conceptReady || existing.reviewDismissed));
        if (existing.submittedAt) setUiPhase('chat');
        else if (existing.conceptReady && !existing.reviewDismissed) setUiPhase('concept');
        else setUiPhase('chat');
      } catch {
        if (!cancelled && local.snapshot?.messages?.length) {
          setConsultation(local.snapshot);
          setReviewDismissed(Boolean(local.snapshot.reviewDismissed));
          setUiPhase(
            local.snapshot.conceptReady && !local.snapshot.reviewDismissed ? 'concept' : 'chat',
          );
        } else if (!cancelled) {
          setUiPhase('opening');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function startWithMode(mode: 'scratch' | 'inspiration' | 'guided') {
    setSending(true);
    setError('');
    setStatusLine('Starting your project…');
    scentStudioAnalytics.modeSelected(mode);
    try {
      const created = await createConsultation(mode);
      setConsultation(created);
      refreshLibrary(created);
      setActiveConsultationId(created.consultationId);
      setReviewDismissed(false);
      setReviewAvailable(false);
      setUiPhase('chat');
      setSidebarOpen(false);
      scentStudioAnalytics.started(mode);
      flashSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start consultation');
      scentStudioAnalytics.error('start_failed');
    } finally {
      setSending(false);
      setStatusLine('');
    }
  }

  async function selectConversation(consultationId: string) {
    if (consultationId === consultation?.consultationId) {
      setSidebarOpen(false);
      return;
    }
    setError('');
    setLoading(true);
    const local = getLocalConversation(consultationId);
    if (!local) {
      setLoading(false);
      return;
    }
    setActiveConsultationId(consultationId);
    try {
      const existing = await loadConsultation(local.consultationId, local.recoveryToken);
      setConsultation(existing);
      refreshLibrary(existing);
      setReviewDismissed(Boolean(existing.reviewDismissed));
      setReviewAvailable(Boolean(existing.conceptReady || existing.reviewDismissed));
      setUiPhase(
        existing.conceptReady && !existing.reviewDismissed && !existing.submittedAt
          ? 'concept'
          : 'chat',
      );
    } catch {
      if (local.snapshot) {
        setConsultation(local.snapshot);
        setReviewDismissed(Boolean(local.snapshot.reviewDismissed));
        setUiPhase(
          local.snapshot.conceptReady && !local.snapshot.reviewDismissed ? 'concept' : 'chat',
        );
      } else {
        setError('Could not open that conversation');
        scentStudioAnalytics.error('restore_failed');
      }
    } finally {
      setLoading(false);
      setSidebarOpen(false);
    }
  }

  async function handleSend(text: string) {
    if (!consultation || sending) return;
    setSending(true);
    setError('');
    setStatusLine('Interpreting your direction…');

    const optimisticUser = {
      id: `local-${Date.now()}`,
      role: 'user' as const,
      content: text,
      createdAt: new Date().toISOString(),
    };
    setConsultation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, optimisticUser] } : prev,
    );

    try {
      setStatusLine('Refining the scent structure…');
      const result = await sendMessage(
        consultation.consultationId,
        consultation.recoveryToken,
        text,
      );
      const withTitle = {
        ...result.consultation,
        title: result.consultation.title || deriveConversationTitle(result.consultation),
      };
      setConsultation(withTitle);
      refreshLibrary(withTitle);
      flashSaved();

      const turns = withTitle.messages.filter((m) => m.role === 'user').length;
      if (withTitle.scentCard && turns <= 2) {
        scentStudioAnalytics.initialDirection(withTitle.startMode, turns);
      }

      // Only open the review UI when this turn newly marks the concept ready.
      // Sticky conceptReady after "Refine this scent" must not bounce the user back.
      if (result.readyForFormula && !withTitle.reviewDismissed) {
        setReviewDismissed(false);
        setReviewAvailable(true);
        scentStudioAnalytics.conceptCompleted(withTitle.startMode, withTitle.scentCard?.version);
        setUiPhase('concept');
      } else {
        if (withTitle.reviewDismissed) {
          setReviewDismissed(true);
          setReviewAvailable(true);
        }
        if (
          withTitle.scentCard &&
          turns >= 3 &&
          !withTitle.contactCaptured &&
          !contactGateShown
        ) {
          setContactGateShown(true);
          scentStudioAnalytics.contactGate();
        }
      }
    } catch (e) {
      setConsultation((prev) =>
        prev
          ? {
              ...prev,
              messages: prev.messages.filter((m) => m.id !== optimisticUser.id),
            }
          : prev,
      );
      setError(e instanceof Error ? e.message : 'Message failed — you can retry without losing work.');
      scentStudioAnalytics.error('message_failed');
    } finally {
      setSending(false);
      setStatusLine('');
    }
  }

  async function handleSubmit(contact: {
    fullName: string;
    email: string;
    brandName: string;
    country: string;
    phone: string;
  }) {
    if (!consultation) return;
    setSubmitting(true);
    setError('');
    scentStudioAnalytics.sampleRequestStarted();
    try {
      const next = await submitForSampling(
        consultation.consultationId,
        consultation.recoveryToken,
        contact,
      );
      setConsultation(next);
      refreshLibrary(next);
      setUiPhase('chat');
      flashSaved();
      scentStudioAnalytics.sampleRequestCompleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submit failed');
      scentStudioAnalytics.error('submit_failed');
    } finally {
      setSubmitting(false);
    }
  }

  function handleExit() {
    if (consultation) refreshLibrary(consultation);
    navigate(CREATE_A_SCENT_PATH);
  }

  const conversationTitle =
    consultation?.title ||
    deriveConversationTitle(consultation) ||
    'New scent conversation';
  const submitted = Boolean(consultation?.submittedAt);
  const thinkingLabel = statusLine || (sending ? 'Preparing the next question…' : '');

  return (
    <div className="sampling-experience flex h-[100dvh] max-h-[100dvh] overflow-hidden">
      <ConversationSidebar
        conversations={conversations}
        activeId={consultation?.consultationId}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onSelect={(id) => void selectConversation(id)}
        onNewScent={() => {
          setConsultation(null);
          setUiPhase('opening');
          setActiveConsultationId(null);
          setReviewDismissed(false);
          setReviewAvailable(false);
          setSidebarOpen(false);
        }}
        creating={sending && !consultation}
        accountEmail={customer?.email}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 shrink-0 border-b border-[var(--sampling-border)]/70 bg-[var(--sampling-cream)]">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 lg:gap-3">
            <div className="min-w-0 justify-self-start">
              <ScentsMenuToggle open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
              {consultation && (
                <p className="hidden truncate text-sm font-semibold text-[var(--sampling-heading)] lg:block lg:max-w-[14rem]">
                  {conversationTitle}
                </p>
              )}
            </div>
            <Link
              to={CREATE_A_SCENT_PATH}
              className="justify-self-center"
              aria-label="Create a Scent"
            >
              <BrandLogo />
            </Link>
            <div className="relative flex items-center justify-end justify-self-end">
              <span className="pointer-events-none absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 sm:block">
                <SaveStatus visible={savedFlash} />
              </span>
              <button
                type="button"
                onClick={handleExit}
                className="whitespace-nowrap text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
              >
                Exit
              </button>
            </div>
          </div>
          {consultation && (
            <div className="border-t border-[var(--sampling-border)]/50 px-4 py-2 sm:px-6 sm:py-2.5">
              <p className="mb-1.5 truncate text-xs font-medium text-[var(--sampling-muted)] lg:hidden">
                {conversationTitle}
              </p>
              <ProgressIndicator currentStage={consultation.currentStage || consultation.stage} />
            </div>
          )}
        </header>

        {loading && !consultation && uiPhase !== 'opening' ? (
          <main className="scent-studio-scroll flex min-h-0 flex-1 items-center justify-center overflow-y-auto">
            <p className="text-sm text-[var(--sampling-muted)]">Restoring your session…</p>
          </main>
        ) : uiPhase === 'opening' || !consultation ? (
          <main className="scent-studio-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {error && (
              <p className="px-5 pt-4 text-sm text-[var(--sampling-error)] sm:px-8">{error}</p>
            )}
            <OpeningPaths onSelect={(mode) => void startWithMode(mode)} busy={sending} />
            <div className="mx-auto max-w-xl px-5 pb-6 sm:px-8">
              <SignInPanel
                nextPath="/create-a-scent/studio"
                compact
                title={authenticated ? 'Account synced' : 'Sync across devices'}
              />
            </div>
            {conversations.length > 0 && (
              <p className="px-5 pb-10 text-center text-sm text-[var(--sampling-muted)] sm:px-8 lg:hidden">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="font-semibold hover:text-[var(--sampling-heading)]"
                >
                  Open saved scents
                </button>
              </p>
            )}
          </main>
        ) : (
          <>
            <main className="scent-studio-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-4 pb-phi-5 sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8 lg:px-8">
                <div className="min-w-0 space-y-4 sm:space-y-5">
                  {consultation.scentCard && (
                    <div className="lg:hidden">
                      <LiveScentPanel card={consultation.scentCard} collapsedDefault />
                    </div>
                  )}

                  {uiPhase === 'concept' && consultation.scentCard ? (
                    <FinalConceptReview
                      card={consultation.scentCard}
                      onRefine={() => {
                        void (async () => {
                          setUiPhase('chat');
                          setReviewDismissed(true);
                          setReviewAvailable(true);
                          try {
                            const next = await resumeRefining(
                              consultation.consultationId,
                              consultation.recoveryToken,
                            );
                            setConsultation(next);
                            refreshLibrary(next);
                          } catch {
                            // Stay in chat even if the server flag fails to clear;
                            // local dismiss still prevents review bounce.
                            setConsultation((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    conceptReady: false,
                                    reviewDismissed: true,
                                  }
                                : prev,
                            );
                          }
                        })();
                      }}
                      onRequestSamples={() => {
                        scentStudioAnalytics.sampleCtaViewed();
                        setUiPhase('sample');
                      }}
                    />
                  ) : null}

                  {uiPhase === 'sample' ? (
                    <SampleRequestSection
                      onContinue={() => {
                        scentStudioAnalytics.contactGate();
                        setUiPhase('contact');
                      }}
                      onSaveLater={() => {
                        refreshLibrary(consultation);
                        flashSaved();
                        navigate(CREATE_A_SCENT_PATH);
                      }}
                    />
                  ) : null}

                  {(uiPhase === 'chat' || uiPhase === 'contact') && (
                    <ChatTranscript
                      messages={consultation.messages}
                      pending={sending}
                      disabled={sending || submitted}
                      onQuickReply={(text) => void handleSend(text)}
                    />
                  )}

                  {uiPhase === 'chat' &&
                    reviewDismissed &&
                    reviewAvailable &&
                    consultation.scentCard &&
                    !submitted && (
                      <div className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-4 py-3">
                        <p className="text-sm text-[var(--sampling-heading)]">
                          Keep refining here — your concept review stays available when you want it.
                        </p>
                        <button
                          type="button"
                          className="mt-2 text-sm font-semibold text-[var(--sampling-orange)] hover:underline"
                          onClick={() => {
                            setReviewDismissed(false);
                            setUiPhase('concept');
                          }}
                        >
                          Review concept
                        </button>
                      </div>
                    )}

                  {thinkingLabel && (
                    <p className="text-sm text-[var(--sampling-muted)]" aria-live="polite">
                      {thinkingLabel}
                    </p>
                  )}

                  {error && (
                    <div className="rounded-[2px] border border-[var(--sampling-error)]/30 bg-white px-3 py-2 text-sm text-[var(--sampling-error)]">
                      {error}{' '}
                      <button
                        type="button"
                        className="font-semibold underline"
                        onClick={() => setError('')}
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {uiPhase === 'contact' && !submitted && (
                    <SamplingHandoffCard
                      concept={consultation.scentCard?.oneSentenceConcept}
                      submitting={submitting}
                      onSubmit={(contact) => void handleSubmit(contact)}
                    />
                  )}

                  {contactGateShown &&
                    uiPhase === 'chat' &&
                    !consultation.contactCaptured &&
                    consultation.scentCard &&
                    !submitted && (
                      <div className="space-y-3">
                        {!authenticated ? (
                          <SignInPanel
                            nextPath="/create-a-scent/studio"
                            compact
                            title="Sign in to save across devices"
                          />
                        ) : null}
                        <div className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-4 py-4">
                          <p className="text-sm text-[var(--sampling-heading)]">
                            Your direction is taking shape. Save contact details when you are ready
                            for sampling — you can keep refining first.
                          </p>
                          <button
                            type="button"
                            className="mt-3 text-sm font-semibold text-[var(--sampling-orange)] hover:underline"
                            onClick={() => setUiPhase('contact')}
                          >
                            Continue to sampling details
                          </button>
                        </div>
                      </div>
                    )}

                  {submitted && (
                    <div className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-4 py-5 text-center">
                      <p className="font-serif text-phi-lg text-[var(--sampling-heading)]">
                        Brief received
                      </p>
                      <p className="mt-2 text-sm text-[var(--sampling-muted)]">
                        Your scent direction has been emailed to Brandsamor for formulation and
                        sampling review.
                      </p>
                    </div>
                  )}
                </div>

                <aside className="hidden min-w-0 lg:block">
                  <div className="sticky top-4 space-y-4">
                    {consultation.scentCard ? (
                      <LiveScentPanel card={consultation.scentCard} />
                    ) : (
                      <div className="rounded-[2px] border border-dashed border-[var(--sampling-border)] px-4 py-5 text-sm text-[var(--sampling-muted)]">
                        Your live scent concept will appear here as the direction takes shape.
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </main>

            {uiPhase === 'chat' && !submitted && (
              <div className="shrink-0">
                <Composer
                  disabled={sending}
                  onSend={(text) => void handleSend(text)}
                  placeholder="Describe your scent…"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
