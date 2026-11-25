import { useCallback, useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import PrematureClosure from '../PrematureClosure';
import AmountField from '../../../components/ui/AmountField';
import Segmented from '../../../components/ui/Segmented';
import { calcMonthlyIncome } from '../../../calc/income';
import { closeMIS } from '../../../calc/closure';
import { formatINR } from '../../../utils/format';

export default function MonthlyIncomePanel({ config, picker }) {
  const [holding, setHolding] = useState('single');
  const [amount, setAmount] = useState(config.defaultAmount);
  const max = holding === 'single' ? config.max : config.maxJoint;

  const changeHolding = (h) => {
    setHolding(h);
    setAmount((a) => Math.min(a, h === 'single' ? config.max : config.maxJoint));
  };

  const calc = useMemo(() => calcMonthlyIncome({ principal: amount, ratePercent: config.rate, years: config.tenureYears }), [amount, config.rate, config.tenureYears]);
  const compute = useCallback((months) => closeMIS({ principal: amount, ratePercent: config.rate, months }), [amount, config.rate]);

  const controls = (
    <>
      <Segmented
        label="खाते का प्रकार"
        value={holding}
        onChange={changeHolding}
        options={[
          { value: 'single', label: `एकल (अधिकतम ${formatINR(config.max)})` },
          { value: 'joint', label: `संयुक्त (अधिकतम ${formatINR(config.maxJoint)})` },
        ]}
      />
      <AmountField label="जमा राशि (एकमुश्त)" value={amount} onChange={setAmount} min={config.min} max={max} step={config.step} sliderMax={max} />
      <CalcNote>साधारण ब्याज हर महीने आपके खाते में आता है। मूलधन छुआ नहीं जाता और 5 वर्ष बाद पूरा लौटता है।</CalcNote>
    </>
  );

  const result = (
    <ResultCard
      eyebrow="हर महीने की आय"
      badge={`${config.rate}% वार्षिक · साधारण ब्याज`}
      headline={{ value: calc.monthly, sub: '60 माह तक, हर माह' }}
      bar={{ principal: amount, interest: calc.totalInterest, principalLabel: 'मूलधन (5 वर्ष बाद वापस)', interestLabel: 'कुल मासिक आय (60 माह)' }}
      stats={[
        { label: 'कुल ब्याज (60 माह)', value: calc.totalInterest, tone: 'amber' },
        { label: 'वार्षिक आय', value: calc.monthly * 12 },
        { label: 'परिपक्वता पर मूलधन', value: amount },
      ]}
    />
  );

  return (
    <CalcLayout
      picker={picker}
      controls={controls}
      result={result}
      extras={<PrematureClosure maxMonths={59} defaultMonths={24} compute={compute} />}
    />
  );
}
