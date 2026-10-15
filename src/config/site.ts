/**
 * Code-owned site configuration. DatoCMS "Website settings" can override
 * name, shortName, url, postsPerPage and facebookUrl (see lib/datocms/site.ts);
 * everything else here is authoritative.
 */
export const siteDefaults = {
  name: 'Riju Kattel',
  shortName: 'Riju',
  url: 'https://rijukattel.com.np',
  locale: 'en',
  postsPerPage: 6,
  email: 'rijukattel08@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/rijukattel222',
  facebookUrl: 'https://www.facebook.com/riju.kattel.75',
} as const;
