import './Segmented.css';

export default function Segmented({ label, options, value, onChange, help }) {
  return (
    <div className="seg-field">
      <span className="seg-field__label">{label}</span>
      <div className="seg" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            className={`seg__btn ${value === o.value ? 'is-active' : ''}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
      {help && <p className="seg-field__help">{help}</p>}
    </div>
  );
}
