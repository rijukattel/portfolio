import { PageIntro } from '@/components/layout/PageIntro';
import { ActionLink } from '@/components/ui/ActionLink';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata() {
  return pageMetadata({
    title: 'Thank you',
    description: 'Your message to Riju Kattel has been sent.',
    path: '/thank-you/',
    noindex: true,
  });
}

/** Where the contact form lands after Netlify accepts a submission. */
export default function ThankYouPage() {
  return (
    <PageIntro
      label="Contact"
      title="Thank you"
      lede="Your message has been sent. In the meantime, the research and the Journal are a good place to start."
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
        <ActionLink href="/research">Explore research</ActionLink>
        <ActionLink href="/blog" variant="quiet">
          Read the Journal
        </ActionLink>
      </div>
    </PageIntro>
  );
}
