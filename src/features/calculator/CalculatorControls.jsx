import Icon from '../../components/ui/Icon';
import RangeSlider from '../../components/ui/RangeSlider';
import { schemes } from '../../data/schemes';
import { LIMITS } from '../../hooks/useCalculator';
import { formatINR, formatYears } from '../../utils/format';
import './CalculatorControls.css';

export default function CalculatorControls({ scheme, onSchemeChange, amount, onAmountChange, years, onYearsChange }) {
  const note =
    scheme.calcMode === 'simple'
      ? 'इस योजना में ब्याज साधारण दर से मिलता है और पुनर्निवेशित नहीं होता। परिपक्वता मूल्य = मूल राशि + कुल ब्याज।'
      : 'गणना एकमुश्त/वार्षिक जमा के लिए आधिकारिक वित्त वर्ष 2024-25 चक्रवृद्धि नियमों पर आधारित है।';

  return (
    <div className="calc-controls">
      <div className="calc-controls__field">
        <label htmlFor="scheme-select">योजना चुनें</label>
        <div className="calc-controls__select">
          <select id="scheme-select" value={scheme.id} onChange={(e) => onSchemeChange(e.target.value)}>
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.rate}% वार्षिक
              </option>
            ))}
          </select>
          <Icon name="chevronsUpDown" size={16} />
        </div>
      </div>

      <RangeSlider
        label="निवेश राशि"
        valueText={formatINR(amount)}
        value={amount}
        onChange={onAmountChange}
        {...LIMITS.amount}
        marks={[formatINR(LIMITS.amount.min), formatINR(750000), formatINR(LIMITS.amount.max)]}
      />

      <RangeSlider
        label="अवधि (वर्ष)"
        valueText={formatYears(years)}
        value={years}
        onChange={onYearsChange}
        {...LIMITS.years}
        marks={['1 वर्ष', '10 वर्ष', '21 वर्ष']}
      />

      <p className="calc-controls__note">
        <Icon name="shieldCheck" size={18} />
        {note}
      </p>
    </div>
  );
}
