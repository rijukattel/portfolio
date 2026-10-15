import type { ResearchEntry } from './types';

/*
 * Interface labels for the research archive and case-study pages. The
 * research itself, and each page's title and intro, come from DatoCMS
 * (lib/datocms/content.ts).
 */

export const researchTypeLabels: Record<ResearchEntry['type'], string> = {
  thesis: 'B.Sc. thesis',
  'independent-study': 'Independent study',
  study: 'Study',
  survey: 'Survey',
  collaboration: 'Collaboration',
  'field-trial': 'Field trial',
  'semester-project': 'Semester project',
};

export const researchLabels = {
  listLabel: 'Research archive',
  themeLegend: 'Theme',
  allThemesLabel: 'All themes',
  typeLegend: 'Type',
  allTypesLabel: 'All types',
  empty: 'No work matches both filters. Choose another theme or type.',
  backLabel: 'Research',
  sections: {
    question: 'The question',
    context: 'The context',
    method: 'The method',
    findings: 'The findings',
    implications: 'The implications',
    record: 'Research record',
  },
  limitationsLabel: 'Limitations',
  referencesLabel: 'Cited in the source',
  journalLabel: 'Read the Journal post',
  relatedLabel: 'Related work',
};
