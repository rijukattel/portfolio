import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Contours } from '@/components/media/Contours';
import { homeCopy, themes } from '@/content/home';
import styles from './ThemeMap.module.css';

const copy = homeCopy.questions;
const pad = (n: number) => String(n).padStart(2, '0');

/*
 * Selection is a native radio group switched with CSS :has(), so it works
 * with the keyboard (arrow keys) and without JavaScript. Where :has() isn't
 * supported, every theme's panel is simply shown.
 */
const selectionRules = themes
  .map(
    ({ id }) =>
      `[data-theme-map]:has(#theme-${id}:checked) [data-panel="${id}"]{display:block}` +
      `[data-theme-map]:has(#theme-${id}:checked) [data-marker="${id}"] [data-dot]{background:var(--earth);transform:scale(1.8)}` +
      `[data-theme-map]:has(#theme-${id}:checked) [data-marker="${id}"] [data-marker-label]{color:var(--forest)}`
  )
  .join('');

/** Chapter 02: research themes as points on a contour map (PLAN §8). */
export function ThemeMap() {
  return (
    <section id="questions" className={`section ${styles.chapter}`}>
      <div className={`container ${styles.grid}`} data-theme-map="">
        <div className={styles.intro}>
          <ChapterHeading
            number="02"
            label="The Questions"
            title={copy.title}
          />
          <p className="lede">{copy.intro}</p>
          <fieldset className={styles.themes}>
            <legend className="visually-hidden">{copy.legend}</legend>
            {themes.map((theme, i) => (
              <div key={theme.id} className={styles.option}>
                <input
                  type="radio"
                  name="research-theme"
                  id={`theme-${theme.id}`}
                  value={theme.id}
                  defaultChecked={i === 0}
                  className={styles.radio}
                />
                <label htmlFor={`theme-${theme.id}`} className={styles.label}>
                  <span className={styles.number}>{pad(i + 1)}</span>
                  {theme.title}
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className={styles.detail}>
          <div className={styles.map} aria-hidden="true">
            <Contours field="landscape" draw className={styles.mapLines} />
            {themes.map((theme, i) => (
              <span
                key={theme.id}
                className={styles.marker}
                data-marker={theme.id}
                style={
                  {
                    '--x': `${theme.position.x}%`,
                    '--y': `${theme.position.y}%`,
                  } as CSSProperties
                }
              >
                <span className={styles.dot} data-dot="" />
                <span className={styles.markerLabel} data-marker-label="">
                  {pad(i + 1)}
                </span>
              </span>
            ))}
          </div>

          {themes.map((theme) => (
            <div key={theme.id} className={styles.panel} data-panel={theme.id}>
              <h3 className={styles.panelTitle}>{theme.title}</h3>
              <p className={styles.panelSummary}>{theme.summary}</p>
              <ul role="list" className={styles.links}>
                {theme.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.link}>
                      <span className={styles.linkLabel}>{link.label}</span>
                      <span className={styles.linkDetail}>{link.detail}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`@supports selector(:has(*)){[data-theme-map] [data-panel]{display:none}${selectionRules}}`}</style>
    </section>
  );
}
