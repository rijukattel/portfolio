import type { Route } from 'next';

/** About page interface labels. The profile and bio come from DatoCMS. */
export const aboutLabels = {
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
    { label: 'Academic CV', href: '/cv' as Route },
    { label: 'Research', href: '/research' as Route },
    { label: 'Journal', href: '/blog' as Route },
    { label: 'Contact', href: '/contact' as Route },
  ],
};
