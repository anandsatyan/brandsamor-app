import test from 'node:test';
import assert from 'node:assert/strict';
import {
  currencyForCountry,
  formatSampleKitMoney,
  getSampleKitPrice,
  sampleKitPriceLabel,
} from '../shared/sampleKitPricing.mjs';

test('GB customers are charged in GBP', () => {
  assert.equal(currencyForCountry('GB'), 'gbp');
  assert.deepEqual(getSampleKitPrice('GB'), { amount: 8000, currency: 'gbp' });
  assert.match(sampleKitPriceLabel('GB', 'en-GB'), /£80/);
});

test('unknown country falls back to USD', () => {
  assert.deepEqual(getSampleKitPrice('ZZ'), { amount: 10000, currency: 'usd' });
  assert.deepEqual(getSampleKitPrice(''), { amount: 10000, currency: 'usd' });
});

test('AE customers are charged in AED', () => {
  const price = getSampleKitPrice('AE');
  assert.equal(price.currency, 'aed');
  assert.equal(price.amount, 37000);
  assert.match(formatSampleKitMoney(price.amount, price.currency, 'en-AE'), /370|AED|د\.إ/);
});

test('JP uses zero-decimal yen', () => {
  const price = getSampleKitPrice('JP');
  assert.equal(price.currency, 'jpy');
  assert.equal(price.amount, 15000);
  assert.match(formatSampleKitMoney(price.amount, price.currency, 'ja-JP'), /15,?000|￥|¥/);
});
