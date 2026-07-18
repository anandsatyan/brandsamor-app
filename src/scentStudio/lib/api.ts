import type { ScentConsultation } from '../types';

async function parseJson(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function createConsultation(
  startMode?: 'scratch' | 'inspiration' | 'guided' | null,
): Promise<ScentConsultation> {
  const res = await fetch('/api/scent-studio/consultations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startMode: startMode || null }),
  });
  const data = await parseJson(res);
  return data.consultation as ScentConsultation;
}

export async function loadConsultation(
  consultationId: string,
  recoveryToken: string,
): Promise<ScentConsultation> {
  const params = new URLSearchParams({ token: recoveryToken });
  const res = await fetch(
    `/api/scent-studio/consultations/${encodeURIComponent(consultationId)}?${params}`,
  );
  const data = await parseJson(res);
  return data.consultation as ScentConsultation;
}

export async function sendMessage(
  consultationId: string,
  recoveryToken: string,
  message: string,
): Promise<{
  consultation: ScentConsultation;
  assistantMessage: string;
  quickReplies: string[];
  readyForFormula: boolean;
}> {
  const res = await fetch(
    `/api/scent-studio/consultations/${encodeURIComponent(consultationId)}/message`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recoveryToken, message }),
    },
  );
  return parseJson(res);
}

export async function submitForSampling(
  consultationId: string,
  recoveryToken: string,
  contact: {
    fullName: string;
    email: string;
    brandName?: string;
    country: string;
    phone?: string;
  },
): Promise<ScentConsultation> {
  const res = await fetch(
    `/api/scent-studio/consultations/${encodeURIComponent(consultationId)}/submit`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recoveryToken, contact, approved: true }),
    },
  );
  const data = await parseJson(res);
  if (data?.warning) {
    console.warn('[scent-studio]', data.warning);
  }
  return data.consultation as ScentConsultation;
}
