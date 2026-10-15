/**
 * Code-owned site configuration. DatoCMS "Website settings" can override
 * name, shortName, url, postsPerPage and facebookUrl (see lib/datocms/site.ts).
 * Contact details live on the DatoCMS Profile record.
 */
export const siteDefaults = {
  name: 'Riju Kattel',
  shortName: 'Riju',
  url: 'https://rijukattel.com.np',
  locale: 'en',
  postsPerPage: 6,
  facebookUrl: 'https://www.facebook.com/riju.kattel.75',
} as const;
