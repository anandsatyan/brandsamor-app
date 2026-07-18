import type { ScentConsultation } from '../types';
import { SCENT_STUDIO_LIBRARY_KEY, SCENT_STUDIO_ACTIVE_KEY, SCENT_STUDIO_STORAGE_KEY } from '../types';
import { deriveConversationTitle } from './conversationTitle';

export type LocalConversationEntry = {
  consultationId: string;
  recoveryToken: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  submittedAt?: string | null;
  stage?: string;
  snapshot: ScentConsultation;
};

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function listLocalConversations(): LocalConversationEntry[] {
  migrateLegacyActivePointer();
  const list = safeParse<LocalConversationEntry[]>(localStorage.getItem(SCENT_STUDIO_LIBRARY_KEY)) || [];
  return [...list].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getActiveConsultationId(): string | null {
  migrateLegacyActivePointer();
  return localStorage.getItem(SCENT_STUDIO_ACTIVE_KEY);
}

export function setActiveConsultationId(consultationId: string | null) {
  if (!consultationId) {
    localStorage.removeItem(SCENT_STUDIO_ACTIVE_KEY);
    return;
  }
  localStorage.setItem(SCENT_STUDIO_ACTIVE_KEY, consultationId);
}

export function getLocalConversation(consultationId: string): LocalConversationEntry | null {
  return listLocalConversations().find((c) => c.consultationId === consultationId) ?? null;
}

export function upsertLocalConversation(consultation: ScentConsultation): LocalConversationEntry {
  const now = new Date().toISOString();
  const title = deriveConversationTitle(consultation);
  const list = listLocalConversations();
  const existing = list.find((c) => c.consultationId === consultation.consultationId);
  const entry: LocalConversationEntry = {
    consultationId: consultation.consultationId,
    recoveryToken: consultation.recoveryToken,
    title,
    updatedAt: now,
    createdAt: existing?.createdAt || now,
    submittedAt: consultation.submittedAt
      ? typeof consultation.submittedAt === 'string'
        ? consultation.submittedAt
        : new Date(consultation.submittedAt).toISOString()
      : null,
    stage: consultation.stage,
    snapshot: {
      ...consultation,
      // Ensure title-friendly card stays on snapshot
      scentCard: consultation.scentCard
        ? { ...consultation.scentCard, workingName: consultation.scentCard.workingName }
        : consultation.scentCard,
    },
  };

  const next = [entry, ...list.filter((c) => c.consultationId !== entry.consultationId)].slice(0, 40);
  localStorage.setItem(SCENT_STUDIO_LIBRARY_KEY, JSON.stringify(next));
  setActiveConsultationId(entry.consultationId);
  return entry;
}

export function removeLocalConversation(consultationId: string) {
  const next = listLocalConversations().filter((c) => c.consultationId !== consultationId);
  localStorage.setItem(SCENT_STUDIO_LIBRARY_KEY, JSON.stringify(next));
  if (getActiveConsultationId() === consultationId) {
    setActiveConsultationId(next[0]?.consultationId ?? null);
  }
}

/** Migrate single-session pointer from v1 storage into the library active key. */
function migrateLegacyActivePointer() {
  if (localStorage.getItem(SCENT_STUDIO_ACTIVE_KEY)) return;
  const legacy = safeParse<{ consultationId: string; recoveryToken: string }>(
    localStorage.getItem(SCENT_STUDIO_STORAGE_KEY),
  );
  if (!legacy?.consultationId) return;
  localStorage.setItem(SCENT_STUDIO_ACTIVE_KEY, legacy.consultationId);

  const list = safeParse<LocalConversationEntry[]>(localStorage.getItem(SCENT_STUDIO_LIBRARY_KEY)) || [];
  if (!list.some((c) => c.consultationId === legacy.consultationId)) {
    const now = new Date().toISOString();
    list.unshift({
      consultationId: legacy.consultationId,
      recoveryToken: legacy.recoveryToken,
      title: 'New scent conversation',
      updatedAt: now,
      createdAt: now,
      snapshot: {
        consultationId: legacy.consultationId,
        recoveryToken: legacy.recoveryToken,
        stage: 'discovery',
        messages: [],
        scentCard: null,
      },
    });
    localStorage.setItem(SCENT_STUDIO_LIBRARY_KEY, JSON.stringify(list));
  }
}
