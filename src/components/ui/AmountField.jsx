import { useEffect, useState } from 'react';
import RangeSlider from './RangeSlider';
import { formatINR } from '../../utils/format';
import './AmountField.css';

const HARD_MAX = 100000000; // ₹10 crore cap for typed values when a scheme has no upper limit

// Clamp to [min, max] and snap to the scheme's allowed multiples.
export function snapAmount(value, { min, max, step }) {
  const hi = max ?? HARD_MAX;
  let x = Math.min(Math.max(value, min), hi);
  x = min + Math.round((x - min) / step) * step;
  if (x > hi) x -= step;
  return x;
}

export default function AmountField({ label, value, onChange, min, max = null, step, sliderMax, unitHint }) {
  const top = sliderMax ?? max;
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  const commit = () => {
    const digits = draft.replace(/[^\d]/g, '');
    if (digits === '') return setDraft(String(value));
    onChange(snapAmount(Number(digits), { min, max, step }));
  };

  const mid = snapAmount((min + top) / 2, { min, max: top, step });
  const hint = `न्यूनतम ${formatINR(min)} · ${max ? `अधिकतम ${formatINR(max)}` : 'कोई ऊपरी सीमा नहीं'} · ${formatINR(step)} के गुणक${unitHint ? ` · ${unitHint}` : ''}`;

  return (
    <RangeSlider
      label={label}
      valueText={formatINR(value)}
      min={min}
      max={top}
      step={step}
      value={Math.min(value, top)}
      onChange={onChange}
      marks={[formatINR(min), formatINR(mid), formatINR(top)]}
    >
      <div className="amount-input">
        <span aria-hidden="true">₹</span>
        <input
          type="text"
          inputMode="numeric"
          aria-label={`${label}: राशि टाइप करें`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === 'Enter' && commit()}
        />
      </div>
      <p className="amount-hint">{hint}</p>
    </RangeSlider>
  );
}
