import type { ResearchEntry } from './types';

/**
 * Research records (PLAN §5.2). Sources: Riju's CV and, where noted, the
 * Journal post that reports the work. Wording stays close to the source;
 * unconfirmed details are omitted or flagged, never filled in.
 */
export const research: ResearchEntry[] = [
  {
    slug: 'climate-perceptions-gauradaha',
    title:
      "Farmers' Perceptions of Climate Change and Local Adaptation Strategies in Gauradaha Municipality",
    type: 'independent-study',
    depth: 'brief',
    themes: ['climate-resilience', 'farmers-markets'],
    period: 'March–May 2025',
    location: 'Gauradaha Municipality, Nepal',
    role: 'Independent study',
    summary:
      'A household survey of how farmers perceive climate change and which adaptation strategies they take up.',
    sample: '100 households',
    findings: [
      {
        statement:
          '36% of households had no awareness of climate change, an education-driven knowledge gap.',
        verification: 'verified',
      },
      {
        statement:
          '89% reported rising pests and diseases, yet adaptation uptake was 54%: a gap between recognised risk and actual response.',
        verification: 'verified',
      },
    ],
    chart: {
      title: 'Recognised risk and adaptation, Gauradaha',
      caption:
        'Share of 100 surveyed households, Gauradaha Municipality, March–May 2025. Each bar is a separate survey measure. Source: Riju Kattel, independent study.',
      rows: [
        { label: 'No awareness of climate change', value: 36 },
        { label: 'Report rising pests and diseases', value: 89 },
        { label: 'Took up adaptation measures', value: 54, highlight: true },
      ],
    },
    status: 'Independent study',
    sources: [{ label: 'CV', kind: 'cv' }],
    featured: true,
  },
  {
    slug: 'unseasonal-rainfall-ratnanagar',
    title:
      'Responses to Unseasonal Rainfall among Smallholder Rice Farmers in Ratnanagar Municipality',
    type: 'study',
    depth: 'brief',
    themes: ['climate-resilience'],
    period: '2025',
    location: 'Ratnanagar Municipality, Chitwan, Nepal',
    summary:
      'How smallholder rice farmers responded to unseasonal rainfall, and what stood in the way.',
    findings: [
      {
        statement:
          'Labour scarcity was identified as the primary cause of crop losses during unseasonal rainfall (reported as 40%; the measure is being confirmed).',
        verification: 'verified',
      },
      {
        statement:
          'National early-warning policy was not matched by local implementation, leaving structural barriers to farmer resilience unaddressed.',
        verification: 'verified',
      },
    ],
    status: 'Study',
    sources: [{ label: 'CV', kind: 'cv' }],
    featured: true,
  },
  {
    slug: 'aromatic-rice-diversity',
    title:
      'Assessment of Diversity in Aromatic Rice Genotypes for Yield and Yield Attributes',
    type: 'thesis',
    depth: 'brief',
    themes: ['crop-diversity'],
    location:
      'Institute of Agriculture and Animal Science, Tribhuvan University',
    role: 'Thesis author',
    summary:
      'Diversity among aromatic rice genotypes, assessed on agro-morphological traits linked to yield.',
    methods: [
      'Agro-morphological characterisation of the genotypes',
      'Principal component analysis (communalities)',
      'Cluster analysis of genetic distance between clusters',
    ],
    findings: [],
    status: 'B.Sc. thesis',
    sources: [{ label: 'CV', kind: 'cv' }],
    featured: true,
  },
  {
    slug: 'jujube-consumer-preferences',
    title: 'Consumer Preferences and Awareness of Indian Jujube (Baer)',
    type: 'survey',
    depth: 'full',
    themes: ['farmers-markets'],
    period: '5 January 2025',
    location: 'Nepal (online)',
    role: 'Conducted the survey',
    summary:
      'How young consumers see Baer, an indigenous fruit, as imported exotic fruits become easier to buy.',
    // Question as framed in the Journal post.
    question:
      'How do young consumers view Baer as imported exotic fruits become more available?',
    sample: '35 respondents aged 21–25, online questionnaire',
    context: [
      'Baer (Indian jujube) is an indigenous fruit with cultural and nutritional value in Nepal; six species have been reported from the country (Bhattarai & Pathak, 2015).',
      'The survey set out to see how young consumers view the fruit as imported exotic fruits become easier to buy.',
    ],
    methods: [
      'Online questionnaire, 5 January 2025',
      'Questions on how often respondents eat Baer, what they like and dislike about it, interest in processed products (jams, juices, candies), awareness of its nutritional benefits, and perceived market trends',
    ],
    findings: [
      {
        statement:
          'Every respondent knew Baer, but 43% eat it less often than before.',
        verification: 'verified',
      },
      {
        statement:
          'Only 30% were aware of its nutritional benefits, and 60% preferred exotic fruits.',
        verification: 'verified',
      },
      {
        statement: '80% believe demand for Baer has declined over the years.',
        verification: 'verified',
      },
    ],
    chart: {
      title: 'How young consumers see Baer',
      caption:
        'Online questionnaire, 5 January 2025; n = 35 respondents aged 21–25. Percentages as reported in the study.',
      rows: [
        { label: 'Familiar with Baer', value: 100 },
        { label: 'See demand declining', value: 80 },
        { label: 'Prefer exotic fruits', value: 60 },
        { label: 'Eat it less than before', value: 43 },
        { label: 'Interested in Baer products', value: 40 },
        {
          label: 'Aware of its nutritional benefits',
          value: 30,
          highlight: true,
        },
      ],
    },
    limitations: [
      'A small online sample of young adults; it does not represent all consumers.',
    ],
    implications: [
      'Nutritional education: tell consumers about Baer’s vitamin C, antioxidants and local production, since only 30% are aware of its benefits.',
      'Product innovation: juices, dried snacks, jams and wellness products for the 40% interested in processed Baer.',
      'Modern marketing: social media and cultural storytelling to reach young consumers.',
      'Quality standards: grading and better post-harvest handling for consistent fruit.',
    ],
    references: ['Bhattarai & Pathak (2015)'],
    status: 'Independent survey',
    sources: [
      { label: 'CV', kind: 'cv' },
      { label: 'Journal: A Survey On Jujube', kind: 'journal' },
    ],
    journalSlug: 'a-survey-on-jujube',
    featured: true,
  },
  {
    slug: 'hybrid-rice-ga3',
    title:
      'Evaluation of Staggered Transplanting and Level of GA3 on Hybrid Rice Seed Production in Deukhuri, Dang',
    type: 'collaboration',
    depth: 'brief',
    themes: ['crop-diversity'],
    location: 'Deukhuri, Dang, Nepal',
    role: 'Collected and maintained data; assisted with editing and preparation for publication',
    summary:
      'How staggered transplanting and gibberellic acid (GA3) levels affect hybrid rice seed production.',
    findings: [],
    status: 'Collaboration, being prepared for publication',
    sources: [{ label: 'CV', kind: 'cv' }],
  },
  {
    slug: 'mustard-oil-hive-barrier',
    title: 'Mustard-Oil Barriers Against Ant Infestation in Beehives',
    type: 'field-trial',
    depth: 'full',
    themes: ['pesticides-pollinators'],
    location: 'Ratnanagar, Bagmati Province, Nepal',
    summary:
      'Whether a mustard-oil barrier can keep ants out of honey bee hives without chemical ant chalk.',
    // Question as framed in the Journal post.
    question:
      'Can vegetable oil serve as a non-toxic physical barrier against ants?',
    sample:
      '20 Apis mellifera hives, 5 of them infested (3 moderately, 2 heavily)',
    context: [
      'Ants are among the most common predators of honey bee colonies; they attack hives in mass, taking adult bees, brood and honey (Sanford, 1987; Sarwar, 2016).',
      'Beekeepers often respond with “ant chalk” containing deltamethrin and cypermethrin, synthetic pyrethroids that are toxic to non-target insects, including bees.',
      'In a local apiary, 5 of 20 hives were infested, and the beekeeper reported recurring ant problems despite using ant chalk.',
    ],
    methods: [
      'Newton-type hives on metal-rod stands',
      'Ants removed by hand from infested hives before treatment',
      'Bowls of mustard oil placed under each leg of the hive stands',
      'Daily observation for seven days: ants present or absent on the stands and inside the hives, and how many',
    ],
    findings: [
      {
        statement:
          'No ants returned to the three moderately infested hives during the seven days.',
        verification: 'verified',
      },
      {
        statement:
          'In the two heavily infested hives, a few ants remained inside but no new ants reached them; these were removed by hand.',
        verification: 'verified',
      },
    ],
    limitations: [
      'Heavy infestations need manual cleaning before the barrier works fully.',
      'Oil must be refilled and cleaned to stay effective.',
      'It does not address flying ants.',
      'Rain and wind can change the oil level.',
    ],
    implications: [
      'Suited to small-scale and resource-limited beekeepers: mustard oil is cheap, easy to find and familiar in Nepal, and needs no special equipment.',
      'Avoids exposing bees and hive products to pyrethroid ant chalk.',
    ],
    references: [
      'Sanford (1987)',
      'Sarwar (2016)',
      'Hebbar, Hebbar & Patwardhan (2015)',
    ],
    status: 'Field trial, reported in the Journal',
    sources: [
      { label: 'Journal: Ant Infestation in Beehives', kind: 'journal' },
    ],
    journalSlug: 'ant-infestation-in-beehives',
  },
  {
    slug: 'wheat-weed-management-economics',
    title:
      'Economics of Wheat Cultivation Under Different Weed Management Practices',
    type: 'semester-project',
    depth: 'brief',
    themes: ['crop-diversity'],
    period: 'Nov 2022 – Mar 2023',
    location: 'Dang, Nepal',
    summary:
      'The costs and returns of growing wheat under different weed management practices.',
    findings: [],
    status: 'Semester project',
    sources: [{ label: 'CV', kind: 'cv' }],
  },
  {
    slug: 'african-marigold-cultivation',
    title: 'Cultivation of African Marigold',
    type: 'semester-project',
    depth: 'brief',
    themes: ['crop-diversity'],
    period: 'Jul – Sep 2023',
    summary: 'Growing African marigold over a season, July to September 2023.',
    findings: [],
    status: 'Semester project',
    sources: [{ label: 'CV', kind: 'cv' }],
  },
  {
    slug: 'greenhouse-lettuce',
    title: 'High-Yield and Quality Production of Lettuce in a Greenhouse',
    type: 'semester-project',
    depth: 'brief',
    themes: ['crop-diversity'],
    period: 'Apr 2023',
    summary:
      'Producing high-yield, good-quality lettuce under greenhouse conditions.',
    findings: [],
    status: 'Semester project',
    sources: [{ label: 'CV', kind: 'cv' }],
  },
  {
    slug: 'oyster-mushroom-cultivation',
    title: 'Cultivation Practices of Oyster Mushroom',
    type: 'semester-project',
    depth: 'brief',
    themes: ['crop-diversity'],
    period: 'Feb – May 2024',
    location: 'IAAS, Prithu Technical College farm',
    summary:
      'Oyster mushroom cultivation practices on the IAAS Prithu Technical College farm.',
    findings: [],
    status: 'Semester project',
    sources: [{ label: 'CV', kind: 'cv' }],
  },
  {
    slug: 'participatory-rural-appraisal-gabar',
    title: 'Participatory Rural Appraisal in Gabar Rural Municipality',
    type: 'semester-project',
    depth: 'brief',
    themes: ['farmers-markets'],
    period: 'January 2024',
    location: 'Gabar Rural Municipality, Banke, Nepal',
    summary:
      'A participatory rural appraisal (PRA) in Gabar Rural Municipality, Banke.',
    findings: [],
    status: 'Semester project',
    sources: [{ label: 'CV', kind: 'cv' }],
  },
];

