import type { Route } from 'next';
import Link from 'next/link';
import { CvList } from '@/components/cv/CvList';
import { PageIntro } from '@/components/layout/PageIntro';
import { PageSection } from '@/components/layout/PageSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { ActionLink } from '@/components/ui/ActionLink';
import { aboutLabels } from '@/content/profile';
import { getContent, getSitePage } from '@/lib/datocms/content';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata } from '@/lib/seo';
import { personSchema } from '@/lib/structured-data';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('about');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/about/',
  });
}

export default async function AboutPage() {
  const [site, page, { profile, cv }] = await Promise.all([
    getSiteConfig(),
    getSitePage('about'),
    getContent(),
  ]);
  const { education } = profile;
  const labels = aboutLabels.sections;

  return (
    <>
      <PageIntro label={page.label} title={page.title} lede={page.lede} />

      <PageSection id="biography" title={labels.bio}>
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className={styles.bio}>
            {paragraph}
          </p>
        ))}
      </PageSection>

      <PageSection id="education" title={labels.education}>
        <div className={styles.degree}>
          {education.degree ? (
            <p className={styles.degreeTitle}>{education.degree}</p>
          ) : null}
          <p>
            {[education.institution, education.place]
              .filter(Boolean)
              .join(', ')}
          </p>
          <p className={styles.meta}>
            {[education.period, ...education.details]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
        {education.thesis ? (
          <div className={styles.thesis}>
            <p className="caption">{aboutLabels.thesisLabel}</p>
            <p>
              <Link href={`/research/${education.thesis.slug}` as Route}>
                {education.thesis.title}
              </Link>
            </p>
          </div>
        ) : null}
      </PageSection>

      <PageSection id="interests" title={labels.interests}>
        <ul role="list" className={styles.interests}>
          {profile.researchInterests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
        <div>
          <ActionLink href="/research" variant="quiet">
            {aboutLabels.interestsLink}
          </ActionLink>
        </div>
      </PageSection>

      <PageSection id="skills" title={labels.skills}>
        <CvList
          items={[
            ...(cv.skill ?? []),
            ...(cv.language ?? []),
            ...(cv.course ?? []),
          ]}
        />
      </PageSection>

      {cv.award?.length ? (
        <PageSection id="awards" title={labels.awards}>
          <CvList items={cv.award} />
        </PageSection>
      ) : null}

      <PageSection id="next" title={labels.next}>
        <ul role="list" className={styles.links}>
          {aboutLabels.links.map((link) => (
            <li key={link.href}>
              <ActionLink href={link.href} variant="quiet">
                {link.label}
              </ActionLink>
            </li>
          ))}
        </ul>
      </PageSection>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...personSchema(site, profile),
        }}
      />
    </>
  );
}
