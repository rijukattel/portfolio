import type { ReactNode } from 'react';
import { Contours } from '@/components/media/Contours';
import styles from './PageIntro.module.css';

type PageIntroProps = {
  label: string;
  title: string;
  lede?: string;
  children?: ReactNode;
};

/** Opening block for inner pages: section label, the page's only <h1>, lede. */
export function PageIntro({ label, title, lede, children }: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <Contours field="band" className={styles.contours} />
      <div className={`container ${styles.inner}`}>
        <p className="caption">{label}</p>
        <h1 className={styles.title}>{title}</h1>
        {lede ? <p className={`lede ${styles.lede}`}>{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}
