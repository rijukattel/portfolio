import { PageIntro } from '@/components/layout/PageIntro';
import { PostCard } from '@/components/journal/PostCard';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { categoryLabel, journalLabels } from '@/content/journal';
import { getSitePage } from '@/lib/datocms/content';
import { getAllPosts } from '@/lib/datocms/journal';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('journal');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/blog/',
  });
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default async function JournalPage() {
  const [posts, page] = await Promise.all([
    getAllPosts(),
    getSitePage('journal'),
  ]);

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
      <PageIntro label={page.label} title={page.title} lede={page.lede} />
      <section
        className={`container section ${styles.journal}`}
        data-journal=""
        aria-label="Posts"
      >
        {categories.length > 1 ? (
          <>
            <ChipFilter
              legend={journalLabels.filterLegend}
              name="journal-filter"
              idPrefix="filter"
              allLabel={journalLabels.allLabel}
              allCount={posts.length}
              options={categories.map(([key, count]) => ({
                value: key,
                label: categoryLabel(key) ?? key,
                count,
              }))}
            />
            <style>{filterRules}</style>
          </>
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
