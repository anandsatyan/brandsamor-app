import test from 'node:test';
import assert from 'node:assert/strict';
import { runLocalConsultantTurn } from '../server/scentStudio/localConsultant.mjs';
import { createEmptyScentState, applyStatePatch } from '../server/scentStudio/state.mjs';

test('local consultant replies stay snackable with note emphasis', () => {
  const state = createEmptyScentState('fmt-1');
  const turn = runLocalConsultantTurn({
    state,
    userMessage:
      'Start from scratch. Clean tropical resort fragrance, no coconut sunscreen.',
  });

  assert.ok(turn.assistantMessage.includes('\n\n'));
  assert.ok(turn.insight || turn.question);
  assert.ok(Array.isArray(turn.noteChips));
  assert.ok(turn.assistantMessage.split(/\s+/).length < 80);
});

test('refinement replies surface change chips and stay short', () => {
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
  assert.ok(second.question || second.insight);
  assert.ok(
    (second.changes && second.changes.some((c) => /cedar|ginger/i.test(c))) ||
      /Cedar|cedar|Ginger|ginger/.test(second.assistantMessage),
  );
});
