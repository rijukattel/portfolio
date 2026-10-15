import type { Route } from 'next';
import { CvList, type CvListItem } from '@/components/cv/CvList';
import { PrintButton } from '@/components/cv/PrintButton';
import { PageSection } from '@/components/layout/PageSection';
import { siteDefaults } from '@/config/site';
import {
  awards,
  courses,
  cvCopy,
  education,
  languages,
  presentations,
  skills,
  training,
} from '@/content/cv';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { research } from '@/content/research';
import type { ExperienceEntry, ResearchEntry } from '@/content/types';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: cvCopy.title,
    description: cvCopy.description,
    path: '/cv/',
  });
}

// Research experience as listed in the CV, in the CV's order. The beehive
// trial comes from the Journal, not the CV, so it isn't listed here.
const CV_RESEARCH = [
  'hybrid-rice-ga3',
  'jujube-consumer-preferences',
  'unseasonal-rainfall-ratnanagar',
  'climate-perceptions-gauradaha',
];

const toResearchItem = (entry: ResearchEntry): CvListItem => ({
  title: entry.title,
  href: `/research/${entry.slug}` as Route,
  detail: [entry.location, entry.role ?? entry.status]
    .filter(Boolean)
    .join(' · '),
  period: entry.period,
  points: entry.findings.map((finding) => finding.statement),
});

const toExperienceItem = (entry: ExperienceEntry): CvListItem => ({
  title: `${entry.role}, ${entry.organisation}`,
  detail: entry.location,
  period: entry.period,
  points: entry.points,
});

const researchItems = CV_RESEARCH.map((slug) =>
  research.find((entry) => entry.slug === slug)
)
  .filter((entry): entry is ResearchEntry => Boolean(entry))
  .map(toResearchItem);

const semesterItems = research
  .filter((entry) => entry.type === 'semester-project')
  .map((entry) => ({
    title: entry.title,
    href: `/research/${entry.slug}` as Route,
    detail: entry.location,
    period: entry.period,
  }));

/** Web CV (PLAN §13: no PDF, no phone number or street address). */
export default async function CvPage() {
  const site = await getSiteConfig();
  const host = new URL(site.url).host;

  return (
    <div className={styles.cv}>
      <header className={`container ${styles.header}`}>
        <p className="caption">{cvCopy.label}</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={`lede ${styles.statement}`}>{profile.statement}</p>
        <ul role="list" className={styles.contact}>
          <li>
            <a href={`mailto:${siteDefaults.email}`}>{siteDefaults.email}</a>
          </li>
          <li>
            <a href={siteDefaults.linkedinUrl} rel="me">
              linkedin.com/in/rijukattel222
            </a>
          </li>
          <li>
            <a href={site.url}>{host}</a>
          </li>
          <li>{profile.location}</li>
        </ul>
        <div className={styles.actions}>
          <PrintButton label={cvCopy.printLabel} />
          <p className={styles.updated}>{cvCopy.updated}</p>
        </div>
      </header>

      <PageSection id="education" title="Education">
        <CvList
          items={[
            {
              title: education.degree,
              detail: `${education.institution}, ${education.place} · ${education.details.join(' · ')}`,
              period: education.period,
            },
            {
              title: `Thesis: ${education.thesis.title}`,
              href: `/research/${education.thesis.slug}` as Route,
              points: education.thesis.techniques,
            },
          ]}
        />
      </PageSection>

      <PageSection id="research" title="Research experience">
        <CvList items={researchItems} />
      </PageSection>

      <PageSection id="work" title="Work experience">
        <CvList
          items={experience
            .filter((entry) => entry.category === 'work')
            .map(toExperienceItem)}
        />
      </PageSection>

      <PageSection id="leadership" title="Management and leadership">
        <CvList
          items={experience
            .filter((entry) => entry.category === 'leadership')
            .map(toExperienceItem)}
        />
      </PageSection>

      <PageSection id="semester-projects" title="Semester projects">
        <CvList items={semesterItems} />
      </PageSection>

      <PageSection id="training" title="Skill development">
        <CvList items={training} />
      </PageSection>

      <PageSection id="presentations" title="Presentations">
        {presentations.map((group) => (
          <div key={group.group} className={styles.group}>
            <h3 className="caption">{group.group}</h3>
            <CvList items={group.items} />
          </div>
        ))}
      </PageSection>

      <PageSection id="courses" title="Courses">
        <CvList items={courses} />
      </PageSection>

      <PageSection id="skills" title="Skills and languages">
        <CvList items={[...skills, ...languages]} />
      </PageSection>

      <PageSection id="awards" title="Awards and honours">
        <CvList items={awards} />
      </PageSection>

      <PageSection id="interests" title="Research interests">
        <p>{profile.researchInterests.join(' · ')}</p>
      </PageSection>
    </div>
  );
}
