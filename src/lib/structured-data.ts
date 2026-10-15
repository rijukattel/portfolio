import type { Profile } from '@/lib/datocms/content';
import type { Post, SiteConfig } from '@/lib/datocms/types';
import { categoryLabel } from '@/lib/format';
import type { SocialImage } from '@/lib/seo';

/*
 * schema.org JSON-LD (PLAN §9). Only facts already on the page and in the
 * DatoCMS Profile: no invented affiliations, positions or publications.
 */

const personId = (site: SiteConfig) => `${site.url}/#person`;
const websiteId = (site: SiteConfig) => `${site.url}/#website`;

export function personSchema(site: SiteConfig, profile: Profile) {
  const { institution } = profile.education;
  return {
    '@type': 'Person',
    '@id': personId(site),
    name: profile.name,
    url: `${site.url}/`,
    description: profile.statement,
    email: `mailto:${profile.email}`,
    ...(institution
      ? { alumniOf: { '@type': 'CollegeOrUniversity', name: institution } }
      : {}),
    knowsAbout: profile.researchInterests,
    sameAs: [profile.linkedinUrl, site.facebookUrl].filter(Boolean),
  };
}

export function websiteSchema(site: SiteConfig) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: `${site.url}/`,
    name: site.name,
    inLanguage: 'en',
    publisher: { '@id': personId(site) },
  };
}

export function homeGraph(site: SiteConfig, profile: Profile) {
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteSchema(site), personSchema(site, profile)],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbSchema(site: SiteConfig, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function blogPostingGraph(
  site: SiteConfig,
  profile: Profile,
  post: Post,
  image: SocialImage,
  journalTitle: string
) {
  const url = `${site.url}/blog/${post.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        image: [image.url],
        datePublished: post._firstPublishedAt,
        dateModified: post._updatedAt,
        inLanguage: 'en',
        articleSection: categoryLabel(post.category) ?? undefined,
        author: { '@id': personId(site) },
        publisher: { '@id': personId(site) },
        isPartOf: { '@id': websiteId(site) },
      },
      personSchema(site, profile),
      breadcrumbSchema(site, [
        { name: 'Home', path: '/' },
        { name: journalTitle, path: '/blog/' },
        { name: post.title, path: `/blog/${post.slug}/` },
      ]),
    ],
  };
}
