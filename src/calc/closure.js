// Premature-closure simulations. Each returns { blocked } or { lines, note }.
// line: { label, amount | text, strong? }
const POSA_RATE = 4.0;

export function closeTimeDeposit({ principal, ratePercent, months, tdRates }) {
  if (months < 6) return { blocked: '6 माह पूरे होने से पहले निकासी की अनुमति नहीं है।' };

  if (months < 12) {
    const interest = Math.round(principal * (POSA_RATE / 100) * (months / 12));
    return {
      lines: [
        { label: `बचत खाता दर (${POSA_RATE}%) पर ब्याज`, amount: interest },
        { label: 'कुल प्राप्त राशि', amount: principal + interest, strong: true },
      ],
      note: '6 माह से 1 वर्ष के बीच बंद करने पर बचत खाते की साधारण ब्याज दर लगती है।',
    };
  }

  const y = Math.floor(months / 12);
  const b = months % 12;
  const key = y >= 3 ? 3 : y; // completed 4 years uses the 3-year rate (assumption)
  const reduced = tdRates[key] - 2.0;
  const perYear = Math.round(principal * (Math.pow(1 + reduced / 100 / 4, 4) - 1));
  const broken = Math.round(principal * (POSA_RATE / 100) * (b / 12));
  const due = perYear * y + broken;
  const alreadyPaid = Math.round(principal * (Math.pow(1 + ratePercent / 100 / 4, 4) - 1)) * y;

  return {
    lines: [
      { label: `पूरे वर्षों का ब्याज (${key} वर्ष दर − 2% = ${reduced.toFixed(1)}%)`, amount: perYear * y },
      { label: `अधूरे माहों का ब्याज (बचत दर ${POSA_RATE}%)`, amount: broken },
      { label: 'कुल देय ब्याज', amount: due },
      { label: 'अब तक वार्षिक रूप से मिला ब्याज', amount: alreadyPaid },
      { label: 'अब मिलने वाली राशि (मूलधन + देय − मिला ब्याज)', amount: principal + due - alreadyPaid, strong: true },
    ],
    note: 'अधिक मिला हुआ ब्याज मूलधन से वसूल किया जाता है।',
  };
}

export function closeRD({ monthly, months }) {
  if (months < 36) return { blocked: 'RD खाते की समय-पूर्व निकासी केवल 3 वर्ष के बाद संभव है।' };
  const deposited = monthly * months;
  const interest = Math.round(((monthly * (POSA_RATE / 100)) / 12) * ((months * (months + 1)) / 2));
  return {
    lines: [
      { label: 'कुल जमा राशि', amount: deposited },
      { label: `बचत खाता दर (${POSA_RATE}%) पर साधारण ब्याज`, amount: interest },
      { label: 'कुल प्राप्त राशि', amount: deposited + interest, strong: true },
    ],
    note: 'पूरी जमा पर RD दर की जगह बचत खाते की साधारण ब्याज दर लगती है।',
  };
}

export function closeSCSS({ principal, ratePercent, months }) {
  const paid = Math.round(Math.floor(months / 3) * ((principal * ratePercent) / 100 / 4));
  if (months < 12) {
    return {
      lines: [
        { label: 'अब तक मिला त्रैमासिक ब्याज', amount: paid },
        { label: 'मूलधन से कटौती (मिला ब्याज वापस)', amount: paid },
        { label: 'वापस मिलने वाला मूलधन', amount: principal - paid, strong: true },
      ],
      note: '1 वर्ष से पहले बंद करने पर कोई ब्याज देय नहीं होता।',
    };
  }
  const pct = months < 24 ? 1.5 : 1.0;
  const penalty = Math.round((principal * pct) / 100);
  return {
    lines: [
      { label: 'अब तक मिला त्रैमासिक ब्याज', amount: paid },
      { label: `पेनल्टी (${pct}% मूलधन)`, amount: penalty },
      { label: 'वापस मिलने वाला मूलधन', amount: principal - penalty, strong: true },
      { label: 'शुद्ध लाभ (ब्याज − पेनल्टी)', amount: paid - penalty },
    ],
  };
}

export function closeMIS({ principal, ratePercent, months }) {
  if (months < 12) return { blocked: 'MIS खाता 1 वर्ष से पहले बंद नहीं किया जा सकता।' };
  const pct = months < 36 ? 2.0 : 1.0;
  const penalty = Math.round((principal * pct) / 100);
  const received = Math.round(months * ((principal * ratePercent) / 100 / 12));
  return {
    lines: [
      { label: 'अब तक मिली मासिक आय', amount: received },
      { label: `पेनल्टी (${pct}% मूलधन)`, amount: penalty },
      { label: 'वापस मिलने वाला मूलधन', amount: principal - penalty, strong: true },
      { label: 'शुद्ध लाभ (आय − पेनल्टी)', amount: received - penalty },
    ],
  };
}
