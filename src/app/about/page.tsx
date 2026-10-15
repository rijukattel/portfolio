import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata: Metadata = { title: 'About' };

// Stub until Phase 5 (docs/PLAN.md §11).
export default function AboutPage() {
  return (
    <PageIntro
      label="About"
      title="About"
      lede="B.Sc. Agriculture, Institute of Agriculture and Animal Science, Tribhuvan University, 2020–2024."
    >
      <p className="caption">In preparation</p>
    </PageIntro>
  );
}
