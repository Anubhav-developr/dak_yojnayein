import Icon from '../../components/ui/Icon';
import './CalcLayout.css';

export function CalcNote({ children, tone = 'info' }) {
  return (
    <p className={`calc-note calc-note--${tone}`}>
      <Icon name={tone === 'warn' ? 'star' : 'shieldCheck'} size={16} />
      <span>{children}</span>
    </p>
  );
}

// Two columns: [scheme picker + controls] | [result card]; extras (tables, closure) span below.
export default function CalcLayout({ picker, controls, result, extras }) {
  return (
    <div className="calc">
      <div className="calc__left">
        {picker}
        {controls}
      </div>
      <div className="calc__right">{result}</div>
      {extras && <div className="calc__extras">{extras}</div>}
    </div>
  );
}
