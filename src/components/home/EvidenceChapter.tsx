import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Reveal } from '@/components/motion/Reveal';
import { BarChart } from '@/components/research/BarChart';
import { ActionLink } from '@/components/ui/ActionLink';
import { homeCopy } from '@/content/home';
import { featuredResearch, researchTypeLabels } from '@/content/research';
import styles from './EvidenceChapter.module.css';

const copy = homeCopy.evidence;

// Figures are numbered in reading order across the chapter.
const studies = featuredResearch.map((study, i, all) => ({
  study,
  figureNumber: study.chart
    ? all.slice(0, i + 1).filter((entry) => entry.chart).length
    : null,
}));

/**
 * Chapter 04: the featured studies with their reported findings, and a chart
 * wherever the source gives numbers (PLAN §7.2 C). Nothing is extrapolated.
 */
export function EvidenceChapter() {
  return (
    <section id="evidence" className={`section ${styles.chapter}`}>
      <div className="container">
        <div className={styles.head}>
          <ChapterHeading number="04" label="The Evidence" title={copy.title} />
          <p className="lede">{copy.intro}</p>
        </div>

        <ol role="list" className={styles.studies}>
          {studies.map(({ study, figureNumber }) => (
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
                <h3 className={styles.title}>{study.title}</h3>
                {study.question ? (
                  <p className={styles.question}>{study.question}</p>
                ) : (
                  <p className={styles.question}>{study.summary}</p>
                )}
                {study.sample ? (
                  <p className={styles.sample}>
                    <span className="caption">{copy.sampleLabel}</span>{' '}
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
                    <p className="caption">{copy.methodsLabel}</p>
                    <ul>
                      {study.methods.map((method) => (
                        <li key={method}>{method}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <ActionLink href="/research" variant="quiet">
                  {copy.linkLabel}
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
