// KVP: tenure is fixed by the Ministry in whole months and guarantees M = 2P.
export function calcKVP({ principal, ratePercent, tenureMonths = 115 }) {
  const r = ratePercent / 100;
  const exactYears = Math.log(2) / Math.log(1 + r);
  return {
    maturity: 2 * principal,
    interest: principal,
    exactYears,
    exactMonths: exactYears * 12,
    tenureMonths,
  };
}
