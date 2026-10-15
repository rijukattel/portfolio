import { PageIntro } from '@/components/layout/PageIntro';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata() {
  return pageMetadata({
    title: 'Academic CV',
    description:
      'Academic CV of Riju Kattel: education, research experience, fieldwork, training, presentations and awards.',
    path: '/cv/',
  });
}

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
