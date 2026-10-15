/** Code-owned copy for the Journal (blog). Posts themselves come from DatoCMS. */
export const journalCopy = {
  label: 'Journal',
  title: 'Journal',
  lede: 'Notes from the family orchard, the field and the classroom: pests and pollinators, indigenous fruit, and what farming teaches.',
  description:
    'Field notes and short essays by Riju Kattel on orchard pests, beekeeping, indigenous fruit and smallholder farming in Nepal.',
  filterLegend: 'Show posts about',
  allLabel: 'All',
  backLabel: 'All Journal posts',
  newerLabel: 'Newer',
  olderLabel: 'Older',
  feedTitle: 'Riju Kattel — Journal',
};

/** Display labels for the DatoCMS `category` values. */
const categoryLabels: Record<string, string> = {
  educational: 'Educational',
  lifestyle: 'Lifestyle',
  literature: 'Literature',
};

export function categoryLabel(category: string | null): string | null {
  if (!category?.trim()) return null;
  const key = category.trim().toLowerCase();
  return categoryLabels[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}
