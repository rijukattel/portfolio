import { datoQuery, once } from './client';
import type { SiteConfig } from './types';

/*
 * Site settings and navigation from the DatoCMS "Site settings" singleton.
 * (The legacy "Website settings" model belongs to the old Gatsby site.)
 */
const siteConfigQuery = /* GraphQL */ `
  query SiteConfig {
    siteConfig {
      siteName
      shortName
      siteUrl
      defaultShareImage {
        url
        width
        height
        alt
      }
      facebookUrl
      navigation {
        label
        path
        highlight
        pinned
      }
    }
  }
`;

type SiteConfigQuery = {
  siteConfig: {
    siteName: string;
    shortName: string | null;
    siteUrl: string;
    defaultShareImage: {
      url: string;
      width: number;
      height: number;
      alt: string | null;
    } | null;
    facebookUrl: string | null;
    navigation: {
      label: string;
      path: string;
      highlight: boolean;
      pinned: boolean;
    }[];
  } | null;
};

export const getSiteConfig = once(async (): Promise<SiteConfig> => {
  const { siteConfig } = await datoQuery<SiteConfigQuery>(siteConfigQuery);
  if (!siteConfig) throw new Error('DatoCMS record missing: Site settings');

  const url = toOrigin(siteConfig.siteUrl);
  if (!url)
    throw new Error(`Site settings: invalid site URL "${siteConfig.siteUrl}"`);

  return {
    name: siteConfig.siteName.trim(),
    shortName: siteConfig.shortName?.trim() || siteConfig.siteName.trim(),
    url,
    defaultOgImage: siteConfig.defaultShareImage,
    facebookUrl: siteConfig.facebookUrl?.trim() || null,
    navigation: siteConfig.navigation.map((item) => ({
      label: item.label,
      // Typed routes are path strings without the trailing slash.
      href: item.path.replace(/(.)\/$/, '$1'),
      highlight: item.highlight,
      pinned: item.pinned,
    })),
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
