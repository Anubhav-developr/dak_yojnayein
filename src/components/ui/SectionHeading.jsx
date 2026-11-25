import './SectionHeading.css';

export default function SectionHeading({ index, eyebrow, title, subtitle, aside }) {
  return (
    <header className="section-heading">
      <div className="section-heading__text">
        <p className="section-heading__eyebrow">
          <span className="section-heading__dot" aria-hidden="true" />
          {index && <span>{index} / </span>}
          {eyebrow}
        </p>
        <h2 className="section-heading__title">{title}</h2>
        {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      </div>
      {aside && <div className="section-heading__aside">{aside}</div>}
    </header>
  );
}
