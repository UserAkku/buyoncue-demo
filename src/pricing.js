/**
 * Tiny pricing helpers used by a storefront checkout.
 * All money is handled as integer minor units (paise / cents) to avoid floating-point drift.
 */

/**
 * Applies a percentage discount to a price.
 * @param {number} priceMinor price in minor units (e.g. paise), a non-negative integer
 * @param {number} percent discount percentage from 0 to 100, e.g. 15 for 15%
 * @returns {number} discounted price in minor units, rounded to the nearest unit
 */
export function applyDiscount(priceMinor, percent) {
  if (!Number.isInteger(priceMinor) || priceMinor < 0) {
    throw new RangeError('priceMinor must be a non-negative integer');
  }
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new RangeError('percent must be between 0 and 100');
  }
  return Math.round((priceMinor * (100 - percent)) / 100);
}

/**
 * Formats minor units as an Indian rupee string, e.g. 12345 -> "₹123.45".
 * @param {number} amountMinor
 * @returns {string}
 */
export function formatINR(amountMinor) {
  const sign = amountMinor < 0 ? '-' : '';
  const abs = Math.abs(amountMinor);
  return `${sign}₹${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, '0')}`;
}
