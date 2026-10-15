import { PageIntro } from '@/components/layout/PageIntro';
import { pageMetadata } from '@/lib/seo';
import { ActionLink } from '@/components/ui/ActionLink';
import { siteDefaults } from '@/config/site';

export function generateMetadata() {
  return pageMetadata({
    title: 'Contact',
    description:
      'Contact Riju Kattel to discuss agricultural research or postgraduate opportunities.',
    path: '/contact/',
  });
}

// Stub until Phase 5 (docs/PLAN.md §11).
export default function ContactPage() {
  return (
    <PageIntro
      label="Contact"
      title="Contact"
      lede="To discuss research or postgraduate opportunities, write by email."
    >
      <div>
        <ActionLink href={`mailto:${siteDefaults.email}`}>
          {siteDefaults.email}
        </ActionLink>
      </div>
    </PageIntro>
  );
}
