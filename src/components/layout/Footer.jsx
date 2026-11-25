import { Link } from 'react-router';
import { navLinks } from '../../data/nav';
import Logo from './Logo';
import Icon from '../ui/Icon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo inverse showTagline={false} />
          <p>
            संप्रभु-समर्थित लघु बचत योजनाओं के लिए स्वतंत्र मार्गदर्शिका। सभी ब्याज दरें एवं नियम भारत सरकार के वित्त
            मंत्रालय की अधिसूचनाओं के अधीन हैं।
          </p>
          <span className="footer__guarantee">
            <Icon name="checkCircle" size={16} />
            भारत सरकार द्वारा 100% गारंटीकृत
          </span>
        </div>

        <nav className="footer__col" aria-label="त्वरित लिंक">
          <h3>त्वरित लिंक</h3>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3>डाक हेल्पलाइन</h3>
          <p className="footer__phone">
            टोल-फ्री: <a href="tel:18002666868">1800-266-6868</a>
          </p>
          <p className="footer__hours">समय: सोमवार–शनिवार, सुबह 9:00 से शाम 6:00 बजे IST</p>
        </div>
      </div>

      <div className="container footer__legal">
        © 2025 भारतीय डाक योजनाएं पोर्टल | सर्वाधिकार सुरक्षित।
      </div>
    </footer>
  );
}
