import type { ReactNode } from 'react';
import styles from './PageSection.module.css';

type PageSectionProps = {
  /** Anchor id, also used to label the section for assistive tech. */
  id: string;
  title: string;
  children: ReactNode;
  /** Let the body use the full width instead of the reading measure. */
  wide?: boolean;
};

/** Editorial section for inner pages: title in the margin, body beside it. */
export function PageSection({ id, title, children, wide }: PageSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        <div className={wide ? `${styles.body} ${styles.wide}` : styles.body}>
          {children}
        </div>
      </div>
    </section>
  );
}
