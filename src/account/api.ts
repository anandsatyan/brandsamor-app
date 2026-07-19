export type AccountCustomer = {
  userId: string;
  email: string;
  fullName?: string | null;
};

export type AccountConsultationEntry = {
  consultationId: string;
  recoveryToken: string;
  title: string;
  stage?: string;
  currentStage?: string;
  updatedAt?: string | Date | null;
  createdAt?: string | Date | null;
  submittedAt?: string | Date | null;
  conceptReady?: boolean;
  snapshot: import('../scentStudio/types').ScentConsultation;
};

export type AccountSamplingSession = {
  sessionId: string;
  status: string;
  currentStep: number;
  lead: import('../sampling/types/sampling').LeadDetails | null;
  answers: import('../sampling/types/sampling').SamplingAnswers;
  recommendations: import('../sampling/types/sampling').Recommendation[];
  selectionSummary?: string | null;
  completed: boolean;
  updatedAt?: string | Date | null;
  createdAt?: string | Date | null;
};

async function parseJson(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchAccountSession(): Promise<{
  authenticated: boolean;
  customer: AccountCustomer | null;
}> {
  const res = await fetch('/api/account/session', { credentials: 'include' });
  return parseJson(res);
}

export async function requestMagicLink(email: string, nextPath: string) {
  const res = await fetch('/api/account/request-link', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, next: nextPath }),
  });
  return parseJson(res) as Promise<{
    ok: boolean;
    emailed: boolean;
    mode: string;
    expiresAt?: string;
    devMagicUrl?: string;
  }>;
}

export async function logoutAccount() {
  const res = await fetch('/api/account/logout', {
    method: 'POST',
    credentials: 'include',
  });
  return parseJson(res);
}

export async function fetchAccountWorkspace() {
  const res = await fetch('/api/account/workspace', { credentials: 'include' });
  return parseJson(res) as Promise<{
    customer: AccountCustomer;
    consultations: AccountConsultationEntry[];
    samplingSessions: AccountSamplingSession[];
    openSampling: AccountSamplingSession | null;
  }>;
}

export async function claimLocalArtifacts(payload: {
  consultations?: Array<{ consultationId: string; recoveryToken: string }>;
  samplingSessionIds?: string[];
}) {
  const res = await fetch('/api/account/claim', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseJson(res) as Promise<{
    ok: boolean;
    claimed: { consultations: number; sampling: number };
    consultations: AccountConsultationEntry[];
    openSampling: AccountSamplingSession | null;
  }>;
}
