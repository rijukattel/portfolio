import type { ExperienceEntry } from './types';

/** Field and community experience, from Riju's CV (PLAN §5.4). */
export const experience: ExperienceEntry[] = [
  {
    role: 'Field facilitator intern',
    organisation: 'GeoKrishi Initiative',
    period: 'Jan – Apr 2024',
    location: 'Ratnanagar and Lamahi',
    points: [
      'Helped 100 farmers adopt the GeoKrishi platform with targeted technical guidance and hands-on support.',
      'Led training sessions in two municipalities, making sustainable farming technologies easier to use.',
      'Collected and analysed field data on how farmers use the technology.',
    ],
    verification: 'verified',
  },
  {
    role: 'Farm manager',
    organisation: 'RS-Agro Farm (family farm)',
    period: '2023 – present',
    location: 'Ratnanagar, Chitwan',
    points: [
      'Secured an irrigation subsidy of about US$7,460 covering 3.35 hectares of family and neighbouring land.',
      'Runs daily operations: labour, soil maintenance and sustainable crop production.',
      'Manages the supply chain from harvest to direct sales and negotiation with local vendors.',
    ],
    verification: 'verified',
  },
  {
    role: 'Coordinator',
    organisation: 'Lamahi Youth Network, Amnesty International Nepal',
    period: 'Jan 2024 – Feb 2025',
    location: 'Lamahi, Dang',
    points: [
      'Led a group of 40 youth volunteers.',
      'Organised and ran sessions on climate change and human rights for students in 12 schools.',
      'Handled planning, budget and reporting, working with municipal officials.',
    ],
    verification: 'verified',
  },
  {
    role: 'Participatory Rural Appraisal',
    organisation: 'Semester fieldwork',
    period: 'Jan 2024',
    location: 'Gabar Rural Municipality, Banke',
    points: [
      'A participatory rural appraisal (PRA) carried out as a semester project.',
    ],
    verification: 'verified',
  },
];
