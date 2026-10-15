/**
 * Web CV content, transcribed from Riju's CV (CV_RK.pdf, read 15 Oct 2026).
 * The phone number and street address are deliberately left out (PLAN §12).
 * Research, experience and the profile live in their own modules.
 */

export type CvItem = {
  title: string;
  detail?: string;
  period?: string;
  points?: string[];
};

export const cvCopy = {
  title: 'Academic CV',
  label: 'Curriculum vitae',
  lede: 'Education, research, field experience, training, presentations and awards.',
  description:
    'Academic CV of Riju Kattel: B.Sc. Agriculture (Tribhuvan University), research experience, fieldwork, training, presentations and awards.',
  printLabel: 'Print or save as PDF',
  updated: 'Based on the CV of October 2026.',
};

export const education = {
  degree: 'Bachelor of Science in Agriculture',
  institution:
    'Institute of Agriculture and Animal Science, Tribhuvan University',
  place: 'Dang, Nepal',
  period: '2020 – 2024',
  details: ['Aggregate percentage: 76.17%', 'Course duration: eight semesters'],
  thesis: {
    title:
      'Assessment of Diversity in Aromatic Rice Genotypes for Yield and Yield Attributes',
    slug: 'aromatic-rice-diversity',
    techniques: [
      'Studied diversity among aromatic rice genotypes based on agro-morphological traits',
      'Analysed communality values using principal component analysis',
      'Analysed genetic distance between clusters using cluster analysis',
    ],
  },
};

export const training: CvItem[] = [
  {
    title: 'Application of GIS and Remote Sensing in Agriculture',
    period: '14 – 16 May 2020',
    points: [
      'Learned the fundamentals of GIS and spatial analysis to map field boundaries and soil data.',
      'Studied how digital tools and apps can improve crop accuracy and resource efficiency.',
      'Gained hands-on experience with beginner-level GIS software for collecting field data.',
    ],
  },
  {
    title: 'College-Level Integrated Pest Management Programme: Cauliflower',
    period: '5 Sep – 20 Nov 2022',
    points: [
      'Applied biological, cultural and mechanical methods to reduce chemical pesticide use.',
      'Identified cauliflower diseases and prescribed non-chemical treatments.',
      'Implemented IPM protocols to manage pests while preserving soil health and beneficial insects.',
    ],
  },
  {
    title: 'Training on Soil Laboratory Analysis',
    period: '5 – 11 Dec 2022',
    points: [
      'Tested soil physical properties (moisture, texture) and chemical properties (pH).',
      'Analysed soil fertility results to identify specific nutrient deficiencies.',
      'Translated laboratory data into practical fertiliser and soil-management advice for farmers.',
    ],
  },
  {
    title: 'Personality Development and Anchoring Training',
    period: '8 – 24 Jun 2018',
    points: [
      'Public speaking and anchoring for formal event moderation.',
      'Leadership, adaptability and team coordination.',
      'Communicating technical information clearly to the public.',
    ],
  },
];

export const presentations: { group: string; items: CvItem[] }[] = [
  {
    group: 'Outreach and awareness',
    items: [
      {
        title: 'Human Rights Education',
        detail: 'For students at schools in Lamahi, Dang',
        period: '2024',
      },
      {
        title: 'Climate Change Awareness',
        detail: 'For school students in Lamahi, Dang',
        period: '2024',
      },
    ],
  },
  {
    group: 'Academic',
    items: [
      {
        title:
          'Pesticide Wastage and its Impact on Water Quality in Lamahi, Dang',
        period: '8 Jun 2023',
      },
      {
        title:
          'Effect of Weed Management Using Different Weed Control Methods on Wheat Production',
        detail: 'Group presentation',
        period: '3 Jul 2023',
      },
      {
        title: 'Participatory Monitoring and Evaluation',
        period: '15 Feb 2023',
      },
    ],
  },
];

export const courses: CvItem[] = [
  {
    title:
      'Building Climate Resilience through Ecosystem-based Adaptation Planning',
    detail: 'UN CC:Learn',
  },
  {
    title: 'Understanding the Problem of Modern Slavery',
    detail: 'Alison',
  },
];

export const skills: CvItem[] = [
  { title: 'Statistical analysis', detail: 'R Studio, Minitab' },
  { title: 'Office software', detail: 'Microsoft Office' },
  { title: 'Communication, leadership and teamwork' },
];

export const languages: CvItem[] = [
  { title: 'English', detail: 'IELTS 7.5 (overall band score)' },
];

export const awards: CvItem[] = [
  {
    title: 'Essay Writing Competition: winner',
    detail:
      '“Climate Smart Agriculture: Policies, Status and Prospect for Resilience of Nepal”, organised by The Eco-Minions, Nepal',
    period: '2022',
  },
  {
    title: 'Article Writing Competition: winner',
    detail:
      'Literacy category (“Trails of Life” theme), organised by SOMES, Nepal',
    period: '2023',
  },
  {
    title: 'Essay competition: third position',
    detail: 'Organised by Valmiki Shiksha Sadan',
    period: '14 Dec 2017',
  },
  {
    title: 'STEM Blog Writing Competition: honourable mention',
    detail: 'Organised by My Geeky Planet',
    period: '2021',
  },
];
