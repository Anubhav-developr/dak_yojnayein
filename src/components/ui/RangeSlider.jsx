import { useId } from 'react';
import './RangeSlider.css';

export default function RangeSlider({ label, valueText, min, max, step = 1, value, onChange, marks = [], children }) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className="range">
      <div className="range__head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{valueText}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ '--fill': `${fill}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="range__marks" aria-hidden="true">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      {children}
    </div>
  );
}
