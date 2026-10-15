import { Manrope, Newsreader } from 'next/font/google';

/** Display serif for headlines, chapter titles and pull quotes. */
export const displayFont = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-display',
});

/** Body and UI sans: text, navigation, captions, data labels. */
export const bodyFont = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: false,
});
