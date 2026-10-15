import { PageIntro } from '@/components/layout/PageIntro';
import { ActionLink } from '@/components/ui/ActionLink';
import { getSitePage } from '@/lib/datocms/content';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const page = await getSitePage('thank-you');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/thank-you/',
    noindex: true,
  });
}

/** Where the contact form lands after Netlify accepts a submission. */
export default async function ThankYouPage() {
  const page = await getSitePage('thank-you');
  return (
    <PageIntro label={page.label} title={page.title} lede={page.lede}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
        <ActionLink href="/research">Explore research</ActionLink>
        <ActionLink href="/blog" variant="quiet">
          Read the Journal
        </ActionLink>
      </div>
    </PageIntro>
  );
}
