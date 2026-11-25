// PPF & SSY: Financial-Year cycle + "5th-of-the-month" rule.
//  - B_m = qualifying balance for month m (min balance between the 5th and month-end)
//  - deposit on/before the 5th  -> earns interest for that whole month
//  - deposit on/after the 6th   -> earns nothing for that month
//  - I_m = B_m × r/12 (kept in paise), I_FY = round(ΣI_m), credited on 31 March
const round2 = (x) => Math.round(x * 100) / 100;

export function calcFYAccount({ deposit, frequency, timing, ratePercent, totalYears, depositYears }) {
  const r = ratePercent / 100;
  const annual = frequency === 'monthly' ? deposit * 12 : deposit;

  let opening = 0;
  let totalDeposits = 0;
  const rows = [];

  for (let fy = 1; fy <= totalYears; fy += 1) {
    const depositing = fy <= depositYears;
    let cumulative = 0;
    let sum = 0;
    for (let m = 1; m <= 12; m += 1) {
      const d = !depositing ? 0 : frequency === 'monthly' ? deposit : m === 1 ? deposit : 0;
      const counted = timing === 'by5th' ? cumulative + d : cumulative;
      sum += round2(((opening + counted) * r) / 12);
      cumulative += d;
    }
    const dep = depositing ? annual : 0;
    const interest = Math.round(sum);
    const closing = opening + dep + interest;
    rows.push({ year: `वर्ष ${fy}`, opening, deposit: dep, interest, closing });
    totalDeposits += dep;
    opening = closing;
  }

  return { rows, totalDeposits, maturity: opening, interest: opening - totalDeposits, firstYearInterest: rows[0].interest };
}
