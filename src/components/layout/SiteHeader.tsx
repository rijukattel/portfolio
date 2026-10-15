import Link from 'next/link';
import { HeaderNav } from '@/components/navigation/HeaderNav';
import { HeaderState } from '@/components/navigation/HeaderState';
import { getProfile } from '@/lib/datocms/content';
import styles from './SiteHeader.module.css';

/**
 * Fixed-height sticky header. Scrolling only changes its background and
 * scales the wordmark, so nothing below it ever shifts.
 */
export async function SiteHeader() {
  const profile = await getProfile();
  return (
    <header className={styles.header} data-site-header="">
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark}>
          {profile.name}
        </Link>
        <HeaderNav name={profile.name} email={profile.email} />
      </div>
      <HeaderState />
    </header>
  );
}
