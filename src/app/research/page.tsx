import { PageIntro } from '@/components/layout/PageIntro';
import { ResearchCard } from '@/components/research/ResearchCard';
import { ThemeFromQuery } from '@/components/research/ThemeFromQuery';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { researchLabels, researchTypeLabels } from '@/content/research';
import type { ResearchType } from '@/content/types';
import { getContent, getSitePage } from '@/lib/datocms/content';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('research');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/research/',
  });
}

export default async function ResearchPage() {
  const [page, { themes, research }] = await Promise.all([
    getSitePage('research'),
    getContent(),
  ]);

  const themeTitles = Object.fromEntries(themes.map((t) => [t.id, t.title]));
  const usedThemes = themes.filter((theme) =>
    research.some((entry) => entry.themes.includes(theme.id))
  );
  const usedTypes = (Object.keys(researchTypeLabels) as ResearchType[]).filter(
    (type) => research.some((entry) => entry.type === type)
  );

  // Theme and type filters combine (AND). Combinations with no work are known
  // at build time, so they get a rule that shows the empty-state message.
  const emptyCombinations = usedThemes.flatMap((theme) =>
    usedTypes
      .filter(
        (type) =>
          !research.some(
            (entry) => entry.type === type && entry.themes.includes(theme.id)
          )
      )
      .map((type) => [theme.id, type] as const)
  );

  const filterRules = [
    ...usedThemes.map(
      ({ id }) =>
        `[data-research]:has(#rt-theme-${id}:checked) [data-item]:not([data-themes~="${id}"]){display:none}`
    ),
    ...usedTypes.map(
      (type) =>
        `[data-research]:has(#rt-type-${type}:checked) [data-item]:not([data-type="${type}"]){display:none}`
    ),
    ...emptyCombinations.map(
      ([theme, type]) =>
        `[data-research]:has(#rt-theme-${theme}:checked):has(#rt-type-${type}:checked) [data-empty]{display:block}`
    ),
  ].join('');

  return (
    <>
      <PageIntro label={page.label} title={page.title} lede={page.lede} />
      <section
        className={`container section ${styles.archive}`}
        data-research=""
        aria-label={researchLabels.listLabel}
      >
        <div className={styles.filters}>
          <ChipFilter
            legend={researchLabels.themeLegend}
            name="research-theme"
            idPrefix="rt-theme"
            allLabel={researchLabels.allThemesLabel}
            options={usedThemes.map((theme) => ({
              value: theme.id,
              label: theme.title,
              count: research.filter((e) => e.themes.includes(theme.id)).length,
            }))}
          />
          <ChipFilter
            legend={researchLabels.typeLegend}
            name="research-type"
            idPrefix="rt-type"
            allLabel={researchLabels.allTypesLabel}
            options={usedTypes.map((type) => ({
              value: type,
              label: researchTypeLabels[type],
              count: research.filter((e) => e.type === type).length,
            }))}
          />
          <style>{`@supports selector(:has(*)){${filterRules}}`}</style>
        </div>

        <p className={styles.empty} data-empty="" role="status">
          {researchLabels.empty}
        </p>

        <ol role="list" className={styles.list}>
          {research.map((entry) => (
            <li
              key={entry.slug}
              data-item=""
              data-themes={entry.themes.join(' ')}
              data-type={entry.type}
            >
              <ResearchCard entry={entry} themeTitles={themeTitles} />
            </li>
          ))}
        </ol>
      </section>
      <ThemeFromQuery themeIds={usedThemes.map((theme) => theme.id)} />
    </>
  );
}
