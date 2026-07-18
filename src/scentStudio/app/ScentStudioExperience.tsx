import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/BrandLogo';
import { SaveStatus } from '../../sampling/components/layout/SaveStatus';
import { ChatTranscript } from '../components/ChatTranscript';
import { Composer } from '../components/Composer';
import { SamplingHandoffCard } from '../components/SamplingHandoffCard';
import { ScentCard } from '../components/ScentCard';
import {
  createConsultation,
  loadConsultation,
  sendMessage,
  submitForSampling,
} from '../lib/api';
import { SCENT_STUDIO_STORAGE_KEY, type ScentConsultation } from '../types';
import '../styles/scentStudio.css';

type StoredIds = {
  consultationId: string;
  recoveryToken: string;
};

function readStoredIds(): StoredIds | null {
  try {
    const raw = localStorage.getItem(SCENT_STUDIO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredIds;
    if (!parsed?.consultationId || !parsed?.recoveryToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredIds(ids: StoredIds | null) {
  if (!ids) {
    localStorage.removeItem(SCENT_STUDIO_STORAGE_KEY);
    return;
  }
  localStorage.setItem(SCENT_STUDIO_STORAGE_KEY, JSON.stringify(ids));
}

export function ScentStudioExperience() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'welcome' | 'chat'>('welcome');
  const [consultation, setConsultation] = useState<ScentConsultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState('');
  const [showHandoff, setShowHandoff] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const stored = readStoredIds();
        if (!stored) {
          if (!cancelled) setLoading(false);
          return;
        }
        const existing = await loadConsultation(stored.consultationId, stored.recoveryToken);
        if (cancelled) return;
        setConsultation(existing);
        setPhase('chat');
        if (existing.stage === 'ready_for_formula' && !existing.submittedAt) {
          setShowHandoff(true);
        }
      } catch {
        writeStoredIds(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function flashSaved() {
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  async function startCreating() {
    setSending(true);
    setError('');
    try {
      const created = await createConsultation();
      writeStoredIds({
        consultationId: created.consultationId,
        recoveryToken: created.recoveryToken,
      });
      setConsultation(created);
      setPhase('chat');
      flashSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start consultation');
    } finally {
      setSending(false);
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
      setConsultation(result.consultation);
      flashSaved();
      const lower = text.toLowerCase();
      if (
        result.readyForFormula ||
        lower.includes('prepare for sampling') ||
        result.consultation.stage === 'ready_for_formula'
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
      setShowHandoff(false);
      flashSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  function handleExit() {
    navigate('/');
  }

  if (loading) {
    return (
      <div className="sampling-experience flex min-h-screen items-center justify-center">
        <p className="text-sm text-[var(--sampling-muted)]">Loading…</p>
      </div>
    );
  }

  if (phase === 'welcome' || !consultation) {
    return (
      <div className="sampling-experience">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 sm:px-6 sm:py-5">
          <div aria-hidden />
          <Link to="/" className="justify-self-center" aria-label="Brandsamor home">
            <BrandLogo />
          </Link>
          <div className="justify-self-end">
            <button
              type="button"
              onClick={handleExit}
              className="text-sm font-semibold text-[var(--sampling-muted)] hover:text-[var(--sampling-heading)]"
            >
              Exit
            </button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-16">
          <p className="type-eyebrow">AI Scent Studio</p>
          <h1 className="mt-4 font-serif text-phi-2xl leading-tight text-[var(--sampling-heading)] sm:text-phi-3xl">
            Create Your Fragrance Through Conversation
          </h1>
          <p className="mx-auto mt-4 max-w-md type-body text-[var(--sampling-muted)]">
            Tell us what you want your fragrance to smell and feel like. Start with a perfume you
            already know or describe something completely new. We will help you refine the direction
            until it is ready for sampling.
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
        </main>
      </div>
    );
  }

  const submitted = Boolean(consultation.submittedAt);

  return (
    <div className="sampling-experience flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--sampling-border)]/70 bg-[var(--sampling-cream)]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 sm:py-4">
          <div aria-hidden />
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
              Save + exit
            </button>
          </div>
        </div>
        {consultation.scentCard && (
          <div className="mx-auto max-w-2xl px-5 pb-3 sm:px-8">
            <ScentCard card={consultation.scentCard} />
          </div>
        )}
      </header>

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
            <p className="font-serif text-phi-lg text-[var(--sampling-heading)]">Brief received</p>
            <p className="mt-2 text-sm text-[var(--sampling-muted)]">
              Your scent direction has been sent to the Brandsamor development team for formulation
              and sampling review.
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
    </div>
  );
}
