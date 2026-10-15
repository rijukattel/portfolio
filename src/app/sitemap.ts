import type { MetadataRoute } from 'next';
import { research } from '@/content/research';
import { getAllPosts } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';

export const dynamic = 'force-static';

/** Indexable pages only; /thank-you/ and other noindex pages stay out. */
const staticPaths = [
  '/',
  '/research/',
  '/fieldwork/',
  '/about/',
  '/cv/',
  '/contact/',
  '/gallery/',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, posts] = await Promise.all([getSiteConfig(), getAllPosts()]);
  const latestPost = posts[0]?._updatedAt;

  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}` })),
    ...research.map((entry) => ({
      url: `${site.url}/research/${entry.slug}/`,
    })),
    { url: `${site.url}/blog/`, lastModified: latestPost },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: post._updatedAt,
    })),
  ];
}
