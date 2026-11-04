import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyDiscount, formatINR } from '../src/pricing.js';

test('applies a percentage discount in minor units', () => {
  assert.equal(applyDiscount(10000, 15), 8500);
  assert.equal(applyDiscount(999, 10), 899); // 899.1 rounds to 899
});

test('rejects invalid prices', () => {
  assert.throws(() => applyDiscount(-1, 10), RangeError);
  assert.throws(() => applyDiscount(10.5, 10), RangeError);
});

test('rejects discounts outside 0-100 instead of producing negative or inflated prices', () => {
  assert.throws(() => applyDiscount(10000, 120), RangeError);
  assert.throws(() => applyDiscount(10000, -5), RangeError);
  assert.throws(() => applyDiscount(10000, Number.NaN), RangeError);
  assert.equal(applyDiscount(10000, 100), 0);
  assert.equal(applyDiscount(10000, 0), 10000);
});

test('formats rupees with two decimals', () => {
  assert.equal(formatINR(12345), '₹123.45');
  assert.equal(formatINR(5), '₹0.05');
});
