import type { LeadDetails, SamplingAnswers } from '../types/sampling';

export async function saveSamplingStep(payload: {
  sessionId?: string;
  step: string;
  lead: LeadDetails;
  answers: SamplingAnswers;
  currentStep: number;
}): Promise<{ sessionId: string } | null> {
  try {
    const res = await fetch('/api/sampling/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[sampling] Failed to save step', payload.step, res.status, body);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('[sampling] Failed to save step', payload.step, error);
    return null;
  }
}
