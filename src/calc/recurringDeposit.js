// Monthly deposits (start of month), quarterly compounding, annuity-due:
// M = R × ((1+i)^n − 1) / (1 − (1+i)^(−1/3)),  i = r/4,  n = quarters
export function calcRD({ monthly, ratePercent, months = 60, advanceMonths = 0 }) {
  const i = ratePercent / 100 / 4;
  const denom = 1 - Math.pow(1 + i, -1 / 3);
  const balanceAt = (m) => (monthly * (Math.pow(1 + i, m / 3) - 1)) / denom;

  const maturity = Math.round(balanceAt(months));
  const deposited = monthly * months;
  const rebate = advanceMonths === 6 ? (monthly / 100) * 10 : advanceMonths === 12 ? (monthly / 100) * 40 : 0;

  const rows = [];
  for (let y = 1; y <= months / 12; y += 1) {
    rows.push({ year: `वर्ष ${y}`, deposited: monthly * 12 * y, balance: Math.round(balanceAt(12 * y)) });
  }
  return { maturity, deposited, interest: maturity - deposited, rebate, rows };
}
