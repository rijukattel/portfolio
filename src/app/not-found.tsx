import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';
import { ActionLink } from '@/components/ui/ActionLink';
import { getSitePage } from '@/lib/datocms/content';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page could not be found.',
  robots: { index: false, follow: true },
};

/**
 * Exported as 404.html, which Netlify serves with a real 404 status for any
 * unknown URL (the old site answered every URL with the homepage and 200).
 */
export default async function NotFound() {
  const page = await getSitePage('not-found');
  return (
    <PageIntro label={page.label} title={page.title} lede={page.lede}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
        <ActionLink href="/">Go to the homepage</ActionLink>
        <ActionLink href="/research" variant="quiet">
          Research
        </ActionLink>
        <ActionLink href="/blog" variant="quiet">
          Journal
        </ActionLink>
        <ActionLink href="/cv" variant="quiet">
          Academic CV
        </ActionLink>
      </div>
    </PageIntro>
  );
}
