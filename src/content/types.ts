/**
 * Content model for code-owned research and experience (PLAN §5).
 * Every claim carries its evidence so unverified material can't ship by accident.
 */

/** Backed by the CV or a source document, or still awaiting confirmation. */
export type Verification = 'verified' | 'needs-confirmation';

export type ThemeId =
  | 'climate-resilience'
  | 'pesticides-pollinators'
  | 'soil-health'
  | 'crop-diversity'
  | 'farmers-markets';

export type ResearchType =
  | 'thesis'
  | 'independent-study'
  | 'survey'
  | 'collaboration'
  | 'field-trial'
  | 'semester-project';

/** "brief" shows CV-stated facts only; "full" is the six-section case study. */
export type ResearchDepth = 'brief' | 'full';

export type SourceRef = {
  label: string;
  kind: 'cv' | 'journal' | 'document';
  href?: string;
};

export type Finding = {
  statement: string;
  verification: Verification;
};

export type ResearchEntry = {
  slug: string;
  title: string;
  type: ResearchType;
  depth: ResearchDepth;
  themes: ThemeId[];
  period: string;
  location?: string;
  role: string;
  summary: string;
  question?: string;
  sample?: string;
  methods?: string[];
  findings: Finding[];
  limitations?: string[];
  implications?: string[];
  /** Plain-language status; never "published" without a publication record. */
  status: string;
  sources: SourceRef[];
  /** Related Journal post in DatoCMS, if any. */
  journalSlug?: string;
  featured?: boolean;
};

export type ExperienceEntry = {
  role: string;
  organisation: string;
  period: string;
  location: string;
  points: string[];
  verification: Verification;
};
