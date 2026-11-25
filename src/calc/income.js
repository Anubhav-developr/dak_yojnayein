// POMIS & SCSS: pure simple interest, principal returned at the end.

export function calcMonthlyIncome({ principal, ratePercent, years = 5 }) {
  const r = ratePercent / 100;
  return {
    monthly: Math.round((principal * r) / 12),
    totalInterest: Math.round(principal * r * years),
    principal,
  };
}

const MS_DAY = 86400000;
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

// Days from the opening date to the end of its calendar quarter (Mar/Jun/Sep/Dec).
// Assumption: counted as (quarter-end − opening date), the opening day itself is not added.
export function daysToQuarterEnd(isoDate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate ?? '');
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const start = Date.UTC(y, mo - 1, d);
  const quarterEndMonth = Math.floor((mo - 1) / 3) * 3 + 2; // 0-based: Mar=2, Jun=5, Sep=8, Dec=11
  const end = Date.UTC(y, quarterEndMonth + 1, 0);
  const days = Math.round((end - start) / MS_DAY);
  if (days < 0) return null;
  return { days, daysInYear: isLeap(y) ? 366 : 365 };
}

export function calcQuarterlyIncome({ principal, ratePercent, years = 5, openingDate }) {
  const r = ratePercent / 100;
  const q = daysToQuarterEnd(openingDate);
  return {
    quarterly: Math.round((principal * r) / 4),
    first: q ? Math.round((principal * r * q.days) / q.daysInYear) : null,
    firstDays: q ? q.days : null,
    totalInterest: Math.round(principal * r * years),
    principal,
  };
}
