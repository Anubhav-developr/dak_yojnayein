import { useMemo, useState } from 'react';
import RangeSlider from '../../components/ui/RangeSlider';
import { formatINR } from '../../utils/format';
import './Extras.css';

const label = (m) => `${Math.floor(m / 12) ? `${Math.floor(m / 12)} वर्ष ` : ''}${m % 12 ? `${m % 12} माह` : ''}`.trim();

export default function PrematureClosure({ maxMonths, defaultMonths, compute }) {
  const [months, setMonths] = useState(Math.min(defaultMonths, maxMonths));
  const out = useMemo(() => compute(months), [compute, months]);

  return (
    <details className="extra">
      <summary>समय-पूर्व बंद करने पर क्या मिलेगा?</summary>
      <div className="extra__body">
        <RangeSlider
          label="खाता कितने समय बाद बंद करेंगे"
          valueText={label(months)}
          min={1}
          max={maxMonths}
          value={months}
          onChange={setMonths}
          marks={['1 माह', label(Math.round(maxMonths / 2)), label(maxMonths)]}
        />
        {out.blocked ? (
          <p className="extra__blocked">{out.blocked}</p>
        ) : (
          <>
            <ul className="extra__lines">
              {out.lines.map((l) => (
                <li key={l.label} className={l.strong ? 'is-strong' : ''}>
                  <span>{l.label}</span>
                  <b>{l.text ?? formatINR(l.amount)}</b>
                </li>
              ))}
            </ul>
            {out.note && <p className="extra__note">{out.note}</p>}
          </>
        )}
      </div>
    </details>
  );
}
