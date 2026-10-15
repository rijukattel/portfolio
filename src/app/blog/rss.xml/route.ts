import { categoryLabel, journalCopy } from '@/content/journal';
import { getAllPosts } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';

export const dynamic = 'force-static';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** RSS 2.0 feed of the Journal, written to out/blog/rss.xml at build time. */
export async function GET() {
  const [site, posts] = await Promise.all([getSiteConfig(), getAllPosts()]);
  const feedUrl = `${site.url}/blog/rss.xml`;

  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}/`;
      const category = categoryLabel(post.category);
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(post._firstPublishedAt).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        category ? `<category>${escapeXml(category)}</category>` : '',
        '</item>',
      ].join('');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(journalCopy.feedTitle)}</title>
<link>${site.url}/blog/</link>
<description>${escapeXml(journalCopy.description)}</description>
<language>en</language>
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${posts[0] ? `<lastBuildDate>${new Date(posts[0]._updatedAt).toUTCString()}</lastBuildDate>` : ''}
${items}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
