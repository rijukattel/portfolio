import { PageIntro } from '@/components/layout/PageIntro';
import { PostCard } from '@/components/journal/PostCard';
import { categoryLabel, journalCopy } from '@/content/journal';
import { getAllPosts } from '@/lib/datocms/journal';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: journalCopy.title,
    description: journalCopy.description,
    path: '/blog/',
  });
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default async function JournalPage() {
  const posts = await getAllPosts();

  const counts = new Map<string, number>();
  for (const post of posts) {
    const key = post.category ? slugify(post.category) : '';
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const categories = [...counts.entries()].sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // Filtering is pure CSS (radio + :has), so it works without JavaScript and
  // every post stays visible where :has() isn't supported.
  const filterRules = categories
    .map(
      ([key]) =>
        `[data-journal]:has(#filter-${key}:checked) [data-category]:not([data-category="${key}"]){display:none}`
    )
    .join('');

  return (
    <>
      <PageIntro
        label={journalCopy.label}
        title={journalCopy.title}
        lede={journalCopy.lede}
      />
      <section
        className={`container section ${styles.journal}`}
        data-journal=""
        aria-label="Posts"
      >
        {categories.length > 1 ? (
          <fieldset className={styles.filter}>
            <legend className="caption">{journalCopy.filterLegend}</legend>
            <div className={styles.options}>
              <input
                type="radio"
                name="journal-filter"
                id="filter-all"
                className={`${styles.radio} ${styles.radioAll}`}
                defaultChecked
              />
              <label htmlFor="filter-all" className={styles.option}>
                {journalCopy.allLabel} <span>{posts.length}</span>
              </label>
              {categories.map(([key, count]) => (
                <span key={key} className={styles.optionGroup}>
                  <input
                    type="radio"
                    name="journal-filter"
                    id={`filter-${key}`}
                    className={styles.radio}
                  />
                  <label htmlFor={`filter-${key}`} className={styles.option}>
                    {categoryLabel(key)} <span>{count}</span>
                  </label>
                </span>
              ))}
            </div>
            <style>{filterRules}</style>
          </fieldset>
        ) : null}

        <ol role="list" className={styles.list}>
          {posts.map((post, i) => (
            <li
              key={post.id}
              className={styles.item}
              data-category={post.category ? slugify(post.category) : ''}
            >
              <PostCard post={post} lead={i === 0} priority={i === 0} />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
