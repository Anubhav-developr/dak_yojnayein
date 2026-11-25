// Interest compounds quarterly, is PAID OUT every year and is NOT reinvested.
export const effectiveYield = (ratePercent) => Math.pow(1 + ratePercent / 100 / 4, 4) - 1;

export function calcTimeDeposit({ principal, ratePercent, years }) {
  const annualPayout = Math.round(principal * effectiveYield(ratePercent)); // rounded like Finacle
  const rows = Array.from({ length: years }, (_, i) => ({
    year: `वर्ष ${i + 1}`,
    payout: annualPayout,
    cumulative: annualPayout * (i + 1),
  }));
  const totalInterest = annualPayout * years;
  return { principal, annualPayout, totalInterest, effectiveYield: effectiveYield(ratePercent), rows };
}
