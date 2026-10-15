import Link from 'next/link';
import { HeaderNav } from '@/components/navigation/HeaderNav';
import { HeaderState } from '@/components/navigation/HeaderState';
import { siteDefaults } from '@/config/site';
import styles from './SiteHeader.module.css';

/**
 * Fixed-height sticky header. Scrolling only changes its background and
 * scales the wordmark, so nothing below it ever shifts.
 */
export function SiteHeader() {
  return (
    <header className={styles.header} data-site-header="">
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark}>
          {siteDefaults.name}
        </Link>
        <HeaderNav />
      </div>
      <HeaderState />
    </header>
  );
}
