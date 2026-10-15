import { categoryLabel } from '@/content/journal';
import { formatDate } from '@/lib/format';
import styles from './PostMeta.module.css';

type PostMetaProps = {
  category: string | null;
  date: string;
  minutes: number | null;
  className?: string;
};

/** "Educational · 1 October 2025 · 4 min read" */
export function PostMeta({
  category,
  date,
  minutes,
  className,
}: PostMetaProps) {
  const label = categoryLabel(category);
  return (
    <p className={className ? `${styles.meta} ${className}` : styles.meta}>
      {label ? <span className={styles.category}>{label}</span> : null}
      <time dateTime={date}>{formatDate(date)}</time>
      {minutes ? <span>{minutes} min read</span> : null}
    </p>
  );
}
