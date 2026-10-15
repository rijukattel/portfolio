import { PageIntro } from '@/components/layout/PageIntro';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata() {
  return pageMetadata({
    title: 'About',
    description:
      'About Riju Kattel: B.Sc. Agriculture graduate of the Institute of Agriculture and Animal Science, Tribhuvan University, with research interests in climate resilience and pesticide governance.',
    path: '/about/',
  });
}

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
