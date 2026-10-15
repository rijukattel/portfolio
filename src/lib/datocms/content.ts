import type {
  CvItem,
  CvSection,
  ExperienceEntry,
  PageKey,
  ResearchEntry,
  ResearchType,
  Theme,
  ThemeId,
} from '@/content/types';
import { datoQuery, once } from './client';
import { imageFragment } from './fragments';
import { getLabels } from './labels';
import type { DatoImage } from './types';

/*
 * All editorial content comes from DatoCMS (docs/CONTENT-MODEL.md). One query
 * per build worker; the records are mapped to the shapes components use.
 * Missing required records fail the build rather than ship an empty page.
 */

const contentQuery = /* GraphQL */ `
  query SiteContent {
    homePage {
      metaTitle
      metaDescription
      heroTitle
      heroLede
      heroImage {
        ...ImageParts
      }
      questionsTitle
      questionsIntro
      fieldTitle
      fieldIntro
      fieldPhotos {
        ...ImageParts
      }
      evidenceTitle
      evidenceIntro
      journalTitle
      nextTitle
      nextIntro
      nextDirections {
        title
        text
      }
    }
    profile {
      name
      location
      statement
      email
      linkedinUrl
      degree
      institution
      educationPlace
      educationPeriod
      educationDetails
      thesis {
        slug
        title
      }
      thesisTechniques
      researchInterests
      aboutBio
    }
    allSitePages(first: 100) {
      pageKey
      label
      title
      lede
      metaDescription
      intro
      note
      options
      photos {
        ...ImageParts
      }
    }
    allResearchThemes(first: 100, orderBy: position_ASC) {
      title
      themeKey
      summary
      mapX
      mapY
      links {
        label
        detail
        url
      }
    }
    allResearchEntries(first: 100, orderBy: position_ASC) {
      title
      slug
      researchType
      depth
      themes {
        themeKey
      }
      period
      location
      role
      summary
      question
      sample
      context
      methods
      findings
      implications
      limitations
      references
      researchStatus
      listedInCv
      cvPosition
      journalPost {
        slug
        title
      }
      featured
      chartTitle
      chartCaption
      chartRows {
        label
        value
        highlight
      }
    }
    allExperienceEntries(first: 100, orderBy: position_ASC) {
      role
      organisation
      category
      period
      location
      points
    }
    allCvEntries(first: 100, orderBy: position_ASC) {
      title
      section
      detail
      period
      points
    }
  }
  ${imageFragment}
`;

type Maybe<T> = T | null;

type RawContent = {
  homePage: Maybe<{
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroLede: string;
    heroImage: DatoImage;
    questionsTitle: Maybe<string>;
    questionsIntro: Maybe<string>;
    fieldTitle: Maybe<string>;
    fieldIntro: Maybe<string>;
    fieldPhotos: DatoImage[];
    evidenceTitle: Maybe<string>;
    evidenceIntro: Maybe<string>;
    journalTitle: Maybe<string>;
    nextTitle: Maybe<string>;
    nextIntro: Maybe<string>;
    nextDirections: { title: string; text: string }[];
  }>;
  profile: Maybe<{
    name: string;
    location: Maybe<string>;
    statement: string;
    email: string;
    linkedinUrl: Maybe<string>;
    degree: Maybe<string>;
    institution: Maybe<string>;
    educationPlace: Maybe<string>;
    educationPeriod: Maybe<string>;
    educationDetails: Maybe<string>;
    thesis: Maybe<{ slug: string; title: string }>;
    thesisTechniques: Maybe<string>;
    researchInterests: Maybe<string>;
    aboutBio: Maybe<string>;
  }>;
  allSitePages: {
    pageKey: PageKey;
    label: Maybe<string>;
    title: string;
    lede: Maybe<string>;
    metaDescription: Maybe<string>;
    intro: Maybe<string>;
    note: Maybe<string>;
    options: Maybe<string>;
    photos: DatoImage[];
  }[];
  allResearchThemes: {
    title: string;
    themeKey: ThemeId;
    summary: string;
    mapX: Maybe<number>;
    mapY: Maybe<number>;
    links: { label: string; detail: Maybe<string>; url: string }[];
  }[];
  allResearchEntries: {
    title: string;
    slug: string;
    researchType: ResearchType;
    depth: 'brief' | 'full';
    themes: { themeKey: ThemeId }[];
    period: Maybe<string>;
    location: Maybe<string>;
    role: Maybe<string>;
    summary: string;
    question: Maybe<string>;
    sample: Maybe<string>;
    context: Maybe<string>;
    methods: Maybe<string>;
    findings: Maybe<string>;
    implications: Maybe<string>;
    limitations: Maybe<string>;
    references: Maybe<string>;
    researchStatus: string;
    listedInCv: boolean;
    cvPosition: Maybe<number>;
    journalPost: Maybe<{ slug: string; title: string }>;
    featured: boolean;
    chartTitle: Maybe<string>;
    chartCaption: Maybe<string>;
    chartRows: { label: string; value: number; highlight: boolean }[];
  }[];
  allExperienceEntries: {
    role: string;
    organisation: string;
    category: ExperienceEntry['category'];
    period: string;
    location: string;
    points: string;
  }[];
  allCvEntries: {
    title: string;
    section: CvSection;
    detail: Maybe<string>;
    period: Maybe<string>;
    points: Maybe<string>;
  }[];
};

