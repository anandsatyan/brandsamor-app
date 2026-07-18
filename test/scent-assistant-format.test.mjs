import test from 'node:test';
import assert from 'node:assert/strict';
import { runLocalConsultantTurn } from '../server/scentStudio/localConsultant.mjs';
import { createEmptyScentState, applyStatePatch } from '../server/scentStudio/state.mjs';

test('local consultant replies use paragraph breaks and note emphasis', () => {
  const state = createEmptyScentState('fmt-1');
  const turn = runLocalConsultantTurn({
    state,
    userMessage:
      'Start from scratch. Clean tropical resort fragrance, no coconut sunscreen.',
  });

  assert.ok(turn.assistantMessage.includes('\n\n'));
  assert.ok(/\*\*[^*]+\*\*/.test(turn.assistantMessage));
});

test('refinement replies list note changes with emphasis', () => {
  let state = createEmptyScentState('fmt-2');
  const first = runLocalConsultantTurn({
    state,
    userMessage: 'Something like Imagination, but warmer.',
  });
  state = applyStatePatch(state, first.statePatch);

  const second = runLocalConsultantTurn({
    state,
    userMessage: 'Remove ginger and add cedar.',
  });

  assert.ok(second.assistantMessage.includes('\n\n'));
  assert.ok(second.assistantMessage.includes('**'));
  assert.match(second.assistantMessage, /Cedar|cedar|Ginger|ginger/);
});
