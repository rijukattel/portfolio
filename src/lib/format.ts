// Dates are stored with Nepal's offset; format in that zone so the printed
// day never depends on the build machine.
const longDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kathmandu',
});

/** "27 September 2025" */
export function formatDate(iso: string): string {
  return longDate.format(new Date(iso));
}

/** A DatoCMS post category ("educational") as shown ("Educational"). */
export function categoryLabel(category: string | null): string | null {
  const value = category?.trim().toLowerCase();
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : null;
}
