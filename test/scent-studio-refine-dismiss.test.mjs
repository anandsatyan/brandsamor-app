import test from 'node:test';
import assert from 'node:assert/strict';
import { processConversationTurn } from '../server/scentStudio/conversationEngine.mjs';
import { createEmptyScentState, toPublicConsultation } from '../server/scentStudio/state.mjs';

function baseDoc(overrides = {}) {
  const state = createEmptyScentState('refine-1', 'scratch');
  Object.assign(state, {
    stage: 'ready_for_formula',
    currentStage: 'review',
    conceptReady: true,
    developmentStatus: 'concept-ready',
    reviewDismissed: true,
    scentDirection: {
      ...state.scentDirection,
      primaryFamily: 'woody',
      topNotes: ['Bergamot'],
      heartNotes: ['Tea'],
      baseNotes: ['Cedar'],
      oneSentenceConcept: 'A clean woody direction.',
    },
    confidence: { overall: 0.8, scentDirection: 0.8 },
  });
  Object.assign(state, overrides);
  return {
    consultationId: 'refine-1',
    recoveryToken: 'token',
    state,
    messages: [],
  };
}

test('public consultation hides conceptReady while review is dismissed', () => {
  const doc = baseDoc();
  const pub = toPublicConsultation(doc);
  assert.equal(pub.conceptReady, false);
  assert.equal(pub.reviewDismissed, true);
});

test('after refine dismiss, follow-up turns do not re-ready the concept', async () => {
  // Force local consultant path
  process.env.SCENT_AI_FEATURE_ENABLED = 'true';
  process.env.SCENT_AI_BASE_URL = '';
  process.env.SCENT_AI_CHAT_MODEL = '';

  const { turn, nextState } = await processConversationTurn({
    doc: baseDoc(),
    userMessage: 'Make it a bit warmer',
  });

  assert.equal(turn.readyForFormula, false);
  assert.equal(nextState.conceptReady, false);
  assert.equal(nextState.reviewDismissed, true);
  assert.notEqual(nextState.stage, 'ready_for_formula');
});

test('explicit prepare-for-sampling clears dismiss and marks concept ready', async () => {
  process.env.SCENT_AI_FEATURE_ENABLED = 'true';
  process.env.SCENT_AI_BASE_URL = '';
  process.env.SCENT_AI_CHAT_MODEL = '';

  const { turn, nextState } = await processConversationTurn({
    doc: baseDoc(),
    userMessage: 'Prepare for sampling',
  });

  assert.equal(turn.readyForFormula, true);
  assert.equal(nextState.conceptReady, true);
  assert.equal(nextState.reviewDismissed, false);
});
