import Icon from './Icon';
import './Badge.css';

// tone: violet | amber | green | neutral | outline
export default function Badge({ tone = 'violet', icon, className = '', children }) {
  return (
    <span className={`badge badge--${tone} ${className}`.trim()}>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}
