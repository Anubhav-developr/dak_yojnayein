import { useCallback, useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import YearTable from '../YearTable';
import PrematureClosure from '../PrematureClosure';
import AmountField from '../../../components/ui/AmountField';
import Segmented from '../../../components/ui/Segmented';
import { calcRD } from '../../../calc/recurringDeposit';
import { closeRD } from '../../../calc/closure';

export default function RecurringDepositPanel({ config, picker }) {
  const [monthly, setMonthly] = useState(config.defaultAmount);
  const [advance, setAdvance] = useState(0);
  const calc = useMemo(
    () => calcRD({ monthly, ratePercent: config.rate, months: config.tenureMonths, advanceMonths: advance }),
    [monthly, advance, config.rate, config.tenureMonths],
  );
  const compute = useCallback((months) => closeRD({ monthly, months }), [monthly]);

  const controls = (
    <>
      <AmountField label="मासिक जमा राशि" value={monthly} onChange={setMonthly} min={config.min} step={config.step} sliderMax={config.sliderMax} />
      <Segmented
        label="एडवांस जमा (रिबेट के लिए)"
        value={advance}
        onChange={setAdvance}
        options={[
          { value: 0, label: 'नहीं' },
          { value: 6, label: '6 माह' },
          { value: 12, label: '12 माह' },
        ]}
        help="6 माह एडवांस पर ₹100 पीछे ₹10, 12 माह एडवांस पर ₹100 पीछे ₹40 का तुरंत रिबेट।"
      />
      <CalcNote>जमा हर माह की शुरुआत में होती है और ब्याज हर तिमाही के अंत में जुड़ता है। अवधि 5 वर्ष (60 माह) तय है।</CalcNote>
    </>
  );

  const stats = [
    { label: 'कुल जमा (60 माह)', value: calc.deposited },
    { label: 'कुल अर्जित ब्याज', value: calc.interest, tone: 'amber' },
  ];
  if (advance) stats.push({ label: `तुरंत रिबेट (${advance} माह एडवांस)`, value: calc.rebate });

  const result = (
    <ResultCard
      eyebrow="अनुमानित परिपक्वता मूल्य (MATURITY VALUE)"
      badge={`${config.rate}% · त्रैमासिक चक्रवृद्धि`}
      headline={{ value: calc.maturity, sub: '5 वर्ष (60 माह) बाद' }}
      bar={{ principal: calc.deposited, interest: calc.interest, principalLabel: 'कुल जमा राशि' }}
      stats={stats}
    />
  );

  const extras = (
    <>
      <YearTable
        title="वर्ष-दर-वर्ष संचित राशि"
        columns={[
          { key: 'year', label: 'वर्ष' },
          { key: 'deposited', label: 'अब तक कुल जमा' },
          { key: 'balance', label: 'वर्ष के अंत में राशि' },
        ]}
        rows={calc.rows}
      />
      <PrematureClosure maxMonths={59} defaultMonths={36} compute={compute} />
    </>
  );
  return <CalcLayout picker={picker} controls={controls} result={result} extras={extras} />;
}
