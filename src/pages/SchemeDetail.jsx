import { Link, useParams } from 'react-router';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { getScheme } from '../data/schemes';
import { usePageTitle } from '../hooks/usePageTitle';
import NotFound from './NotFound';
import './SchemeDetail.css';

export default function SchemeDetail() {
  const { schemeId } = useParams();
  const scheme = getScheme(schemeId);
  usePageTitle(scheme?.name ?? 'योजना नहीं मिली');

  if (!scheme) return <NotFound />;

  const facts = [
    ['अवधि', scheme.tenureLabel],
    ['न्यूनतम जमा', scheme.minDeposit],
    ['टैक्स स्थिति', scheme.taxStatus],
    ['भुगतान', scheme.payoutLabel],
  ];

  return (
    <section className="section section--tint">
      <div className="container detail">
        <nav className="detail__crumbs" aria-label="ब्रेडक्रंब">
          <Link to="/">सभी योजनाएं</Link> / <span>{scheme.shortName}</span>
        </nav>

        <header className="detail__head">
          <div>
            <Badge tone="violet">{scheme.tag}</Badge>
            <h1>{scheme.name}</h1>
            <p>{scheme.description}</p>
          </div>
          <div className="detail__rate">
            <strong>{scheme.rate}%</strong>
            <span>वार्षिक</span>
          </div>
        </header>

        <dl className="detail__facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="detail__cols">
          <div className="detail__panel">
            <h2>मुख्य विशेषताएं</h2>
            <ul>
              {scheme.features.map((f) => (
                <li key={f}><Icon name="checkCircle" size={16} /> {f}</li>
              ))}
            </ul>
          </div>
          <div className="detail__panel">
            <h2>पात्रता</h2>
            <p>{scheme.eligibility}</p>
          </div>
        </div>

        <div className="detail__cta">
          <Button to={`/calculator?scheme=${scheme.id}`} trailingIcon="arrowRight">इस योजना का रिटर्न देखें</Button>
          <Button to="/compare" variant="soft">अन्य योजनाओं से तुलना करें</Button>
        </div>
      </div>
    </section>
  );
}
