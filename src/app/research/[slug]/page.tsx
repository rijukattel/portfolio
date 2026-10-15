import type { Metadata, Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition, type ReactNode } from 'react';
import { PostCard } from '@/components/journal/PostCard';
import {
  ChapterProgress,
  type Chapter,
} from '@/components/navigation/ChapterProgress';
import { BarChart } from '@/components/research/BarChart';
import { JsonLd } from '@/components/seo/JsonLd';
import { themes } from '@/content/home';
import {
  getResearch,
  relatedResearch,
  research,
  researchCopy,
  researchTypeLabels,
} from '@/content/research';
import { getAllPosts } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/structured-data';
import styles from './page.module.css';

// One page per research record; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return research.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/research/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.title,
    description: `${researchTypeLabels[entry.type]} by Riju Kattel: ${lowerFirst(entry.summary)}`,
    path: `/research/${entry.slug}/`,
  });
}

type SectionKey = keyof typeof researchCopy.sections;

// "How young…" → "how young…", but leave acronyms such as "PRA" alone.
const lowerFirst = (text: string) =>
  /^[A-Z](?![A-Z])/.test(text) ? text[0].toLowerCase() + text.slice(1) : text;

const themeTitles = Object.fromEntries(themes.map((t) => [t.id, t.title]));

export default async function ResearchEntryPage({
  params,
}: PageProps<'/research/[slug]'>) {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) notFound();

  const [site, posts] = await Promise.all([getSiteConfig(), getAllPosts()]);
  const journalPost = entry.journalSlug
    ? (posts.find((post) => post.slug === entry.journalSlug) ?? null)
    : null;
  const related = relatedResearch(entry);

  // Sections appear only when the source supports them, numbered in order.
  const present: Record<SectionKey, boolean> = {
    question: Boolean(entry.question),
    context: Boolean(entry.context?.length),
    method: Boolean(entry.methods?.length || entry.sample),
    findings: entry.findings.length > 0 || Boolean(entry.chart),
    implications: Boolean(
      entry.implications?.length || entry.limitations?.length
    ),
    record: true,
  };
  const sections = (Object.keys(present) as SectionKey[]).filter(
    (key) => present[key]
  );
  const number = (key: SectionKey) =>
    String(sections.indexOf(key) + 1).padStart(2, '0');
  const chapters: Chapter[] = sections.map((key) => ({
    id: key,
    number: number(key),
    title: researchCopy.sections[key],
  }));

  const heading = (key: SectionKey) => (
    <h2 className={styles.sectionTitle}>
      <span className={styles.sectionNumber}>{number(key)} /</span>{' '}
      {researchCopy.sections[key]}
    </h2>
  );

  const record: [string, ReactNode][] = [
    ['Type', researchTypeLabels[entry.type]],
    ['Period', entry.period],
    ['Location', entry.location],
    ['Role', entry.role],
    ['Sample', entry.sample],
    ['Status', entry.status],
    [
      'Themes',
      <ul role="list" key="themes" className={styles.inlineList}>
        {entry.themes.map((theme) => (
          <li key={theme}>
            <Link href={`/research?theme=${theme}` as Route}>
              {themeTitles[theme]}
            </Link>
          </li>
        ))}
      </ul>,
    ],
    [
      'Sources',
      <ul role="list" key="sources" className={styles.inlineList}>
        {entry.sources.map((source) => (
          <li key={source.label}>
            {source.kind === 'journal' && entry.journalSlug ? (
              <Link href={`/blog/${entry.journalSlug}` as Route}>
                {source.label}
              </Link>
            ) : source.kind === 'cv' ? (
              <Link href="/cv">{source.label}</Link>
            ) : (
              source.label
            )}
          </li>
        ))}
      </ul>,
    ],
    [
      researchCopy.referencesLabel,
      entry.references?.length ? entry.references.join('; ') : undefined,
    ],
  ];

  return (
    <article className={styles.article}>
      {sections.length >= 3 ? <ChapterProgress chapters={chapters} /> : null}

      <header className={`container ${styles.header}`}>
        <Link href="/research" className={styles.back}>
          <span aria-hidden="true">←</span> {researchCopy.backLabel}
        </Link>
        <p className={styles.kicker}>
          {[researchTypeLabels[entry.type], entry.period, entry.location]
            .filter(Boolean)
            .map((part) => (
              <span key={part}>{part}</span>
            ))}
        </p>
        <ViewTransition
          name={`research-${entry.slug}`}
          share="morph"
          default="none"
        >
          <h1 className={styles.title}>{entry.title}</h1>
        </ViewTransition>
        <p className={`lede ${styles.summary}`}>{entry.summary}</p>
        {entry.depth === 'brief' ? (
          <p className={styles.notice}>{researchCopy.briefNotice}</p>
        ) : null}
      </header>

      <div className={`container ${styles.body}`}>
        {present.question ? (
          <section id="question" className={styles.section}>
            {heading('question')}
            <p className={styles.question}>{entry.question}</p>
          </section>
        ) : null}

        {present.context ? (
          <section id="context" className={styles.section}>
            {heading('context')}
            {entry.context?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ) : null}

        {present.method ? (
          <section id="method" className={styles.section}>
            {heading('method')}
            {entry.sample ? (
              <p>
                <strong>Sample:</strong> {entry.sample}
              </p>
            ) : null}
            {entry.methods?.length ? (
              <ul className={styles.list}>
                {entry.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {present.findings ? (
          <section id="findings" className={styles.section}>
            {heading('findings')}
            {entry.findings.length > 0 ? (
              <ul role="list" className={styles.findings}>
                {entry.findings.map((finding) => (
                  <li key={finding.statement}>{finding.statement}</li>
                ))}
              </ul>
            ) : null}
            {entry.chart ? (
              <BarChart
                data={entry.chart}
                title={entry.chart.title}
                figureNumber={1}
                className={styles.chart}
              />
            ) : null}
          </section>
        ) : null}

        {present.implications ? (
          <section id="implications" className={styles.section}>
            {heading('implications')}
            {entry.implications?.length ? (
              <ul className={styles.list}>
                {entry.implications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {entry.limitations?.length ? (
              <>
                <h3 className={styles.subheading}>
                  {researchCopy.limitationsLabel}
                </h3>
                <ul className={styles.list}>
                  {entry.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        ) : null}

        <section id="record" className={styles.section}>
          {heading('record')}
          <dl className={styles.record}>
            {record
              .filter(([, value]) => Boolean(value))
              .map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
        </section>
      </div>

      {journalPost || related.length ? (
        <footer className={`container ${styles.footer}`}>
          {journalPost ? (
            <div className={styles.journal}>
              <p className="caption">{researchCopy.journalLabel}</p>
              <PostCard post={journalPost} headingLevel="h3" />
            </div>
          ) : null}
          {related.length ? (
            <nav aria-labelledby="related-title" className={styles.related}>
              <h2 id="related-title" className="caption">
                {researchCopy.relatedLabel}
              </h2>
              <ul role="list">
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/research/${other.slug}` as Route}
                      className={styles.relatedLink}
                    >
                      <span className={styles.relatedType}>
                        {researchTypeLabels[other.type]}
                      </span>
                      <span className={styles.relatedTitle}>{other.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </footer>
      ) : null}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...breadcrumbSchema(site, [
            { name: 'Home', path: '/' },
            { name: researchCopy.title, path: '/research/' },
            { name: entry.title, path: `/research/${entry.slug}/` },
          ]),
        }}
      />
    </article>
  );
}
