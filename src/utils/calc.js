/**
 * Maturity estimate.
 *  - compound: interest is reinvested every year  → P × (1 + r)^n
 *  - simple:   interest is paid out, not reinvested → P × (1 + r × n)
 */
export function calculateReturns({ principal, ratePercent, years, mode }) {
  const r = ratePercent / 100;
  const raw = mode === 'simple' ? principal * (1 + r * years) : principal * Math.pow(1 + r, years);
  const maturity = Math.round(raw);
  const interest = maturity - principal;
  const interestShare = maturity > 0 ? (interest / maturity) * 100 : 0;
  return { principal, maturity, interest, interestShare };
}
