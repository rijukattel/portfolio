import type { Metadata } from 'next';
import { journalCopy } from '@/content/journal';
import { getSiteConfig } from '@/lib/datocms/site';
import type { DatoImage } from '@/lib/datocms/types';

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageSeo = {
  /** Rendered as "<title> · Riju Kattel". */
  title?: string;
  /** Replaces the whole <title>; used on the homepage. */
  absoluteTitle?: string;
  description: string;
  /** Leading and trailing slash, e.g. "/blog/". Becomes the canonical URL. */
  path: string;
  image?: SocialImage | null;
  noindex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    section?: string | null;
  };
};

/** 1200×630 JPEG crop of a DatoCMS upload, centred on its focal point. */
export function socialImage(image: DatoImage, alt?: string): SocialImage {
  const params = new URLSearchParams({
    w: '1200',
    h: '630',
    fit: 'crop',
    fm: 'jpg',
    q: '80',
  });
  if (image.focalPoint) {
    params.set('crop', 'focalpoint');
    params.set('fp-x', String(image.focalPoint.x));
    params.set('fp-y', String(image.focalPoint.y));
  }
  return {
    url: `${image.url}?${params}`,
    width: 1200,
    height: 630,
    alt: alt ?? image.alt ?? '',
  };
}

/**
 * Complete metadata for one page. Next.js replaces (rather than merges)
 * openGraph and alternates per page, so every page gets the full set here.
 */
export async function pageMetadata(seo: PageSeo): Promise<Metadata> {
  const site = await getSiteConfig();
  const image =
    seo.image ??
    (site.defaultOgImage ? { ...site.defaultOgImage, alt: site.name } : null);
  const images = image ? [image] : undefined;
  const socialTitle =
    seo.absoluteTitle ??
    (seo.title ? `${seo.title} · ${site.name}` : site.name);
  const shared = {
    url: seo.path,
    siteName: site.name,
    title: socialTitle,
    description: seo.description,
    images,
  };

  return {
    title: seo.absoluteTitle ? { absolute: seo.absoluteTitle } : seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.path,
      types: {
        'application/rss+xml': [
          { url: '/blog/rss.xml', title: journalCopy.feedTitle },
        ],
      },
    },
    openGraph: seo.article
      ? {
          ...shared,
          type: 'article',
          publishedTime: seo.article.publishedTime,
          modifiedTime: seo.article.modifiedTime,
          section: seo.article.section ?? undefined,
          authors: [`${site.url}/about/`],
        }
      : { ...shared, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: seo.description,
      images: images?.map((img) => img.url),
    },
    ...(seo.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
