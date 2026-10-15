import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata: Metadata = { title: 'Fieldwork' };

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
