import Icon from '../../components/ui/Icon';
import { calcConfig, calcGroups } from '../../data/calcConfig';
import './SchemePicker.css';

export default function SchemePicker({ value, onChange }) {
  const c = calcConfig[value];
  const facts = [
    ['ब्याज दर', `${c.rate}% ${c.rateType === 'floating' ? '(फ्लोटिंग)' : '(निश्चित)'}`],
    ['चक्रवृद्धि', c.compounding],
    ['भुगतान', c.payout],
    ['अवधि', c.tenure],
  ];

  return (
    <div className="picker">
      <label htmlFor="scheme-select">योजना चुनें</label>
      <div className="picker__select">
        <select id="scheme-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {calcGroups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.ids.map((id) => (
                <option key={id} value={id}>
                  {calcConfig[id].label} — {calcConfig[id].rate}%
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <Icon name="chevronsUpDown" size={16} />
      </div>
      <dl className="picker__facts">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
