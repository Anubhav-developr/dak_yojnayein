import { useCallback, useId, useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import PrematureClosure from '../PrematureClosure';
import AmountField from '../../../components/ui/AmountField';
import { calcQuarterlyIncome } from '../../../calc/income';
import { closeSCSS } from '../../../calc/closure';
import { todayISO } from '../../../utils/format';

export default function SeniorCitizenPanel({ config, picker }) {
  const dateId = useId();
  const [amount, setAmount] = useState(config.defaultAmount);
  const [openDate, setOpenDate] = useState(todayISO);
  const calc = useMemo(
    () => calcQuarterlyIncome({ principal: amount, ratePercent: config.rate, years: config.tenureYears, openingDate: openDate }),
    [amount, openDate, config.rate, config.tenureYears],
  );
  const compute = useCallback((months) => closeSCSS({ principal: amount, ratePercent: config.rate, months }), [amount, config.rate]);

  const controls = (
    <>
      <AmountField label="जमा राशि (एकमुश्त)" value={amount} onChange={setAmount} min={config.min} max={config.max} step={config.step} sliderMax={config.sliderMax} />
      <div className="calc-field">
        <label htmlFor={dateId}>खाता खोलने की तारीख</label>
        <input id={dateId} type="date" value={openDate} onChange={(e) => setOpenDate(e.target.value)} />
      </div>
      <CalcNote>
        साधारण ब्याज मार्च, जून, सितंबर और दिसंबर के अंतिम कार्य-दिवस पर मिलता है। तिमाही के बीच में खाता खुलने पर पहला भुगतान दिनों के अनुपात में कम होता है। 5 वर्ष बाद 3 वर्ष का विस्तार संभव है।
      </CalcNote>
    </>
  );

  const stats = [
    { label: 'कुल ब्याज (5 वर्ष)', value: calc.totalInterest, tone: 'amber' },
    { label: 'परिपक्वता पर मूलधन', value: amount },
  ];
  if (calc.first !== null) stats.unshift({ label: `पहला भुगतान (${calc.firstDays} दिन, अनुपातिक)`, value: calc.first });

  const result = (
    <ResultCard
      eyebrow="तिमाही ब्याज भुगतान"
      badge={`${config.rate}% वार्षिक · साधारण ब्याज`}
      headline={{ value: calc.quarterly, sub: 'हर तिमाही (पूरी तिमाही के लिए)' }}
      bar={{ principal: amount, interest: calc.totalInterest, principalLabel: 'मूलधन (5 वर्ष बाद वापस)', interestLabel: 'कुल ब्याज भुगतान' }}
      stats={stats}
    />
  );

  return (
    <CalcLayout
      picker={picker}
      controls={controls}
      result={result}
      extras={<PrematureClosure maxMonths={59} defaultMonths={30} compute={compute} />}
    />
  );
}
