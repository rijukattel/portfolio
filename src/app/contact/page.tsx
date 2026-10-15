import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';
import { ActionLink } from '@/components/ui/ActionLink';
import { siteDefaults } from '@/config/site';

export const metadata: Metadata = { title: 'Contact' };

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
