import type { Route } from 'next';
import Link from 'next/link';
import { CvList } from '@/components/cv/CvList';
import { PageIntro } from '@/components/layout/PageIntro';
import { PageSection } from '@/components/layout/PageSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { ActionLink } from '@/components/ui/ActionLink';
import { awards, courses, education, languages, skills } from '@/content/cv';
import { aboutCopy, profile } from '@/content/profile';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata } from '@/lib/seo';
import { personSchema } from '@/lib/structured-data';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: 'About',
    description:
      'About Riju Kattel: B.Sc. Agriculture graduate of the Institute of Agriculture and Animal Science, Tribhuvan University, with research interests in climate resilience and pesticide governance.',
    path: '/about/',
  });
}

export default async function AboutPage() {
  const site = await getSiteConfig();
  const copy = aboutCopy;

  return (
    <>
      <PageIntro label={copy.label} title={copy.title} lede={copy.lede} />

      <PageSection id="biography" title={copy.sections.bio}>
        {copy.bio.map((paragraph) => (
          <p key={paragraph} className={styles.bio}>
            {paragraph}
          </p>
        ))}
      </PageSection>

      <PageSection id="education" title={copy.sections.education}>
        <div className={styles.degree}>
          <p className={styles.degreeTitle}>{education.degree}</p>
          <p>
            {education.institution}, {education.place}
          </p>
          <p className={styles.meta}>
            {education.period} · {education.details.join(' · ')}
          </p>
        </div>
        <div className={styles.thesis}>
          <p className="caption">{copy.thesisLabel}</p>
          <p>
            <Link href={`/research/${education.thesis.slug}` as Route}>
              {education.thesis.title}
            </Link>
          </p>
        </div>
      </PageSection>

      <PageSection id="interests" title={copy.sections.interests}>
        <ul role="list" className={styles.interests}>
          {profile.researchInterests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
        <div>
          <ActionLink href="/research" variant="quiet">
            {copy.interestsLink}
          </ActionLink>
        </div>
      </PageSection>

      <PageSection id="skills" title={copy.sections.skills}>
        <CvList items={[...skills, ...languages, ...courses]} />
      </PageSection>

      <PageSection id="awards" title={copy.sections.awards}>
        <CvList items={awards} />
      </PageSection>

      <PageSection id="next" title={copy.sections.next}>
        <ul role="list" className={styles.links}>
          {copy.links.map((link) => (
            <li key={link.href}>
              <ActionLink href={link.href as Route} variant="quiet">
                {link.label}
              </ActionLink>
            </li>
          ))}
        </ul>
      </PageSection>

      <JsonLd
        data={{ '@context': 'https://schema.org', ...personSchema(site) }}
      />
    </>
  );
}
