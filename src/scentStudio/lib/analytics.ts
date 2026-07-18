import { trackEvent } from '../../analytics/gtag';

type SafeParams = Record<string, string | number | boolean | undefined>;

function emit(eventName: string, params?: SafeParams) {
  trackEvent(eventName, {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
}

export const scentStudioAnalytics = {
  viewed: () => emit('create_scent_viewed'),
  started: (startMode: string) => emit('create_scent_started', { start_mode: startMode }),
  modeSelected: (startMode: string) => emit('create_scent_mode_selected', { start_mode: startMode }),
  initialDirection: (startMode?: string | null, turns?: number) =>
    emit('create_scent_initial_direction_created', {
      start_mode: startMode || undefined,
      completed_turns: turns,
    }),
  contactGate: () => emit('create_scent_contact_gate_viewed'),
  conceptCompleted: (startMode?: string | null, versions?: number) =>
    emit('create_scent_concept_completed', {
      start_mode: startMode || undefined,
      version_count: versions,
    }),
  saved: () => emit('create_scent_saved'),
  sampleCtaViewed: () => emit('create_scent_sample_cta_viewed'),
  sampleRequestStarted: () => emit('create_scent_sample_request_started'),
  sampleRequestCompleted: () => emit('create_scent_sample_request_completed'),
  error: (code: string) => emit('create_scent_error', { error_code: code }),
};
