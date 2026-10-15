import type { Route } from 'next';

export type NavItem = { label: string; href: Route };

/** Primary navigation (PLAN §4). CV and Contact are always reachable. */
export const primaryNav: NavItem[] = [
  { label: 'Research', href: '/research' },
  { label: 'Fieldwork', href: '/fieldwork' },
  { label: 'Journal', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'CV', href: '/cv' },
  { label: 'Contact', href: '/contact' },
];
