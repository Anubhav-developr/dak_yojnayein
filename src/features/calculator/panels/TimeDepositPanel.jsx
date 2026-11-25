import { useCallback, useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import YearTable from '../YearTable';
import PrematureClosure from '../PrematureClosure';
import AmountField from '../../../components/ui/AmountField';
import { calcTimeDeposit } from '../../../calc/timeDeposit';
import { closeTimeDeposit } from '../../../calc/closure';
import { tdRates } from '../../../data/calcConfig';

export default function TimeDepositPanel({ config, picker }) {
  const [amount, setAmount] = useState(config.defaultAmount);
  const years = config.tenureYears;
  const calc = useMemo(() => calcTimeDeposit({ principal: amount, ratePercent: config.rate, years }), [amount, config.rate, years]);
  const compute = useCallback(
    (months) => closeTimeDeposit({ principal: amount, ratePercent: config.rate, months, tdRates }),
    [amount, config.rate],
  );

  const controls = (
    <>
      <AmountField label="जमा राशि (एकमुश्त)" value={amount} onChange={setAmount} min={config.min} step={config.step} sliderMax={config.sliderMax} />
      <CalcNote>
        ब्याज त्रैमासिक चक्रवृद्धि से बनता है पर <b>हर साल निकाल लिया जाता है</b>, पुनर्निवेश नहीं होता। न निकालने पर वह पड़ा ब्याज 0% कमाता है।
      </CalcNote>
    </>
  );

  const result = (
    <ResultCard
      eyebrow="वार्षिक ब्याज भुगतान"
      badge={`${config.rate}% · ${config.tenure}`}
      headline={{ value: calc.annualPayout, sub: `हर साल की सालगिरह पर, ${years} वर्ष तक` }}
      bar={{ principal: calc.principal, interest: calc.totalInterest, principalLabel: 'मूल राशि (अंत में वापस)' }}
      stats={[
        { label: `कुल ब्याज (${years} वर्ष)`, value: calc.totalInterest, tone: 'amber' },
        { label: 'प्रभावी वार्षिक यील्ड', value: `${(calc.effectiveYield * 100).toFixed(2)}%` },
        { label: 'परिपक्वता पर मूलधन', value: calc.principal },
      ]}
    />
  );

  const extras = (
    <>
      <YearTable
        title="वार्षिक ब्याज भुगतान तालिका"
        columns={[
          { key: 'year', label: 'वर्ष' },
          { key: 'payout', label: 'उस वर्ष का ब्याज' },
          { key: 'cumulative', label: 'अब तक कुल ब्याज' },
        ]}
        rows={calc.rows}
      />
      <PrematureClosure maxMonths={years * 12 - 1} defaultMonths={Math.round((years * 12) / 2)} compute={compute} />
    </>
  );

  return <CalcLayout picker={picker} controls={controls} result={result} extras={extras} />;
}
