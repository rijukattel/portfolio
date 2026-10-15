import { PostCard } from '@/components/journal/PostCard';
import { ActionLink } from '@/components/ui/ActionLink';
import { homeCopy } from '@/content/home';
import type { PostSummary } from '@/lib/datocms/types';
import styles from './JournalStrip.module.css';

const copy = homeCopy.journal;

/** A quiet strip of Journal posts between Chapters 04 and 05 (PLAN §8). */
export function JournalStrip({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;
  return (
    <section
      className={`section ${styles.strip}`}
      aria-labelledby="journal-strip-title"
    >
      <div className="container">
        <div className={styles.head}>
          <h2 id="journal-strip-title" className={styles.title}>
            {copy.title}
          </h2>
          <ActionLink href="/blog" variant="quiet">
            {copy.linkLabel}
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
