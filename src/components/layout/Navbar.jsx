import { Link, NavLink } from 'react-router';
import { navLinks } from '../../data/nav';
import Logo from './Logo';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />

        <nav className="navbar__links" aria-label="मुख्य मेनू">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Button to="/compare" variant="ghost" leadingIcon="sliders" className="navbar__compare">
            योजनाओं की तुलना करें
          </Button>
          <Link to="/calculator" className="navbar__icon-btn" aria-label="ब्याज कैलकुलेटर खोलें">
            <Icon name="layoutGrid" size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
