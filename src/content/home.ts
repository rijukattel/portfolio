import type { Route } from 'next';

/*
 * Homepage interface labels. Chapter copy, themes, photos and research come
 * from DatoCMS (lib/datocms/content.ts).
 */

export const homeChapters = [
  { id: 'landscape', number: '01', title: 'The Landscape' },
  { id: 'questions', number: '02', title: 'The Questions' },
  { id: 'field', number: '03', title: 'The Field' },
  { id: 'evidence', number: '04', title: 'The Evidence' },
  { id: 'next-question', number: '05', title: 'The Next Question' },
];

export const homeLabels = {
  primary: { label: 'Explore research', href: '/research' as Route },
  secondary: { label: 'View academic CV', href: '/cv' as Route },
  questionsLegend: 'Research themes',
  allWorkLabel: 'All work on this theme',
  fieldMoreLabel: 'All field experience',
  methodsLabel: 'Methods',
  sampleLabel: 'Sample',
  studyLinkLabel: 'More on the research',
  journalLinkLabel: 'All Journal posts',
  contact: {
    label: 'Discuss research opportunities',
    href: '/contact' as Route,
  },
};
