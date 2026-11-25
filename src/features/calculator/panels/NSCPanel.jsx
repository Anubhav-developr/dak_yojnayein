import { useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import YearTable from '../YearTable';
import AmountField from '../../../components/ui/AmountField';
import { calcNSC } from '../../../calc/nsc';
import { formatINR } from '../../../utils/format';

export default function NSCPanel({ config, picker }) {
  const [amount, setAmount] = useState(config.defaultAmount);
  const calc = useMemo(() => calcNSC({ principal: amount, ratePercent: config.rate, years: config.tenureYears }), [amount, config.rate, config.tenureYears]);

  const controls = (
    <>
      <AmountField label="निवेश राशि (एकमुश्त)" value={amount} onChange={setAmount} min={config.min} step={config.step} sliderMax={config.sliderMax} />
      <CalcNote>ब्याज हर साल जुड़कर आगे के ब्याज पर भी लगता है (वार्षिक चक्रवृद्धि)। पूरी राशि 5 वर्ष बाद एक साथ मिलती है।</CalcNote>
    </>
  );

  const result = (
    <ResultCard
      eyebrow="अनुमानित परिपक्वता मूल्य (MATURITY VALUE)"
      badge={`${config.rate}% वार्षिक · 5 वर्ष`}
      headline={{ value: calc.maturity, sub: 'एकमुश्त, 5 वर्ष बाद' }}
      bar={{ principal: amount, interest: calc.interest }}
      stats={[
        { label: 'मूल राशि', value: amount },
        { label: 'कुल अर्जित ब्याज', value: calc.interest, tone: 'amber' },
      ]}
    >
      <p className="result__info">
        धारा 80C में गिना जाने वाला पुनर्निवेशित ब्याज (वर्ष 1–4): <b>{formatINR(calc.reinvested80C)}</b>
      </p>
    </ResultCard>
  );

  const extras = (
    <YearTable
      title="वर्ष-दर-वर्ष ब्याज वृद्धि और 80C पात्रता"
      columns={[
        { key: 'year', label: 'वर्ष' },
        { key: 'opening', label: 'शुरुआती राशि' },
        { key: 'interest', label: 'उस वर्ष का ब्याज' },
        { key: 'closing', label: 'अंतिम राशि' },
        { key: 'eligible', label: '80C (ब्याज)', fmt: (v) => (v ? 'हाँ' : 'नहीं (अंतिम वर्ष)') },
      ]}
      rows={calc.rows}
    />
  );
  return <CalcLayout picker={picker} controls={controls} result={result} extras={extras} />;
}
