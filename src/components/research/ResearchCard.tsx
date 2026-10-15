import type { Route } from 'next';
import Link from 'next/link';
import { ViewTransition } from 'react';
import type { ResearchEntry } from '@/content/types';
import { getLabels, researchTypeLabel } from '@/lib/datocms/labels';
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
export async function ResearchCard({ entry, themeTitles }: ResearchCardProps) {
  const labels = await getLabels();
  return (
    <article className={styles.card}>
      <p className={styles.kicker}>
        <span className={styles.type}>
          {researchTypeLabel(labels, entry.type)}
        </span>
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
          {entry.depth === 'full'
            ? labels.caseStudyLabel
            : labels.briefRecordLabel}
        </p>
      </div>
    </article>
  );
}
