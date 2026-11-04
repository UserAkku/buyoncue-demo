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

test('formats rupees with two decimals', () => {
  assert.equal(formatINR(12345), '₹123.45');
  assert.equal(formatINR(5), '₹0.05');
});
