import Link from 'next/link';
import { Contours } from '@/components/media/Contours';
import type { Route } from 'next';
import { getProfile } from '@/lib/datocms/content';
import { getLabels } from '@/lib/datocms/labels';
import { getSiteConfig } from '@/lib/datocms/site';
import styles from './SiteFooter.module.css';

export async function SiteFooter() {
  const [site, profile, labels] = await Promise.all([
    getSiteConfig(),
    getProfile(),
    getLabels(),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className={`surface-dark ${styles.footer}`}>
      <Contours field="band" className={styles.contours} />
      <div className={`container ${styles.grid}`}>
        <div className={styles.identity}>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.statement}>{profile.statement}</p>
        </div>
        <nav aria-labelledby="footer-explore" className={styles.explore}>
          <h2 id="footer-explore" className="caption">
            {labels.footerExplore}
          </h2>
          <ul role="list" className={styles.links}>
            {site.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href as Route}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.contact}>
          <h2 className="caption">{labels.footerContact}</h2>
          <ul role="list" className={styles.links}>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {profile.linkedinUrl ? (
              <li>
                <a href={profile.linkedinUrl} rel="me">
                  {labels.linkedinLabel}
                </a>
              </li>
            ) : null}
            {site.facebookUrl ? (
              <li>
                <a href={site.facebookUrl} rel="me">
                  {labels.facebookLabel}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className={`container ${styles.base}`}>
        <p>
          © {year} {profile.name}
        </p>
        {profile.location ? <p>{profile.location}</p> : null}
      </div>
    </footer>
  );
}
