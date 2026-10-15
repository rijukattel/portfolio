import type { ResearchType } from '@/content/types';
import { datoQuery, once } from './client';

/*
 * Every visible interface label comes from the DatoCMS "Interface text"
 * singleton (docs/CONTENT-MODEL.md). These are its field names; the
 * wording lives only in DatoCMS.
 */
const LABEL_KEYS = [
  // Header and footer
  'skipLink',
  'menuButton',
  'closeButton',
  'footerExplore',
  'footerContact',
  'linkedinLabel',
  'facebookLabel',
  // Homepage
  'chapterLandscape',
  'chapterQuestions',
  'chapterField',
  'chapterEvidence',
  'chapterNext',
  'heroPrimary',
  'heroSecondary',
  'themesLegend',
  'allWorkOnTheme',
  'allFieldExperience',
  'methodsLabel',
  'sampleLabel',
  'moreOnResearch',
  'discussOpportunities',
  // Research
  'themeFilter',
  'allThemes',
  'typeFilter',
  'allTypes',
  'noMatches',
  'backToResearch',
  'sectionQuestion',
  'sectionContext',
  'sectionMethod',
  'sectionFindings',
  'sectionImplications',
  'sectionRecord',
  'limitationsLabel',
  'referencesLabel',
  'readJournalPost',
  'relatedWork',
  'caseStudyLabel',
  'briefRecordLabel',
  'recordType',
  'recordPeriod',
  'recordLocation',
  'recordRole',
  'recordSample',
  'recordStatus',
  'recordThemes',
  'recordSources',
  'cvSourceLabel',
  'journalSourceLabel',
  // Research types
  'typeThesis',
  'typeIndependentStudy',
  'typeStudy',
  'typeSurvey',
  'typeCollaboration',
  'typeFieldTrial',
  'typeSemesterProject',
  // Charts
  'figurePrefix',
  'keyFinding',
  'chartMeasure',
  'chartShare',
  // Journal
  'postsFilter',
  'allPostsFilter',
  'allJournalPosts',
  'newerLabel',
  'olderLabel',
  'partOfResearch',
  'byLabel',
  'writtenBy',
  'aboutAuthor',
  'minutesRead',
  // Fieldwork
  'fieldExperience',
  'trainingLabel',
  'outreachLabel',
  'photographsLabel',
  'openGallery',
  // About
  'aboutBiography',
  'aboutEducation',
  'aboutInterests',
  'aboutSkills',
  'aboutAwards',
  'aboutNext',
  'thesisLabel',
  'seeResearch',
  // CV
  'printCv',
  'cvEducation',
  'cvResearch',
  'cvWork',
  'cvLeadership',
  'cvSemester',
  'cvTraining',
  'cvPresentations',
  'cvOutreach',
  'cvAcademic',
  'cvCourses',
  'cvSkills',
  'cvAwards',
  'cvInterests',
  'thesisPrefix',
  // Contact form
  'contactDirect',
  'contactMessage',
  'formName',
  'formEmail',
  'formTopic',
  'formOptional',
  'formTopicPlaceholder',
  'formMessage',
  'formSend',
  'formHoneypot',
  // Thank-you and 404
  'thanksPrimary',
  'thanksSecondary',
  'notFoundHome',
  'notFoundMetaTitle',
] as const;

export type Labels = Record<(typeof LABEL_KEYS)[number], string>;

const labelsQuery = `query InterfaceText { interfaceText { ${LABEL_KEYS.join(' ')} } }`;

export const getLabels = once(async (): Promise<Labels> => {
  const { interfaceText } = await datoQuery<{ interfaceText: Labels | null }>(
    labelsQuery
  );
  if (!interfaceText) throw new Error('DatoCMS record missing: Interface text');
  return interfaceText;
});

const typeKeys: Record<ResearchType, keyof Labels> = {
  thesis: 'typeThesis',
  'independent-study': 'typeIndependentStudy',
  study: 'typeStudy',
  survey: 'typeSurvey',
  collaboration: 'typeCollaboration',
  'field-trial': 'typeFieldTrial',
  'semester-project': 'typeSemesterProject',
};

export const researchTypeLabel = (labels: Labels, type: ResearchType) =>
  labels[typeKeys[type]];

/** Research types in filter order. */
export const researchTypes = Object.keys(typeKeys) as ResearchType[];

/** The five homepage chapters; ids are anchors, names come from DatoCMS. */
export const homeChapters = (labels: Labels) => [
  { id: 'landscape', number: '01', title: labels.chapterLandscape },
  { id: 'questions', number: '02', title: labels.chapterQuestions },
  { id: 'field', number: '03', title: labels.chapterField },
  { id: 'evidence', number: '04', title: labels.chapterEvidence },
  { id: 'next-question', number: '05', title: labels.chapterNext },
];
