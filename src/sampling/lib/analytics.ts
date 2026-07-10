type SamplingEvent =
  | 'sampling_started'
  | 'lead_step_completed'
  | 'step_viewed'
  | 'step_completed'
  | 'recommend_for_me_selected'
  | 'brief_reviewed'
  | 'curation_started'
  | 'curation_completed'
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
};
