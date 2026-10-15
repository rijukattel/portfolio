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
  | 'study'
  | 'survey'
  | 'collaboration'
  | 'field-trial'
  | 'semester-project';

/** Values exactly as reported in the source, never recomputed or rounded. */
export type ChartData = {
  title: string;
  /** Units, sample and source, shown under the chart. */
  caption: string;
  rows: { label: string; value: number; highlight?: boolean }[];
};

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
  period?: string;
  location?: string;
  /** Riju's part in the work; omitted where the CV doesn't say. */
  role?: string;
  summary: string;
  question?: string;
  /** Background paragraphs, from a source document only. */
  context?: string[];
  sample?: string;
  methods?: string[];
  findings: Finding[];
  chart?: ChartData;
  limitations?: string[];
  implications?: string[];
  /** Works cited by the source, as cited there (author, year). */
  references?: string[];
  /** Plain-language status; never "published" without a publication record. */
  status: string;
  sources: SourceRef[];
  /** Related Journal post in DatoCMS, if any. */
  journalSlug?: string;
  featured?: boolean;
};

export type ExperienceEntry = {
  /** CV section it belongs to. */
  category: 'work' | 'leadership' | 'academic';
  role: string;
  organisation: string;
  period: string;
  location: string;
  points: string[];
  verification: Verification;
};
