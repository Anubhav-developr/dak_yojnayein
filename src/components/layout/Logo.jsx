import { Link } from 'react-router';
import Icon from '../ui/Icon';
import './Logo.css';

export default function Logo({ inverse = false, showTagline = true }) {
  return (
    <Link to="/" className={`logo ${inverse ? 'logo--inverse' : ''}`} aria-label="भारतीय डाक योजनाएं, मुख पृष्ठ">
      <span className="logo__mark">
        <Icon name="landmark" size={22} />
      </span>
      <span className="logo__text">
        <span className="logo__name">
          भारतीय डाक<em>योजनाएं</em>
        </span>
        {showTagline && (
          <span className="logo__tagline">
            <i aria-hidden="true" />
            संप्रभु वित्तीय सेवा पोर्टल
          </span>
        )}
      </span>
    </Link>
  );
}
