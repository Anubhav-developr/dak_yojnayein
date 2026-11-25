import { useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import YearTable from '../YearTable';
import AmountField from '../../../components/ui/AmountField';
import RangeSlider from '../../../components/ui/RangeSlider';
import { calcPOSA } from '../../../calc/savingsAccount';

export default function SavingsAccountPanel({ config, picker }) {
  const [balance, setBalance] = useState(config.defaultAmount);
  const [years, setYears] = useState(5);
  const calc = useMemo(() => calcPOSA({ balance, ratePercent: config.rate, years, minBalance: config.minBalance }), [balance, years, config.rate, config.minBalance]);

  const controls = (
    <>
      <AmountField label="खाते में न्यूनतम मासिक शेष" value={balance} onChange={setBalance} min={config.min} step={config.step} sliderMax={config.sliderMax} />
      <RangeSlider label="कितने वर्ष" valueText={`${years} वर्ष`} min={1} max={10} value={years} onChange={setYears} marks={['1 वर्ष', '5 वर्ष', '10 वर्ष']} />
      <CalcNote tone={calc.belowMin ? 'warn' : 'info'}>
        {calc.belowMin
          ? `शेष ₹${config.minBalance} से कम है, इसलिए हर माह का ब्याज शून्य रहेगा।`
          : 'ब्याज हर माह 10 तारीख से माह-अंत के न्यूनतम शेष पर बनता है और साल में एक बार 31 मार्च को जमा होता है। शेष ₹500 से कम होने पर उस माह ब्याज नहीं मिलता।'}
      </CalcNote>
      <CalcNote tone="warn">दर फ्लोटिंग है और हर तिमाही बदल सकती है। गणना में {config.rate}% स्थिर मानी गई है।</CalcNote>
    </>
  );

  const result = (
    <ResultCard
      eyebrow="पहले वर्ष का ब्याज (31 मार्च को जमा)"
      badge={`${config.rate}% वार्षिक · फ्लोटिंग`}
      headline={{ value: calc.firstYearInterest, sub: 'पूरे 12 माह न्यूनतम शेष बना रहे तो' }}
      bar={calc.interest > 0 ? { principal: balance, interest: calc.interest, principalLabel: 'शुरुआती शेष', interestLabel: `${years} वर्ष का कुल ब्याज` } : null}
      stats={[
        { label: `${years} वर्ष बाद कुल शेष`, value: calc.closing },
        { label: `${years} वर्ष का कुल ब्याज`, value: calc.interest, tone: 'amber' },
      ]}
    />
  );

  const extras = (
    <YearTable
      title="वर्ष-दर-वर्ष ब्याज (वार्षिक चक्रवृद्धि)"
      columns={[
        { key: 'year', label: 'वर्ष' },
        { key: 'opening', label: 'शुरुआती शेष' },
        { key: 'interest', label: 'ब्याज' },
        { key: 'closing', label: 'अंतिम शेष' },
      ]}
      rows={calc.rows}
    />
  );
  return <CalcLayout picker={picker} controls={controls} result={result} extras={extras} />;
}
