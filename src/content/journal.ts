/**
 * Journal interface labels. Posts come from DatoCMS, and so does the
 * Journal page's own title and intro (Site page "journal").
 */
export const journalLabels = {
  filterLegend: 'Show posts about',
  allLabel: 'All',
  backLabel: 'All Journal posts',
  newerLabel: 'Newer',
  olderLabel: 'Older',
  researchLabel: 'Part of the research',
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
