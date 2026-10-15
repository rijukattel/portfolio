import type { Route } from 'next';
import Link from 'next/link';
import { DatoImage } from '@/components/media/DatoImage';
import type { PostSummary } from '@/lib/datocms/types';
import { PostMeta } from './PostMeta';
import styles from './PostCard.module.css';

type PostCardProps = {
  post: PostSummary;
  /** The newest post on the Journal page gets a wider, two-column layout. */
  lead?: boolean;
  priority?: boolean;
};

/**
 * The title link is stretched over the whole card, so the card is one click
 * target while its text stays selectable and the link text stays meaningful.
 */
export function PostCard({
  post,
  lead = false,
  priority = false,
}: PostCardProps) {
  return (
    <article className={lead ? `${styles.card} ${styles.lead}` : styles.card}>
      <div className={styles.layout}>
        <DatoImage
          data={post.cardImage.responsiveImage}
          alt={post.cardImage.alt ?? ''}
          sizes={
            lead
              ? '(min-width: 64em) 55vw, 100vw'
              : '(min-width: 64em) 30vw, (min-width: 40em) 46vw, 100vw'
          }
          priority={priority}
          fill
          className={styles.image}
        />
        <div className={styles.text}>
          <PostMeta
            category={post.category}
            date={post._firstPublishedAt}
            minutes={post.minutesOfReading}
          />
          <h2 className={styles.title}>
            <Link href={`/blog/${post.slug}` as Route} className={styles.link}>
              {post.title}
            </Link>
          </h2>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </div>
      </div>
    </article>
  );
}
