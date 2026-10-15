import { CvList } from '@/components/cv/CvList';
import { ExperienceTimeline } from '@/components/fieldwork/ExperienceTimeline';
import { FieldPhotos } from '@/components/fieldwork/FieldPhotos';
import { PageIntro } from '@/components/layout/PageIntro';
import { PageSection } from '@/components/layout/PageSection';
import { ActionLink } from '@/components/ui/ActionLink';
import { fieldworkLabels } from '@/content/experience';
import { getContent, getSitePage } from '@/lib/datocms/content';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('fieldwork');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/fieldwork/',
  });
}

export default async function FieldworkPage() {
  const [page, { experience, cv }] = await Promise.all([
    getSitePage('fieldwork'),
    getContent(),
  ]);
  const photos = page.photos.map((image) => ({
    image,
    alt: image.alt ?? '',
    caption: image.title ?? '',
  }));
  const labels = fieldworkLabels.sections;

  return (
    <>
      <PageIntro label={page.label} title={page.title} lede={page.lede} />

      <PageSection id="experience" title={labels.experience} wide>
        <div className={styles.split}>
          <ExperienceTimeline entries={experience} />
          {photos.length ? (
            <FieldPhotos photos={photos} className={styles.photos} />
          ) : null}
        </div>
      </PageSection>

      {cv.training?.length ? (
        <PageSection id="training" title={labels.training}>
          <CvList items={cv.training} />
        </PageSection>
      ) : null}

      {cv.outreach?.length ? (
        <PageSection id="outreach" title={labels.outreach}>
          {page.intro ? <p>{page.intro}</p> : null}
          <CvList items={cv.outreach} />
        </PageSection>
      ) : null}

      <PageSection id="photographs" title={labels.photographs}>
        {page.note ? <p>{page.note}</p> : null}
        <div>
          <ActionLink href="/gallery" variant="quiet">
            {fieldworkLabels.galleryLink}
          </ActionLink>
        </div>
      </PageSection>
    </>
  );
}
