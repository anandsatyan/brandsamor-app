import test from 'node:test';
import assert from 'node:assert/strict';
import { openingForStartMode } from '../server/scentStudio/modeOpenings.mjs';
import { createEmptyScentState, validateTurnOutput } from '../server/scentStudio/state.mjs';
import { runLocalConsultantTurn } from '../server/scentStudio/localConsultant.mjs';
import { applyStatePatch } from '../server/scentStudio/state.mjs';

test('mode openings are outcome-oriented', () => {
  const scratch = openingForStartMode('scratch');
  assert.match(scratch.content, /blank slate|feeling|audience/i);
  assert.ok(scratch.quickReplies.length >= 3);

  const guided = openingForStartMode('guided');
  assert.match(guided.content, /guide|feel/i);
});

test('createEmptyScentState accepts startMode', () => {
  const state = createEmptyScentState('id-1', 'guided');
  assert.equal(state.startMode, 'guided');
  assert.equal(state.currentStage, 'direction');
});

test('validateTurnOutput accepts changes and nextStage', () => {
  const out = validateTurnOutput({
    assistantMessage: 'Hello',
    changes: ['Sweetness reduced'],
    nextStage: 'notes',
    readyForFormula: false,
  });
  assert.deepEqual(out.changes, ['Sweetness reduced']);
  assert.equal(out.nextStage, 'notes');
});

test('local consultant guided path creates an initial direction', () => {
  const state = createEmptyScentState('g1', 'guided');
  const turn = runLocalConsultantTurn({
    state,
    userMessage: 'Confident and polished',
  });
  assert.ok(turn.shouldUpdateScentCard);
  const next = applyStatePatch(state, turn.statePatch);
  assert.ok(next.scentDirection.topNotes?.length || next.scentDirection.oneSentenceConcept);
});
