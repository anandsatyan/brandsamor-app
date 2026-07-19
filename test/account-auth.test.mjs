import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createCustomerSessionToken,
  verifyCustomerSessionToken,
  hashMagicToken,
  createMagicToken,
} from '../server/account/auth.mjs';

test('customer session tokens round-trip', () => {
  const token = createCustomerSessionToken('user-123');
  const verified = verifyCustomerSessionToken(token);
  assert.equal(verified.userId, 'user-123');
  assert.ok(verified.exp > Date.now());
});

test('invalid customer session tokens are rejected', () => {
  assert.equal(verifyCustomerSessionToken('not-a-token'), null);
  assert.equal(verifyCustomerSessionToken(''), null);
});

test('magic tokens hash stably', () => {
  const token = createMagicToken();
  assert.equal(token.length, 64);
  assert.equal(hashMagicToken(token), hashMagicToken(token));
  assert.notEqual(hashMagicToken(token), hashMagicToken('other'));
});