export const featuredResearch = research.filter((entry) => entry.featured);

export const researchTypeLabels: Record<ResearchEntry['type'], string> = {
  thesis: 'B.Sc. thesis',
  'independent-study': 'Independent study',
  study: 'Study',
  survey: 'Survey',
  collaboration: 'Collaboration',
  'field-trial': 'Field trial',
  'semester-project': 'Semester project',
};

export function getResearch(slug: string) {
  return research.find((entry) => entry.slug === slug) ?? null;
}

/** The research record a Journal post reports on, if any. */
export function researchForJournalPost(postSlug: string) {
  return research.find((entry) => entry.journalSlug === postSlug) ?? null;
}

/** Other work sharing a theme, closest overlap first. */
export function relatedResearch(entry: ResearchEntry, limit = 3) {
  return research
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

/** Code-owned copy for the research archive and case-study pages. */
export const researchCopy = {
  label: 'Research',
  title: 'Research',
  lede: 'Studies, field trials and academic projects on climate adaptation, crop diversity, pesticides and pollinators, and how farmers respond to change.',
  description:
    "Research by Riju Kattel: a B.Sc. thesis on aromatic rice, surveys of farmers' climate perceptions and jujube consumers, a beehive field trial, and semester projects in Nepal.",
  listLabel: 'Research archive',
  themeLegend: 'Theme',
  allThemesLabel: 'All themes',
  typeLegend: 'Type',
  allTypesLabel: 'All types',
  empty: 'No work matches both filters. Choose another theme or type.',
  backLabel: 'Research',
  briefNotice:
    'A brief record based on Riju’s CV. Methods and full results will be added when the study documents are available.',
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
