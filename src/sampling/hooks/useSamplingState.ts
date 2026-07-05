import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createInitialState,
  SAMPLING_STATE_VERSION,
  SAMPLING_STORAGE_KEY,
  type LeadDetails,
  type SamplingAnswers,
  type SamplingState,
  STEP_CONTACT,
  STEP_WELCOME,
} from '../types/sampling';
import { useLocalStorage } from './useLocalStorage';
import { trackSamplingEvent } from '../lib/analytics';

const isValidState = (value: unknown): value is SamplingState => {
  if (!value || typeof value !== 'object') return false;
  const s = value as SamplingState;
  return s.version === SAMPLING_STATE_VERSION && typeof s.currentStep === 'number';
};

export function useSamplingState() {
  const [rawState, setRawState, clearStorage] = useLocalStorage<SamplingState | null>(
    SAMPLING_STORAGE_KEY,
    null,
  );
  const [saveFlash, setSaveFlash] = useState(false);

  const state = useMemo(() => {
    if (isValidState(rawState)) return rawState;
    return createInitialState();
  }, [rawState]);

  const persist = useCallback(
    (next: SamplingState) => {
      const withTimestamp = { ...next, updatedAt: new Date().toISOString() };
      setRawState(withTimestamp);
      setSaveFlash(true);
      window.setTimeout(() => setSaveFlash(false), 2000);
    },
    [setRawState],
  );

  const updateLead = useCallback(
    (patch: Partial<LeadDetails>) => {
      persist({ ...state, lead: { ...state.lead, ...patch } });
    },
    [persist, state],
  );

  const updateAnswers = useCallback(
    (patch: Partial<SamplingAnswers>) => {
      persist({ ...state, answers: { ...state.answers, ...patch } });
    },
    [persist, state],
  );

  const goToStep = useCallback(
    (step: number) => {
      persist({ ...state, currentStep: step });
      trackSamplingEvent('step_viewed', { step });
    },
    [persist, state],
  );

  const setRecommendations = useCallback(
    (recommendations: SamplingState['recommendations'], selectionSummary?: string) => {
      persist({ ...state, recommendations, selectionSummary });
    },
    [persist, state],
  );

  const resetState = useCallback(() => {
    clearStorage();
    trackSamplingEvent('brief_reset');
  }, [clearStorage]);

  const hasSavedBrief = useMemo(() => {
    if (!isValidState(rawState)) return false;
    return rawState.currentStep > STEP_CONTACT || rawState.lead.fullName.length > 0;
  }, [rawState]);

  const resumeBrief = useCallback(() => {
    if (!isValidState(rawState)) return;
    const step = rawState.currentStep > STEP_WELCOME ? rawState.currentStep : STEP_CONTACT;
    persist({ ...rawState, currentStep: step });
    trackSamplingEvent('sampling_started', { resumed: true });
  }, [persist, rawState]);

  const startNew = useCallback(() => {
    const fresh = createInitialState();
    fresh.currentStep = STEP_CONTACT;
    persist(fresh);
    trackSamplingEvent('sampling_started', { resumed: false });
  }, [persist]);

  useEffect(() => {
    if (!isValidState(rawState) && rawState !== null) {
      console.warn('[Sampling] Clearing malformed saved state');
      clearStorage();
    }
  }, [clearStorage, rawState]);

  return {
    state,
    saveFlash,
    hasSavedBrief,
    updateLead,
    updateAnswers,
    goToStep,
    setRecommendations,
    resetState,
    resumeBrief,
    startNew,
    persist,
  };
}
