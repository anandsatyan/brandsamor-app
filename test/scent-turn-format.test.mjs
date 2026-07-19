import test from 'node:test';
import assert from 'node:assert/strict';
import { composeAssistantMessage, normalizeSnackFields } from '../server/scentStudio/turnFormat.mjs';
import { validateTurnOutput } from '../server/scentStudio/state.mjs';

test('normalizeSnackFields keeps structured snack pieces', () => {
  const snack = normalizeSnackFields({
    headline: 'Direction forming',
    insight: 'Clean tropical without sunscreen sweetness.',
    question: 'Juicy fruits, or salty woods?',
    noteChips: ['Bergamot', 'Sea air'],
    changes: ['Initial direction sketched'],
  });

  assert.equal(snack.headline, 'Direction forming');
  assert.match(snack.insight, /tropical/i);
  assert.match(snack.question, /\?/);
  assert.deepEqual(snack.noteChips, ['Bergamot', 'Sea air']);
  assert.ok(snack.assistantMessage.includes('\n\n'));
});

test('normalizeSnackFields splits long prose into snack pieces', () => {
  const snack = normalizeSnackFields({
    assistantMessage:
      'I’m interpreting this as clean and quietly luxurious.\n\nI’d explore **bergamot** and **cedar**.\n\nShould it feel brighter or warmer?',
  });

  assert.ok(snack.insight);
  assert.match(snack.question || '', /\?/);
  assert.ok(String(snack.assistantMessage).length < 400);
});

test('validateTurnOutput accepts snackable model output without long paragraphs', () => {
  const turn = validateTurnOutput({
    headline: 'Updated',
    insight: 'Warmed the dry-down.',
    question: 'Keep refining or prepare for sampling?',
    noteChips: ['Soft amber'],
    changes: ['Warmer dry-down'],
    quickReplies: ['Keep refining', 'Prepare for sampling'],
    statePatch: { set: {}, add: {}, remove: {}, lock: [], unlock: [] },
    shouldUpdateScentCard: true,
    readyForFormula: false,
  });

  assert.ok(turn);
  assert.equal(turn.headline, 'Updated');
  assert.equal(turn.noteChips[0], 'Soft amber');
  assert.ok(turn.assistantMessage);
});

test('composeAssistantMessage joins short pieces', () => {
  const message = composeAssistantMessage({
    insight: 'Clean and confident.',
    question: 'Brighter or warmer?',
  });
  assert.equal(message, 'Clean and confident.\n\nBrighter or warmer?');
});
