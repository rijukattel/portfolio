import type { Route } from 'next';
import { ViewTransition } from 'react';
import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Reveal } from '@/components/motion/Reveal';
import { BarChart } from '@/components/research/BarChart';
import { ActionLink } from '@/components/ui/ActionLink';
import { homeLabels } from '@/content/home';
import { researchTypeLabels } from '@/content/research';
import type { ResearchEntry } from '@/content/types';
import styles from './EvidenceChapter.module.css';

/**
 * Chapter 04: the featured studies with their reported findings, and a chart
 * wherever the source gives numbers (PLAN §7.2 C). Nothing is extrapolated.
 */
type EvidenceChapterProps = {
  title: string;
  intro?: string;
  studies: ResearchEntry[];
};

export function EvidenceChapter({
  title,
  intro,
  studies,
}: EvidenceChapterProps) {
  // Figures are numbered in reading order across the chapter.
  const numbered = studies.map((study, i, all) => ({
    study,
    figureNumber: study.chart
      ? all.slice(0, i + 1).filter((entry) => entry.chart).length
      : null,
  }));

  return (
    <section id="evidence" className={`section ${styles.chapter}`}>
      <div className="container">
        <div className={styles.head}>
          <ChapterHeading number="04" label="The Evidence" title={title} />
          {intro ? <p className="lede">{intro}</p> : null}
        </div>

        <ol role="list" className={styles.studies}>
          {numbered.map(({ study, figureNumber }) => (
            <li
              key={study.slug}
              className={
                study.chart
                  ? `${styles.study} ${styles.withChart}`
                  : styles.study
              }
            >
              <Reveal as="article" className={styles.text}>
                <p className={styles.kicker}>
                  {[
                    researchTypeLabels[study.type],
                    study.period,
                    study.location,
                  ]
                    .filter(Boolean)
                    .map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                </p>
                <ViewTransition
                  name={`research-${study.slug}`}
                  share="morph"
                  default="none"
                >
                  <h3 className={styles.title}>{study.title}</h3>
                </ViewTransition>
                {study.question ? (
                  <p className={styles.question}>{study.question}</p>
                ) : (
                  <p className={styles.question}>{study.summary}</p>
                )}
                {study.sample ? (
                  <p className={styles.sample}>
                    <span className="caption">{homeLabels.sampleLabel}</span>{' '}
                    {study.sample}
                  </p>
                ) : null}
                {study.findings.length > 0 ? (
                  <ul role="list" className={styles.findings}>
                    {study.findings.map((finding) => (
                      <li key={finding.statement}>{finding.statement}</li>
                    ))}
                  </ul>
                ) : study.methods ? (
                  <div className={styles.methods}>
                    <p className="caption">{homeLabels.methodsLabel}</p>
                    <ul>
                      {study.methods.map((method) => (
                        <li key={method}>{method}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <ActionLink
                  href={`/research/${study.slug}` as Route}
                  variant="quiet"
                >
                  {homeLabels.studyLinkLabel}
                </ActionLink>
              </Reveal>
              {study.chart && figureNumber ? (
                <BarChart
                  data={study.chart}
                  title={study.chart.title}
                  figureNumber={figureNumber}
                  className={styles.chart}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
