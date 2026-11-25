import SchemesSection from '../features/schemes/SchemesSection';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Goals() {
  usePageTitle('लक्ष्य अनुसार खोजें');
  return (
    <SchemesSection
      withFilter
      index={null}
      eyebrow="लक्ष्य अनुसार खोजें"
      title="अपने लक्ष्य के लिए सही योजना चुनें"
      subtitle="टैक्स बचत, बेटी का भविष्य, मासिक आय या रकम दोगुनी करना: अपना लक्ष्य चुनें।"
    />
  );
}
