import { siteDefaults } from '@/config/site';
import { datoQuery, once } from './client';
import type { SiteConfig } from './types';

const siteConfigQuery = /* GraphQL */ `
  query SiteConfig {
    _site {
      favicon {
        url
      }
      globalSeo {
        facebookPageUrl
      }
    }
    websiteSetting {
      name
      shortName
      siteUrl
      postsPerPage
      defaultOgImage {
        url
        width
        height
      }
    }
  }
`;

type SiteConfigQuery = {
  _site: {
    favicon: { url: string } | null;
    globalSeo: { facebookPageUrl: string | null } | null;
  };
  websiteSetting: {
    name: string | null;
    shortName: string | null;
    siteUrl: string | null;
    postsPerPage: number | null;
    defaultOgImage: { url: string; width: number; height: number } | null;
  } | null;
};

export const getSiteConfig = once(async (): Promise<SiteConfig> => {
  const { _site, websiteSetting: settings } =
    await datoQuery<SiteConfigQuery>(siteConfigQuery);

  return {
    name: settings?.name?.trim() || siteDefaults.name,
    shortName: settings?.shortName?.trim() || siteDefaults.shortName,
    url: toOrigin(settings?.siteUrl) ?? siteDefaults.url,
    postsPerPage: settings?.postsPerPage || siteDefaults.postsPerPage,
    defaultOgImage: settings?.defaultOgImage ?? null,
    faviconUrl: _site.favicon?.url ?? null,
    facebookUrl: _site.globalSeo?.facebookPageUrl || siteDefaults.facebookUrl,
  };
});

/** Canonical URLs are built from this, so accept only a clean origin. */
function toOrigin(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
}
