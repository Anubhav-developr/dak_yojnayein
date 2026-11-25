import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import { useGoalFilter } from '../../hooks/useGoalFilter';
import { schemes as allSchemes } from '../../data/schemes';
import GoalFilter from './GoalFilter';
import SchemeGrid from './SchemeGrid';

export default function SchemesSection({
  index = '02',
  eyebrow = 'प्रमुख पोर्टफोलियो',
  title = 'डाक बचत के 6 मुख्य स्तंभ',
  subtitle = 'अपनी वित्तीय प्राथमिकताओं के अनुसार श्रेष्ठ विकल्प चुनें',
  withFilter = false,
}) {
  const { goal, setGoal, schemes } = useGoalFilter();
  const countText =
    schemes.length === allSchemes.length
      ? `सभी ${schemes.length} संप्रभु योजनाएं प्रदर्शित`
      : `${schemes.length} संप्रभु योजनाएं प्रदर्शित`;

  return (
    <section id="schemes" className="section section--white">
      <div className="container">
        <SectionHeading
          index={index}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          aside={<Badge tone="neutral" className="count-badge"><span aria-live="polite">{countText}</span></Badge>}
        />
        {withFilter && (
          <div style={{ marginBottom: '2rem' }}>
            <GoalFilter goal={goal} onChange={setGoal} />
          </div>
        )}
        <SchemeGrid schemes={schemes} />
      </div>
    </section>
  );
}
