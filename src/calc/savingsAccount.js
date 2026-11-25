// POSA: monthly accrual on the minimum balance (10th rule), credited once a year on 31 March.
// If the qualifying balance is below ₹500 in a month, that month's interest is zero.
export function calcPOSA({ balance, ratePercent, years, minBalance = 500 }) {
  const r = ratePercent / 100;
  let bal = balance;
  const rows = [];
  for (let y = 1; y <= years; y += 1) {
    let sum = 0;
    for (let m = 1; m <= 12; m += 1) sum += bal >= minBalance ? (bal * r) / 12 : 0;
    const interest = Math.round(sum);
    rows.push({ year: `वर्ष ${y}`, opening: bal, interest, closing: bal + interest });
    bal += interest;
  }
  return { rows, closing: bal, interest: bal - balance, firstYearInterest: rows[0].interest, belowMin: balance < minBalance };
}
