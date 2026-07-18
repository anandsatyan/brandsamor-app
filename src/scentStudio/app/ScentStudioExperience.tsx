import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/BrandLogo';
import { SaveStatus } from '../../sampling/components/layout/SaveStatus';
import { ChatTranscript } from '../components/ChatTranscript';
import { Composer } from '../components/Composer';
import { ConversationSidebar } from '../components/ConversationSidebar';
import { SamplingHandoffCard } from '../components/SamplingHandoffCard';
import { ScentCard } from '../components/ScentCard';
import {
  createConsultation,
  loadConsultation,
  sendMessage,
  submitForSampling,
} from '../lib/api';
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

export function ScentStudioExperience() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<LocalConversationEntry[]>([]);
  const [consultation, setConsultation] = useState<ScentConsultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState('');
  const [showHandoff, setShowHandoff] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function refreshLibrary(nextConsultation?: ScentConsultation | null) {
    if (nextConsultation) {
      upsertLocalConversation(nextConsultation);
    }
    setConversations(listLocalConversations());
  }

  function flashSaved() {
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      const localList = listLocalConversations();
      if (!cancelled) setConversations(localList);

      const activeId = getActiveConsultationId() || localList[0]?.consultationId || null;
      if (!activeId) {
        if (!cancelled) setLoading(false);
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
        setShowHandoff(existing.stage === 'ready_for_formula' && !existing.submittedAt);
      } catch {
        // Fall back to locally saved snapshot if the server copy is unavailable.
        if (!cancelled && local.snapshot?.messages?.length) {
          setConsultation(local.snapshot);
          setShowHandoff(
            local.snapshot.stage === 'ready_for_formula' && !local.snapshot.submittedAt,
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function startCreating() {
    setSending(true);
    setError('');
    setShowHandoff(false);
    try {
      const created = await createConsultation();
      setConsultation(created);
      refreshLibrary(created);
      setActiveConsultationId(created.consultationId);
      setSidebarOpen(false);
      flashSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start consultation');
    } finally {
      setSending(false);
    }
  }

  async function selectConversation(consultationId: string) {
    if (consultationId === consultation?.consultationId) {
      setSidebarOpen(false);
      return;
    }
    setError('');
    setLoading(true);
    setShowHandoff(false);
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
      setShowHandoff(existing.stage === 'ready_for_formula' && !existing.submittedAt);
    } catch {
      if (local.snapshot) {
        setConsultation(local.snapshot);
        setShowHandoff(
          local.snapshot.stage === 'ready_for_formula' && !local.snapshot.submittedAt,
        );
      } else {
        setError('Could not open that conversation');
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
      const lower = text.toLowerCase();
      if (
        result.readyForFormula ||
        lower.includes('prepare for sampling') ||
        withTitle.stage === 'ready_for_formula'
      ) {
        setShowHandoff(true);
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
      setError(e instanceof Error ? e.message : 'Message failed');
    } finally {
      setSending(false);
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
    try {
      const next = await submitForSampling(
        consultation.consultationId,
        consultation.recoveryToken,
        contact,
      );
      setConsultation(next);
      refreshLibrary(next);
      setShowHandoff(false);
      flashSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  function handleExit() {
    if (consultation) refreshLibrary(consultation);
    navigate('/');
  }

  const conversationTitle =
    consultation?.title ||
    deriveConversationTitle(consultation) ||
    'New scent conversation';
  const submitted = Boolean(consultation?.submittedAt);

  return (
    <div className="sampling-experience flex min-h-[100dvh]">
      <ConversationSidebar
        conversations={conversations}
        activeId={consultation?.consultationId}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onSelect={(id) => void selectConversation(id)}
        onNewScent={() => void startCreating()}
        creating={sending && !consultation}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-[var(--sampling-border)]/70 bg-[var(--sampling-cream)]">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 pl-20 sm:px-6 sm:py-4 lg:pl-6">
            <div className="min-w-0">
              {consultation && (
                <p className="truncate text-sm font-semibold text-[var(--sampling-heading)] lg:max-w-[14rem]">
                  {conversationTitle}
                </p>
              )}
            </div>
            <Link to="/" className="justify-self-center" aria-label="Brandsamor home">
              <BrandLogo />
            </Link>
            <div className="flex items-center justify-end gap-3 justify-self-end">
              <SaveStatus visible={savedFlash} />
              <button
                type="button"
                onClick={handleExit}
                className="text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
              >
                {consultation ? 'Save + exit' : 'Exit'}
              </button>
            </div>
          </div>
          {consultation?.scentCard && (
            <div className="mx-auto max-w-2xl px-5 pb-3 sm:px-8">
              <ScentCard card={consultation.scentCard} />
            </div>
          )}
        </header>

        {loading && !consultation ? (
          <main className="flex flex-1 items-center justify-center px-5">
            <p className="text-sm text-[var(--sampling-muted)]">Loading…</p>
          </main>
        ) : !consultation ? (
          <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-16">
            <p className="type-eyebrow">AI Scent Studio</p>
            <h1 className="mt-4 font-serif text-phi-2xl leading-tight text-[var(--sampling-heading)] sm:text-phi-3xl">
              Create Your Fragrance Through Conversation
            </h1>
            <p className="mx-auto mt-4 max-w-md type-body text-[var(--sampling-muted)]">
              Tell us what you want your fragrance to smell and feel like. Start with a perfume you
              already know or describe something completely new. Conversations are saved on this
              device.
            </p>
            {error && <p className="mt-4 text-sm text-[var(--sampling-error)]">{error}</p>}
            <button
              type="button"
              onClick={() => void startCreating()}
              disabled={sending}
              className="btn-primary mx-auto mt-8 disabled:opacity-50"
            >
              {sending ? 'Starting…' : 'Start Creating'}
            </button>
            {conversations.length > 0 && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="mt-4 text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)] lg:hidden"
              >
                Open saved scents
              </button>
            )}
          </main>
        ) : (
          <>
            <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pb-4 pt-5 sm:px-8">
              <ChatTranscript
                messages={consultation.messages}
                pending={sending}
                disabled={sending || submitted}
                onQuickReply={(text) => {
                  if (text.toLowerCase().includes('prepare for sampling')) {
                    setShowHandoff(true);
                  }
                  void handleSend(text);
                }}
              />

              {error && <p className="mt-3 text-sm text-[var(--sampling-error)]">{error}</p>}

              {showHandoff && !submitted && (
                <div className="mt-6">
                  <SamplingHandoffCard
                    concept={consultation.scentCard?.oneSentenceConcept}
                    submitting={submitting}
                    onSubmit={(contact) => void handleSubmit(contact)}
                  />
                </div>
              )}

              {submitted && (
                <div className="mt-6 rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-4 py-5 text-center">
                  <p className="font-serif text-phi-lg text-[var(--sampling-heading)]">
                    Brief received
                  </p>
                  <p className="mt-2 text-sm text-[var(--sampling-muted)]">
                    Your scent direction has been emailed to the Brandsamor development team for
                    formulation and sampling review.
                  </p>
                </div>
              )}
            </main>

            {!submitted && (
              <Composer
                disabled={sending}
                onSend={(text) => void handleSend(text)}
                placeholder="Add, remove, or change anything about the scent…"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
