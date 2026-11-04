/**
 * Tiny pricing helpers used by a storefront checkout.
 * All money is handled as integer minor units (paise / cents) to avoid floating-point drift.
 */

/**
 * Applies a percentage discount to a price.
 * @param {number} priceMinor price in minor units (e.g. paise), a non-negative integer
 * @param {number} percent discount percentage, e.g. 15 for 15%
 * @returns {number} discounted price in minor units, rounded to the nearest unit
 */
export function applyDiscount(priceMinor, percent) {
  if (!Number.isInteger(priceMinor) || priceMinor < 0) {
    throw new RangeError('priceMinor must be a non-negative integer');
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
