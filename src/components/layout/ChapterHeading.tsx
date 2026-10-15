import type { ReactNode } from 'react';
import styles from './ChapterHeading.module.css';

type ChapterHeadingProps = {
  number: string;
  label: string;
  title: ReactNode;
  as?: 'h1' | 'h2';
  /** "display" is reserved for the opening scene's headline. */
  size?: 'chapter' | 'display';
  className?: string;
};

/** "01 / The Landscape" marker above a serif chapter title (PLAN §6.5). */
export function ChapterHeading({
  number,
  label,
  title,
  as: Heading = 'h2',
  size = 'chapter',
  className,
}: ChapterHeadingProps) {
  return (
    <div
      className={className ? `${styles.chapter} ${className}` : styles.chapter}
    >
      <p className={styles.marker}>
        <span className={styles.number}>{number}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <Heading
        className={size === 'display' ? styles.titleDisplay : styles.title}
      >
        {title}
      </Heading>
    </div>
  );
}
