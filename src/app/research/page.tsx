import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata: Metadata = { title: 'Research' };

// Stub until Phase 4 (docs/PLAN.md §11).
export default function ResearchPage() {
  return (
    <PageIntro
      label="Research"
      title="Research"
      lede="Studies, field trials and academic projects on climate adaptation, crop diversity, pesticides and pollinators, and farmers' decisions."
    >
      <p className="caption">In preparation</p>
    </PageIntro>
  );
}
