import { Link } from 'react-router';
import Icon from './Icon';
import './Button.css';

export default function Button({
  to,
  variant = 'primary', // primary | soft | amber | ghost
  block = false,
  leadingIcon,
  trailingIcon,
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn', `btn--${variant}`, block && 'btn--block', className].filter(Boolean).join(' ');
  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={16} />}
      <span>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={16} />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
