import { categoryLabel, journalCopy } from '@/content/journal';
import { profile } from '@/content/profile';
import { siteDefaults } from '@/config/site';
import type { Post, SiteConfig } from '@/lib/datocms/types';
import type { SocialImage } from '@/lib/seo';

/*
 * schema.org JSON-LD (PLAN §9). Only facts already on the page or in the CV:
 * no invented affiliations, positions or publications.
 */

const personId = (site: SiteConfig) => `${site.url}/#person`;
const websiteId = (site: SiteConfig) => `${site.url}/#website`;

export function personSchema(site: SiteConfig) {
  return {
    '@type': 'Person',
    '@id': personId(site),
    name: profile.name,
    url: `${site.url}/`,
    description: profile.statement,
    email: `mailto:${siteDefaults.email}`,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: `${profile.education.institution}, ${profile.education.university}`,
    },
    knowsAbout: profile.researchInterests,
    sameAs: [siteDefaults.linkedinUrl, site.facebookUrl].filter(Boolean),
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

export function homeGraph(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteSchema(site), personSchema(site)],
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
  post: Post,
  image: SocialImage
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
      personSchema(site),
      breadcrumbSchema(site, [
        { name: 'Home', path: '/' },
        { name: journalCopy.title, path: '/blog/' },
        { name: post.title, path: `/blog/${post.slug}/` },
      ]),
    ],
  };
}
