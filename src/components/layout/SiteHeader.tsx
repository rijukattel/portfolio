import Link from 'next/link';
import { HeaderNav } from '@/components/navigation/HeaderNav';
import { HeaderState } from '@/components/navigation/HeaderState';
import { getProfile } from '@/lib/datocms/content';
import { getLabels } from '@/lib/datocms/labels';
import { getSiteConfig } from '@/lib/datocms/site';
import styles from './SiteHeader.module.css';

/**
 * Fixed-height sticky header. Scrolling only changes its background and
 * scales the wordmark, so nothing below it ever shifts.
 */
export async function SiteHeader() {
  const [profile, site, labels] = await Promise.all([
    getProfile(),
    getSiteConfig(),
    getLabels(),
  ]);
  return (
    <header className={styles.header} data-site-header="">
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark}>
          {profile.name}
        </Link>
        <HeaderNav
          name={profile.name}
          email={profile.email}
          items={site.navigation}
          labels={{ menu: labels.menuButton, close: labels.closeButton }}
        />
      </div>
      <HeaderState />
    </header>
  );
}
