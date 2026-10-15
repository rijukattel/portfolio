import { PageIntro } from '@/components/layout/PageIntro';
import { ResearchCard } from '@/components/research/ResearchCard';
import { ThemeFromQuery } from '@/components/research/ThemeFromQuery';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { themes } from '@/content/home';
import { research, researchCopy, researchTypeLabels } from '@/content/research';
import type { ResearchType } from '@/content/types';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: researchCopy.title,
    description: researchCopy.description,
    path: '/research/',
  });
}

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

export default function ResearchPage() {
  return (
    <>
      <PageIntro
        label={researchCopy.label}
        title={researchCopy.title}
        lede={researchCopy.lede}
      />
      <section
        className={`container section ${styles.archive}`}
        data-research=""
        aria-label={researchCopy.listLabel}
      >
        <div className={styles.filters}>
          <ChipFilter
            legend={researchCopy.themeLegend}
            name="research-theme"
            idPrefix="rt-theme"
            allLabel={researchCopy.allThemesLabel}
            options={usedThemes.map((theme) => ({
              value: theme.id,
              label: theme.title,
              count: research.filter((e) => e.themes.includes(theme.id)).length,
            }))}
          />
          <ChipFilter
            legend={researchCopy.typeLegend}
            name="research-type"
            idPrefix="rt-type"
            allLabel={researchCopy.allTypesLabel}
            options={usedTypes.map((type) => ({
              value: type,
              label: researchTypeLabels[type],
              count: research.filter((e) => e.type === type).length,
            }))}
          />
          <style>{`@supports selector(:has(*)){${filterRules}}`}</style>
        </div>

        <p className={styles.empty} data-empty="" role="status">
          {researchCopy.empty}
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
