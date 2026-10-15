import type { Route } from 'next';
import type { ThemeId } from './types';

/*
 * Homepage copy (PLAN §8). Every factual line traces to Riju's CV or a
 * Journal post; photo captions describe only what is visible.
 */

/** DatoCMS upload IDs of the photos used on the homepage. */
export const homeImages = {
  hero: 'cN4F8iweQjKdbGNUvbFvyw',
  farmersDay: 'cFNVw_ghTEyDyppcXQo1Zg',
  school: 'R5t46ei_Sweaa6M65ttMoA',
  harvest: 'a5tFZTMaSoaic_mpir6Sqg',
} as const;

export const homeChapters = [
  { id: 'landscape', number: '01', title: 'The Landscape' },
  { id: 'questions', number: '02', title: 'The Questions' },
  { id: 'field', number: '03', title: 'The Field' },
  { id: 'evidence', number: '04', title: 'The Evidence' },
  { id: 'next-question', number: '05', title: 'The Next Question' },
];

export const homeCopy = {
  meta: {
    title: 'Riju Kattel · Agricultural research portfolio',
    description:
      'Riju Kattel is an agricultural science graduate (Tribhuvan University) researching climate adaptation, pesticides and pollinators, and how farmers in Nepal respond to agricultural change.',
  },
  landscape: {
    title:
      'Understanding agriculture. Investigating change. Supporting resilient communities.',
    lede: 'Agricultural science graduate from Tribhuvan University, with hands-on experience working with farmers and in field research in Nepal. Research interests: climate adaptation, pollinators and pesticide governance, and how farmers respond to change.',
    imageAlt: 'Cattle grazing on a bare field below a line of trees',
    primary: { label: 'Explore research', href: '/research' as Route },
    secondary: { label: 'View academic CV', href: '/cv' as Route },
  },
  questions: {
    title: 'Questions rooted in the land.',
    intro:
      'Five threads run through the studies, training and fieldwork. Choose one to see the work behind it.',
    legend: 'Research themes',
  },
  field: {
    title: 'Research that begins with farmers.',
    intro:
      'Alongside the studies: training farmers on new tools, running the family farm, and organising young volunteers.',
    photos: [
      {
        key: 'farmersDay' as const,
        alt: 'People seated outdoors for a farmers’ day gathering',
        caption: 'A farmers’ day gathering',
      },
      {
        key: 'school' as const,
        alt: 'Students in white uniforms seated in a school hall during a session',
        caption: 'A session in a school hall',
      },
      {
        key: 'harvest' as const,
        alt: 'A farmer bending to harvest pineapples among the plants',
        caption: 'Pineapple harvest',
      },
    ],
  },
  evidence: {
    title: 'What the studies found.',
    intro:
      'Four studies, from a B.Sc. thesis on aromatic rice to a 100-household survey of climate adaptation. Only reported findings appear here.',
    methodsLabel: 'Methods',
    sampleLabel: 'Sample',
    linkLabel: 'More on the research',
  },
  journal: {
    title: 'From the Journal',
    linkLabel: 'All Journal posts',
  },
  next: {
    title: 'Where the research goes next.',
    intro:
      'The next step is to build research skills in three directions that grow out of this work, through graduate study or research collaboration.',
    directions: [
      {
        title: 'Pollinators and pesticide governance',
        text: 'How pesticide rules, and the way they are applied on farms, affect pollinators and the people who depend on them.',
      },
      {
        title: 'Farmers’ perceptions of agricultural change',
        text: 'Why recognising a risk does not always lead to adapting to it, a gap seen in the Gauradaha survey.',
      },
      {
        title: 'Community resilience and participatory research',
        text: 'Research shaped with farming communities, building on participatory appraisal and outreach in schools.',
      },
    ],
    primary: {
      label: 'Discuss research opportunities',
      href: '/contact' as Route,
    },
    secondary: { label: 'View academic CV', href: '/cv' as Route },
  },
};

export type ThemeLink = { label: string; detail: string; href: Route };

export type Theme = {
  id: ThemeId;
  title: string;
  summary: string;
  /** Marker position on the Chapter 02 contour map, in percent. */
  position: { x: number; y: number };
  links: ThemeLink[];
};

