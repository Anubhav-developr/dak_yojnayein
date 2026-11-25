import { useMemo, useState } from 'react';
import CalcLayout, { CalcNote } from '../CalcLayout';
import ResultCard from '../ResultCard';
import YearTable from '../YearTable';
import AmountField from '../../../components/ui/AmountField';
import Segmented from '../../../components/ui/Segmented';
import { calcFYAccount } from '../../../calc/fyAccount';
import { formatINR } from '../../../utils/format';

const TENURES = [15, 20, 25, 30].map((y) => ({ value: y, label: `${y} वर्ष` }));

// PPF and SSY share the FY-cycle engine but differ in tenure / deposit window.
export default function FYAccountPanel({ config, picker }) {
  const isSSY = config.id === 'ssy';
  const [frequency, setFrequency] = useState('yearly');
  const [yearly, setYearly] = useState(config.defaultAmount);
  const [monthly, setMonthly] = useState(12500);
  const [timing, setTiming] = useState('by5th');
  const [ppfYears, setPpfYears] = useState(config.totalYears);

  const totalYears = isSSY ? config.totalYears : ppfYears;
  const depositYears = isSSY ? config.depositYears : ppfYears;
  const deposit = frequency === 'yearly' ? yearly : monthly;

  const base = { deposit, frequency, ratePercent: config.rate, totalYears, depositYears };
  const calc = useMemo(() => calcFYAccount({ ...base, timing }), [deposit, frequency, timing, totalYears, depositYears, config.rate]);
  const lossVsBest = useMemo(() => {
    if (timing === 'by5th') return 0;
    return calcFYAccount({ ...base, timing: 'by5th' }).maturity - calc.maturity;
  }, [calc, deposit, frequency, timing, totalYears, depositYears, config.rate]);

  const controls = (
    <>
      <Segmented
        label="जमा का तरीका"
        value={frequency}
        onChange={setFrequency}
        options={[
          { value: 'yearly', label: 'साल में एक बार (अप्रैल)' },
          { value: 'monthly', label: 'हर महीने' },
        ]}
      />
      {frequency === 'yearly' ? (
        <AmountField
          label="वार्षिक जमा राशि"
          value={yearly}
          onChange={setYearly}
          min={config.min}
          max={config.max}
          step={config.step}
          unitHint="प्रति वित्त वर्ष"
        />
      ) : (
        <AmountField label="मासिक जमा राशि" value={monthly} onChange={setMonthly} min={50} max={12500} step={50} unitHint="वार्षिक सीमा ₹1,50,000" />
      )}
      <Segmented
        label="जमा की तारीख"
        value={timing}
        onChange={setTiming}
        options={[
          { value: 'by5th', label: 'महीने की 5 तारीख तक' },
          { value: 'after5th', label: '6 तारीख या बाद में' },
        ]}
        help="5 तारीख तक जमा करने पर उसी पूरे महीने का ब्याज मिलता है; 6 तारीख के बाद जमा पर उस महीने का ब्याज शून्य।"
      />
      {isSSY ? (
        <CalcNote>अवधि 21 वर्ष है। जमा केवल पहले 15 वर्ष होती है; वर्ष 16–21 में सिर्फ चक्रवृद्धि होती है।</CalcNote>
      ) : (
        <Segmented label="कुल अवधि (विस्तार सहित, जमा जारी मानकर)" value={ppfYears} onChange={setPpfYears} options={TENURES} />
      )}
      <CalcNote tone="warn">दर फ्लोटिंग है और हर तिमाही बदल सकती है। गणना वर्तमान {config.rate}% को पूरे समय स्थिर मानकर है। खाता 1 अप्रैल से शुरू माना गया है।</CalcNote>
    </>
  );

  const result = (
    <ResultCard
      eyebrow="अनुमानित परिपक्वता मूल्य (MATURITY VALUE)"
      badge={`${config.rate}% वार्षिक · फ्लोटिंग`}
      headline={{ value: calc.maturity, sub: `${totalYears} वर्ष बाद${isSSY ? ' (21 वर्ष में परिपक्वता)' : ''}` }}
      bar={{ principal: calc.totalDeposits, interest: calc.interest, principalLabel: 'कुल जमा राशि' }}
      stats={[
        { label: 'कुल जमा राशि', value: calc.totalDeposits },
        { label: 'कुल अर्जित ब्याज', value: calc.interest, tone: 'amber' },
        { label: 'पहले वर्ष का ब्याज (31 मार्च)', value: calc.firstYearInterest },
      ]}
    >
      {lossVsBest > 0 && (
        <p className="result__info result__info--warn">
          6 तारीख के बाद जमा करने से अनुमानित <b>{formatINR(lossVsBest)}</b> कम ब्याज मिलेगा।
        </p>
      )}
    </ResultCard>
  );

  const extras = (
    <YearTable
      title="वित्त वर्ष-दर-वर्ष विवरण (31 मार्च को ब्याज जमा)"
      columns={[
        { key: 'year', label: 'वर्ष' },
        { key: 'opening', label: 'शुरुआती शेष' },
        { key: 'deposit', label: 'जमा' },
        { key: 'interest', label: 'ब्याज' },
        { key: 'closing', label: 'अंतिम शेष' },
      ]}
      rows={calc.rows}
    />
  );

  return <CalcLayout picker={picker} controls={controls} result={result} extras={extras} />;
}
