// NSC VIII: annual compounding, auto-reinvested, lump sum at maturity.
// Interest of years 1-4 is "deemed reinvested" and qualifies for Section 80C.
export function calcNSC({ principal, ratePercent, years = 5 }) {
  const r = ratePercent / 100;
  const rows = [];
  let reinvested80C = 0;
  for (let k = 1; k <= years; k += 1) {
    const opening = principal * Math.pow(1 + r, k - 1);
    const interest = opening * r;
    const eligible = k <= 4;
    if (eligible) reinvested80C += Math.round(interest);
    rows.push({
      year: `वर्ष ${k}`,
      opening: Math.round(opening),
      interest: Math.round(interest),
      closing: Math.round(opening + interest),
      eligible,
    });
  }
  const maturity = Math.round(principal * Math.pow(1 + r, years));
  return { maturity, interest: maturity - principal, reinvested80C, rows };
}