export const themes: Theme[] = [
  {
    id: 'climate-resilience',
    title: 'Climate change and community resilience',
    summary:
      'How smallholder farmers perceive climate change, and what helps or holds back adaptation.',
    position: { x: 24, y: 32 },
    links: [
      {
        label: 'Farmers’ perceptions of climate change, Gauradaha',
        detail: 'Independent study · 2025',
        href: '/research',
      },
      {
        label: 'Responses to unseasonal rainfall, Ratnanagar',
        detail: 'Study · 2025',
        href: '/research',
      },
      {
        label: 'Climate change sessions in 12 schools',
        detail: 'Lamahi Youth Network · 2024',
        href: '/fieldwork',
      },
      {
        label: 'Ecosystem-based adaptation planning for climate resilience',
        detail: 'Course · UN CC:Learn',
        href: '/cv',
      },
      {
        label:
          'Climate Smart Agriculture: Policies, Status and Prospect for Resilience of Nepal',
        detail: 'Essay competition winner · 2022',
        href: '/cv',
      },
    ],
  },
  {
    id: 'pesticides-pollinators',
    title: 'Pesticides, pollinators and environmental justice',
    summary:
      'Safer pest control, the health of pollinators, and who carries the risks of pesticide use.',
    position: { x: 70, y: 22 },
    links: [
      {
        label: 'A mustard-oil barrier against ants in beehives',
        detail: 'Field trial · Journal',
        href: '/blog/ant-infestation-in-beehives' as Route,
      },
      {
        label: 'Guava fruit flies and a lost harvest',
        detail: 'Journal',
        href: '/blog/tiny-fruit-flies-a-big-farming-lesson' as Route,
      },
      {
        label: 'Integrated pest management programme for cauliflower',
        detail: 'Training · 2022',
        href: '/cv',
      },
      {
        label: 'Pesticide wastage and its impact on water quality in Lamahi',
        detail: 'Academic presentation · 2023',
        href: '/cv',
      },
    ],
  },
  {
    id: 'soil-health',
    title: 'Soil health and fertility',
    summary: 'Soil as the base of productive, sustainable farms.',
    position: { x: 42, y: 66 },
    links: [
      {
        label: 'Soil laboratory analysis',
        detail: 'Training · 2022',
        href: '/cv',
      },
      {
        label: 'Soil maintenance on the family farm',
        detail: 'RS-Agro Farm · 2023 – present',
        href: '/fieldwork',
      },
      {
        label: 'GIS and remote sensing in agriculture',
        detail: 'Training · 2020',
        href: '/cv',
      },
    ],
  },
  {
    id: 'crop-diversity',
    title: 'Crop diversity and production systems',
    summary: 'The genetic diversity and management choices that shape yield.',
    position: { x: 80, y: 62 },
    links: [
      {
        label: 'Diversity in aromatic rice genotypes',
        detail: 'B.Sc. thesis',
        href: '/research',
      },
      {
        label: 'Staggered transplanting and GA3 in hybrid rice seed production',
        detail: 'Collaboration',
        href: '/research',
      },
      {
        label: 'Economics of wheat under different weed management',
        detail: 'Semester project · 2022–23',
        href: '/research',
      },
    ],
  },
  {
    id: 'farmers-markets',
    title: 'Farmers, markets and participation',
    summary:
      'How farmers take up technology, reach markets and take part in research.',
    position: { x: 56, y: 42 },
    links: [
      {
        label: 'Consumer preferences for jujube (Baer)',
        detail: 'Survey · 2025',
        href: '/research',
      },
      {
        label: 'GeoKrishi platform adoption with 100 farmers',
        detail: 'Field facilitation · 2024',
        href: '/fieldwork',
      },
      {
        label: 'Participatory Rural Appraisal, Gabar',
        detail: 'Semester fieldwork · 2024',
        href: '/fieldwork',
      },
      {
        label: 'From harvest to market on the family farm',
        detail: 'RS-Agro Farm',
        href: '/fieldwork',
      },
    ],
  },
];
