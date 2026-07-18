import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyStatePatch,
  createEmptyScentState,
  hasScentCardContent,
  toPublicScentCard,
  validateTurnOutput,
} from '../server/scentStudio/state.mjs';
import { searchReferenceFragrances, findReferencesInText } from '../server/scentStudio/referenceDirectory.mjs';
import { runLocalConsultantTurn } from '../server/scentStudio/localConsultant.mjs';

test('applyStatePatch sets, adds, removes and locks without erasing unrelated fields', () => {
  const state = createEmptyScentState('c1');
  state.scentDirection.primaryFamily = 'woody';
  state.scentDirection.topNotes = ['Bergamot', 'Ginger'];
  state.scentDirection.baseNotes = ['Cedar'];

  const next = applyStatePatch(state, {
    set: { 'scentDirection.warmth': 7 },
    add: { 'scentDirection.baseNotes': ['Soft amber'] },
    remove: { 'scentDirection.topNotes': ['Ginger'] },
    lock: ['Cedar'],
  });

  assert.equal(next.scentDirection.primaryFamily, 'woody');
  assert.deepEqual(next.scentDirection.topNotes, ['Bergamot']);
  assert.ok(next.scentDirection.baseNotes.includes('Cedar'));
  assert.ok(next.scentDirection.baseNotes.includes('Soft amber'));
  assert.equal(next.scentDirection.warmth, 7);
  assert.deepEqual(next.lockedElements, ['Cedar']);
  assert.equal(next.currentVersion, 2);
});

test('validateTurnOutput rejects empty assistant messages', () => {
  assert.equal(validateTurnOutput({ assistantMessage: '  ' }), null);
  const ok = validateTurnOutput({
    assistantMessage: 'Hello',
    shouldUpdateScentCard: true,
    readyForFormula: false,
  });
  assert.equal(ok.assistantMessage, 'Hello');
});

test('reference directory finds Imagination and Santal 33', () => {
  const imagination = findReferencesInText('I want something like Imagination but warmer');
  assert.ok(imagination.some((r) => /imagination/i.test(r.name)));

  const santal = searchReferenceFragrances('Santal 33', { limit: 3 });
  assert.ok(santal.length >= 1);
  assert.match(santal[0].name, /Santal/i);
});

test('local consultant starts from scratch without hallucinating a known profile', () => {
  const state = createEmptyScentState('c2');
  const turn = runLocalConsultantTurn({
    state,
    userMessage:
      'Start from scratch. I want a clean tropical fragrance for a resort brand, no coconut sunscreen smell.',
  });

  assert.ok(turn.assistantMessage);
  assert.equal(turn.shouldUpdateScentCard, true);
  const next = applyStatePatch(state, turn.statePatch);
  assert.ok(hasScentCardContent(next));
  assert.ok(
    (next.restrictions.avoidedNotes || []).some((n) => /coconut/i.test(n)) ||
      (next.scentDirection.avoidedEffects || []).some((n) => /coconut/i.test(n)),
  );
  const card = toPublicScentCard(next);
  assert.ok(card);
  assert.ok(card.topNotes.length || card.heartNotes.length);
});

test('local consultant uses verified reference without claiming proprietary formula', () => {
  const state = createEmptyScentState('c3');
  const turn = runLocalConsultantTurn({
    state,
    userMessage: 'Use Louis Vuitton Imagination as a starting point, less soapy more woody.',
  });
  assert.match(turn.assistantMessage, /starting point|olfactory/i);
  assert.doesNotMatch(turn.assistantMessage, /exact proprietary formula|we know the formula/i);
  const next = applyStatePatch(state, turn.statePatch);
  assert.equal(next.entryMode, 'reference');
  assert.ok(next.references.length >= 1);
});
