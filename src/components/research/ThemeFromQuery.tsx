'use client';

import { useEffect } from 'react';

/**
 * Applies ?theme=<id> (used by the homepage theme map) to the archive's
 * CSS-only theme filter. Unknown values are ignored.
 */
export function ThemeFromQuery({ themeIds }: { themeIds: string[] }) {
  useEffect(() => {
    const theme = new URLSearchParams(window.location.search).get('theme');
    if (!theme || !themeIds.includes(theme)) return;
    const input = document.getElementById(`rt-theme-${theme}`);
    if (input instanceof HTMLInputElement) input.checked = true;
  }, [themeIds]);

  return null;
}
