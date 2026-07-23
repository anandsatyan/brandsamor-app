import { trackEvent } from '../../analytics/gtag';

type SamplingEvent =
  | 'sampling_started'
  | 'lead_step_completed'
  | 'step_viewed'
  | 'step_completed'
  | 'question_answered'
  | 'recommend_for_me_selected'
  | 'brief_reviewed'
  | 'curation_started'
  | 'curation_completed'
  | 'save_exit'
  | 'prototype_completed'
  | 'payment_succeeded'
  | 'brief_reset';

export const trackSamplingEvent = (
  event: SamplingEvent,
  payload?: Record<string, unknown>,
) => {
  if (import.meta.env.DEV) {
    console.info(`[Sampling Analytics] ${event}`, payload ?? {});
  }

  const flat: Record<string, string | number | boolean | undefined> = {};
  for (const [key, value] of Object.entries(payload ?? {})) {
    if (value == null) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      flat[key] = value;
    } else {
      flat[key] = String(value);
    }
  }

  trackEvent(`sampling_${event}`, flat);
};
