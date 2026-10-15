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
