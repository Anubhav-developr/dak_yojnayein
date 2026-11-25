import { useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import AmountField from '../../../components/ui/AmountField';
import { calcKVP } from '../../../calc/kvp';

export default function KVPPanel({ config, picker }) {
  const [amount, setAmount] = useState(config.defaultAmount);
  const calc = useMemo(() => calcKVP({ principal: amount, ratePercent: config.rate, tenureMonths: config.tenureMonths }), [amount, config.rate, config.tenureMonths]);

  const controls = (
    <>
      <AmountField label="निवेश राशि (एकमुश्त)" value={amount} onChange={setAmount} min={config.min} step={config.step} sliderMax={config.sliderMax} />
      <CalcNote>KVP का उद्देश्य राशि को <b>ठीक दोगुना</b> करना है। अवधि वित्त मंत्रालय पूरे माहों में तय करता है, इसलिए यहाँ अवधि स्लाइडर नहीं है।</CalcNote>
    </>
  );

  const result = (
    <ResultCard
      eyebrow="गारंटीकृत परिपक्वता राशि (2 × मूलधन)"
      badge={`${config.rate}% · 115 माह`}
      headline={{ value: calc.maturity, sub: '9 वर्ष 7 माह (115 माह) बाद' }}
      bar={{ principal: amount, interest: calc.interest, interestLabel: 'लाभ (= मूल राशि)' }}
      stats={[
        { label: 'निवेश राशि', value: amount },
        { label: 'कुल लाभ', value: calc.interest, tone: 'amber' },
      ]}
    >
      <p className="result__info">
        गणितीय दोगुना समय t = ln 2 / ln(1+r) = <b>{calc.exactYears.toFixed(4)} वर्ष ≈ {calc.exactMonths.toFixed(2)} माह</b>।
        डाकघर इसे पूरे <b>{calc.tenureMonths} माह</b> पर तय करके 2 × मूलधन की गारंटी देता है।
      </p>
    </ResultCard>
  );
  return <CalcLayout picker={picker} controls={controls} result={result} />;
}
