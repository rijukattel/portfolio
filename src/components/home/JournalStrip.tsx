import { PostCard } from '@/components/journal/PostCard';
import { ActionLink } from '@/components/ui/ActionLink';
import { getLabels } from '@/lib/datocms/labels';
import type { PostSummary } from '@/lib/datocms/types';
import styles from './JournalStrip.module.css';

/** A quiet strip of Journal posts between Chapters 04 and 05 (PLAN §8). */
export async function JournalStrip({
  title,
  posts,
}: {
  title: string;
  posts: PostSummary[];
}) {
  if (posts.length === 0) return null;
  const labels = await getLabels();
  return (
    <section
      className={`section ${styles.strip}`}
      aria-labelledby="journal-strip-title"
    >
      <div className="container">
        <div className={styles.head}>
          <h2 id="journal-strip-title" className={styles.title}>
            {title}
          </h2>
          <ActionLink href="/blog" variant="quiet">
            {labels.allJournalPosts}
          </ActionLink>
        </div>
        <ul role="list" className={styles.list}>
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
