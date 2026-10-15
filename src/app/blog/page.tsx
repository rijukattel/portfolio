import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata: Metadata = { title: 'Journal' };

// Stub until Phase 2 (docs/PLAN.md §11).
export default function JournalPage() {
  return (
    <PageIntro
      label="Journal"
      title="Journal"
      lede="Notes from the family orchard, the field and the classroom."
    >
      <p className="caption">In preparation</p>
    </PageIntro>
  );
}
