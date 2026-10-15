import { PageIntro } from '@/components/layout/PageIntro';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata() {
  return pageMetadata({
    title: 'Research',
    description:
      "Studies, field trials and academic projects by Riju Kattel on climate adaptation, crop diversity, pesticides and pollinators, and farmers' decisions in Nepal.",
    path: '/research/',
  });
}

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
