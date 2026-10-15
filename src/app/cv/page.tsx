import type { Route } from 'next';
import { CvList, type CvListItem } from '@/components/cv/CvList';
import { PrintButton } from '@/components/cv/PrintButton';
import { PageSection } from '@/components/layout/PageSection';
import type { ExperienceEntry, ResearchEntry } from '@/content/types';
import { getContent, getSitePage } from '@/lib/datocms/content';
import { getLabels } from '@/lib/datocms/labels';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('cv');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/cv/',
  });
}

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

/** Web CV built from DatoCMS (PLAN §13: no PDF, no phone or street address). */
export default async function CvPage() {
  const [site, page, { profile, research, experience, cv }, labels] =
    await Promise.all([
      getSiteConfig(),
      getSitePage('cv'),
      getContent(),
      getLabels(),
    ]);
  const host = new URL(site.url).host;
  const { education } = profile;

  // The CV's "Research experience" lists records given a CV position, in
  // that order; semester projects get their own section.
  const researchItems = research
    .filter((entry) => entry.cvPosition != null)
    .sort((a, b) => (a.cvPosition ?? 0) - (b.cvPosition ?? 0))
    .map(toResearchItem);
  const semesterItems = research
    .filter((entry) => entry.type === 'semester-project' && entry.listedInCv)
    .map((entry) => ({
      title: entry.title,
      href: `/research/${entry.slug}` as Route,
      detail: entry.location,
      period: entry.period,
    }));
  const presentations = [
    { title: labels.cvOutreach, items: cv.outreach ?? [] },
    { title: labels.cvAcademic, items: cv.academic_presentation ?? [] },
  ].filter((group) => group.items.length);

  return (
    <div className={styles.cv}>
      <header className={`container ${styles.header}`}>
        <p className="caption">{page.label}</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={`lede ${styles.statement}`}>{profile.statement}</p>
        <ul role="list" className={styles.contact}>
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          {profile.linkedinUrl ? (
            <li>
              <a href={profile.linkedinUrl} rel="me">
                {profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </li>
          ) : null}
          <li>
            <a href={site.url}>{host}</a>
          </li>
          {profile.location ? <li>{profile.location}</li> : null}
        </ul>
        <div className={styles.actions}>
          <PrintButton label={labels.printCv} />
          {page.note ? <p className={styles.updated}>{page.note}</p> : null}
        </div>
      </header>

      <PageSection id="education" title={labels.cvEducation}>
        <CvList
          items={[
            {
              title: education.degree ?? '',
              detail: [
                [education.institution, education.place]
                  .filter(Boolean)
                  .join(', '),
                ...education.details,
              ]
                .filter(Boolean)
                .join(' · '),
              period: education.period,
            },
            ...(education.thesis
              ? [
                  {
                    title: `${labels.thesisPrefix}: ${education.thesis.title}`,
                    href: `/research/${education.thesis.slug}` as Route,
                    points: education.thesis.techniques,
                  },
                ]
              : []),
          ]}
        />
      </PageSection>

      {researchItems.length ? (
        <PageSection id="research" title={labels.cvResearch}>
          <CvList items={researchItems} />
        </PageSection>
      ) : null}

      <PageSection id="work" title={labels.cvWork}>
        <CvList
          items={experience
            .filter((entry) => entry.category === 'work')
            .map(toExperienceItem)}
        />
      </PageSection>

      <PageSection id="leadership" title={labels.cvLeadership}>
        <CvList
          items={experience
            .filter((entry) => entry.category === 'leadership')
            .map(toExperienceItem)}
        />
      </PageSection>

      {semesterItems.length ? (
        <PageSection id="semester-projects" title={labels.cvSemester}>
          <CvList items={semesterItems} />
        </PageSection>
      ) : null}

      {cv.training?.length ? (
        <PageSection id="training" title={labels.cvTraining}>
          <CvList items={cv.training} />
        </PageSection>
      ) : null}

      {presentations.length ? (
        <PageSection id="presentations" title={labels.cvPresentations}>
          {presentations.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className="caption">{group.title}</h3>
              <CvList items={group.items} />
            </div>
          ))}
        </PageSection>
      ) : null}

      {cv.course?.length ? (
        <PageSection id="courses" title={labels.cvCourses}>
          <CvList items={cv.course} />
        </PageSection>
      ) : null}

      <PageSection id="skills" title={labels.cvSkills}>
        <CvList items={[...(cv.skill ?? []), ...(cv.language ?? [])]} />
      </PageSection>

      {cv.award?.length ? (
        <PageSection id="awards" title={labels.cvAwards}>
          <CvList items={cv.award} />
        </PageSection>
      ) : null}

      <PageSection id="interests" title={labels.cvInterests}>
        <p>{profile.researchInterests.join(' · ')}</p>
      </PageSection>
    </div>
  );
}
