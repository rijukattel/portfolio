import type { Metadata, Route } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';
import { ActionLink } from '@/components/ui/ActionLink';
import { getSitePage } from '@/lib/datocms/content';
import { getLabels } from '@/lib/datocms/labels';
import { getSiteConfig } from '@/lib/datocms/site';

export async function generateMetadata(): Promise<Metadata> {
  const [page, labels] = await Promise.all([
    getSitePage('not-found'),
    getLabels(),
  ]);
  return {
    title: labels.notFoundMetaTitle,
    description: page.description,
    robots: { index: false, follow: true },
  };
}

/**
 * Exported as 404.html, which Netlify serves with a real 404 status for any
 * unknown URL (the old site answered every URL with the homepage and 200).
 */
export default async function NotFound() {
  const [page, site, labels] = await Promise.all([
    getSitePage('not-found'),
    getSiteConfig(),
    getLabels(),
  ]);
  return (
    <PageIntro label={page.label} title={page.title} lede={page.lede}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
        <ActionLink href="/">{labels.notFoundHome}</ActionLink>
        {site.navigation.map((item) => (
          <ActionLink key={item.href} href={item.href as Route} variant="quiet">
            {item.label}
          </ActionLink>
        ))}
      </div>
    </PageIntro>
  );
}
