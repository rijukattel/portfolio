import type { Route } from 'next';
import Link from 'next/link';
import type { CvItem } from '@/content/types';
import styles from './CvList.module.css';

export type CvListItem = CvItem & { href?: Route };

/** CV-style entries: title, detail and dates, with optional points. */
export function CvList({ items }: { items: CvListItem[] }) {
  return (
    <ul role="list" className={styles.list}>
      {items.map((item) => (
        <li key={`${item.title}-${item.period ?? ''}`} className={styles.item}>
          <div className={styles.head}>
            <h3 className={styles.title}>
              {item.href ? (
                <Link href={item.href}>{item.title}</Link>
              ) : (
                item.title
              )}
            </h3>
            {item.period ? (
              <p className={styles.period}>{item.period}</p>
            ) : null}
          </div>
          {item.detail ? <p className={styles.detail}>{item.detail}</p> : null}
          {item.points?.length ? (
            <ul className={styles.points}>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
