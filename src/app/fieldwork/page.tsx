import { PageIntro } from '@/components/layout/PageIntro';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata() {
  return pageMetadata({
    title: 'Fieldwork',
    description:
      'Field experience: farmer engagement with GeoKrishi, managing a family farm in Ratnanagar, and community work with the Lamahi Youth Network.',
    path: '/fieldwork/',
  });
}

// Stub until Phase 5 (docs/PLAN.md §11).
export default function FieldworkPage() {
  return (
    <PageIntro
      label="Fieldwork"
      title="Fieldwork"
      lede="Farmer engagement with GeoKrishi, managing the family farm in Ratnanagar, and community work with the Lamahi Youth Network."
    >
      <p className="caption">In preparation</p>
    </PageIntro>
  );
}
