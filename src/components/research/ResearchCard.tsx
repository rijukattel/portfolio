import type { Route } from 'next';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { researchTypeLabels } from '@/content/research';
import type { ResearchEntry } from '@/content/types';
import styles from './ResearchCard.module.css';

type ResearchCardProps = {
  entry: ResearchEntry;
  themeTitles: Record<string, string>;
};

/**
 * One row of the research archive. The title shares a view-transition name
 * with the case-study heading, so it morphs into place on navigation
 * (PLAN §7.2 D); the link itself is an ordinary <a>.
 */
export function ResearchCard({ entry, themeTitles }: ResearchCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.kicker}>
        <span className={styles.type}>{researchTypeLabels[entry.type]}</span>
        {entry.period ? <span>{entry.period}</span> : null}
      </p>
      <div className={styles.main}>
        <ViewTransition
          name={`research-${entry.slug}`}
          share="morph"
          default="none"
        >
          <h2 className={styles.title}>
            <Link
              href={`/research/${entry.slug}` as Route}
              className={styles.link}
            >
              {entry.title}
            </Link>
          </h2>
        </ViewTransition>
        <p className={styles.summary}>{entry.summary}</p>
      </div>
      <div className={styles.aside}>
        <ul role="list" className={styles.themes}>
          {entry.themes.map((theme) => (
            <li key={theme}>{themeTitles[theme]}</li>
          ))}
        </ul>
        <p className={styles.depth}>
          {entry.depth === 'full' ? 'Case study' : 'Brief record'}
        </p>
      </div>
    </article>
  );
}
