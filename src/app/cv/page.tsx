import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata: Metadata = { title: 'Academic CV' };

// Stub until Phase 5 (docs/PLAN.md §11). Web CV only — no PDF (PLAN §13).
export default function CvPage() {
  return (
    <PageIntro
      label="Curriculum vitae"
      title="Academic CV"
      lede="Education, research, field experience, training and awards."
    >
      <p className="caption">In preparation</p>
    </PageIntro>
  );
}
