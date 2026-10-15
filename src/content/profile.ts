/**
 * Identity copy used across the site. Source: Riju's CV (PLAN §5.1).
 * Never add the phone number or street address (PLAN §12).
 */
export const profile = {
  name: 'Riju Kattel',
  location: 'Ratnanagar, Chitwan, Nepal',
  statement:
    'Agricultural science graduate building research on pollinators, pesticide governance, and how farmers perceive and respond to agricultural change.',
  education: {
    degree: 'B.Sc. Agriculture',
    institution: 'Institute of Agriculture and Animal Science',
    university: 'Tribhuvan University',
    years: '2020–2024',
  },
  researchInterests: [
    'Climate change',
    'Community resilience and equity',
    'Participatory research',
    'Pesticide governance and risk',
    'Pollinators',
    'Environmental justice',
    'Soil health',
    'Soil fertility',
  ],
} as const;

/** About page copy, in Riju's voice. Source: CV "About me" and the Journal. */
export const aboutCopy = {
  label: 'About',
  title: 'About Riju',
  lede: 'Agricultural science graduate, Tribhuvan University, 2024.',
  bio: [
    'I am a graduate of Agricultural Science with practical experience engaging with farmers and taking part in field research. I am skilled in communication, leadership and teamwork.',
    'I am motivated to build research skills on pollinators, pesticide governance, and farmers’ perceptions of agricultural change.',
    'I also manage our family farm in Ratnanagar, and write in the Journal about what farming teaches, from guava fruit flies to the starfruit saplings my grandmother brought from Assam.',
    'Beyond agriculture, I enjoy reading and admiring the arts.',
  ],
  sections: {
    bio: 'Biography',
    education: 'Education',
    interests: 'Research interests',
    skills: 'Skills and languages',
    awards: 'Awards',
    next: 'Next',
  },
  thesisLabel: 'Thesis',
  interestsLink: 'See the research',
  links: [
    { label: 'Academic CV', href: '/cv' },
    { label: 'Research', href: '/research' },
    { label: 'Journal', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;