/** "One per line" text fields → trimmed, non-empty lines. */
const lines = (text: Maybe<string> | undefined) =>
  (text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
const optional = (text: Maybe<string>) => text?.trim() || undefined;
const optionalList = (text: Maybe<string>) => {
  const list = lines(text);
  return list.length ? list : undefined;
};

export type HomeContent = NonNullable<RawContent['homePage']>;

export type SitePage = {
  key: PageKey;
  label: string;
  title: string;
  lede?: string;
  description: string;
  intro?: string;
  note?: string;
  options: string[];
  photos: DatoImage[];
};

export type Profile = {
  name: string;
  location?: string;
  statement: string;
  email: string;
  linkedinUrl?: string;
  education: {
    degree?: string;
    institution?: string;
    place?: string;
    period?: string;
    details: string[];
    thesis: { slug: string; title: string; techniques: string[] } | null;
  };
  researchInterests: string[];
  bio: string[];
};

function required<T>(value: T | null, model: string): T {
  if (!value) throw new Error(`DatoCMS record missing: ${model}`);
  return value;
}

export const getContent = once(async () => {
  const [raw, labels] = await Promise.all([
    datoQuery<RawContent>(contentQuery),
    getLabels(),
  ]);
  const home = required(raw.homePage, 'Home page');
  const profileRecord = required(raw.profile, 'Profile');

  const profile: Profile = {
    name: profileRecord.name,
    location: optional(profileRecord.location),
    statement: profileRecord.statement,
    email: profileRecord.email,
    linkedinUrl: optional(profileRecord.linkedinUrl),
    education: {
      degree: optional(profileRecord.degree),
      institution: optional(profileRecord.institution),
      place: optional(profileRecord.educationPlace),
      period: optional(profileRecord.educationPeriod),
      details: lines(profileRecord.educationDetails),
      thesis: profileRecord.thesis
        ? {
            ...profileRecord.thesis,
            techniques: lines(profileRecord.thesisTechniques),
          }
        : null,
    },
    researchInterests: lines(profileRecord.researchInterests),
    bio: lines(profileRecord.aboutBio),
  };

  const pages = Object.fromEntries(
    raw.allSitePages.map((page) => [
      page.pageKey,
      {
        key: page.pageKey,
        label: page.label ?? page.title,
        title: page.title,
        lede: optional(page.lede),
        description: optional(page.metaDescription) ?? page.title,
        intro: optional(page.intro),
        note: optional(page.note),
        options: lines(page.options),
        photos: page.photos,
      } satisfies SitePage,
    ])
  ) as Partial<Record<PageKey, SitePage>>;

  const themes: Theme[] = raw.allResearchThemes.map((theme) => ({
    id: theme.themeKey,
    title: theme.title,
    summary: theme.summary,
    position: { x: theme.mapX ?? 50, y: theme.mapY ?? 50 },
    links: theme.links.map((link) => ({
      label: link.label,
      detail: link.detail ?? '',
      href: link.url,
    })),
  }));

  const research: ResearchEntry[] = raw.allResearchEntries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    type: entry.researchType,
    depth: entry.depth,
    themes: entry.themes.map((theme) => theme.themeKey),
    period: optional(entry.period),
    location: optional(entry.location),
    role: optional(entry.role),
    summary: entry.summary,
    question: optional(entry.question),
    sample: optional(entry.sample),
    context: optionalList(entry.context),
    methods: optionalList(entry.methods),
    findings: lines(entry.findings).map((statement) => ({
      statement,
      verification: 'verified' as const,
    })),
    implications: optionalList(entry.implications),
    limitations: optionalList(entry.limitations),
    references: optionalList(entry.references),
    status: entry.researchStatus,
    sources: [
      ...(entry.listedInCv
        ? [{ label: labels.cvSourceLabel, kind: 'cv' as const }]
        : []),
      ...(entry.journalPost
        ? [
            {
              label: `${labels.journalSourceLabel}: ${entry.journalPost.title.trim()}`,
              kind: 'journal' as const,
            },
          ]
        : []),
    ],
    journalSlug: entry.journalPost?.slug,
    featured: entry.featured,
    listedInCv: entry.listedInCv,
    cvPosition: entry.cvPosition,
    chart:
      entry.chartRows.length > 0
        ? {
            title: entry.chartTitle ?? '',
            caption: entry.chartCaption ?? '',
            rows: entry.chartRows,
          }
        : undefined,
  }));

  const experience: ExperienceEntry[] = raw.allExperienceEntries.map(
    (entry) => ({
      ...entry,
      points: lines(entry.points),
      verification: 'verified',
    })
  );

  const cv = {} as Record<CvSection, CvItem[]>;
  for (const entry of raw.allCvEntries) {
    (cv[entry.section] ??= []).push({
      title: entry.title,
      detail: optional(entry.detail),
      period: optional(entry.period),
      points: optionalList(entry.points),
    });
  }

  return { home, profile, pages, themes, research, experience, cv };
});

export async function getSitePage(key: PageKey): Promise<SitePage> {
  const { pages } = await getContent();
  return required(pages[key] ?? null, `Site page "${key}"`);
}

export async function getProfile() {
  return (await getContent()).profile;
}

export async function getResearch() {
  return (await getContent()).research;
}

export async function getResearchEntry(slug: string) {
  return (await getResearch()).find((entry) => entry.slug === slug) ?? null;
}

/** The research record a Journal post reports on, if any. */
export async function getResearchForJournalPost(postSlug: string) {
  return (
    (await getResearch()).find((entry) => entry.journalSlug === postSlug) ??
    null
  );
}

/** Other work sharing a theme, closest overlap first. */
export async function getRelatedResearch(entry: ResearchEntry, limit = 3) {
  return (await getResearch())
    .filter((other) => other.slug !== entry.slug)
    .map((other) => ({
      other,
      shared: other.themes.filter((theme) => entry.themes.includes(theme))
        .length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ other }) => other);
}
