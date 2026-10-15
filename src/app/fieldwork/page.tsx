import { CvList } from '@/components/cv/CvList';
import { ExperienceTimeline } from '@/components/fieldwork/ExperienceTimeline';
import { FieldPhotos } from '@/components/fieldwork/FieldPhotos';
import { PageIntro } from '@/components/layout/PageIntro';
import { PageSection } from '@/components/layout/PageSection';
import { ActionLink } from '@/components/ui/ActionLink';
import { presentations, training } from '@/content/cv';
import { experience, fieldworkCopy } from '@/content/experience';
import { homeCopy, homeImages } from '@/content/home';
import { getUploads } from '@/lib/datocms/uploads';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: 'Fieldwork',
    description:
      'Field experience: farmer engagement with GeoKrishi, managing a family farm in Ratnanagar, and community work with the Lamahi Youth Network.',
    path: '/fieldwork/',
  });
}

const outreach =
  presentations.find((group) => group.group.startsWith('Outreach'))?.items ??
  [];

export default async function FieldworkPage() {
  const photoKeys = homeCopy.field.photos.map((photo) => photo.key);
  const images = await getUploads(photoKeys.map((key) => homeImages[key]));
  const photos = homeCopy.field.photos.map((photo) => ({
    image: images[homeImages[photo.key]],
    alt: photo.alt,
    caption: photo.caption,
  }));

  return (
    <>
      <PageIntro
        label={fieldworkCopy.label}
        title={fieldworkCopy.title}
        lede={fieldworkCopy.lede}
      />

      <PageSection
        id="experience"
        title={fieldworkCopy.sections.experience}
        wide
      >
        <div className={styles.split}>
          <ExperienceTimeline entries={experience} />
          <FieldPhotos photos={photos} className={styles.photos} />
        </div>
      </PageSection>

      <PageSection id="training" title={fieldworkCopy.sections.training}>
        <CvList items={training} />
      </PageSection>

      <PageSection id="outreach" title={fieldworkCopy.sections.outreach}>
        <p>{fieldworkCopy.outreachIntro}</p>
        <CvList items={outreach} />
      </PageSection>

      <PageSection id="photographs" title={fieldworkCopy.sections.photographs}>
        <p>{fieldworkCopy.photographsText}</p>
        <div>
          <ActionLink href="/gallery" variant="quiet">
            {fieldworkCopy.galleryLink}
          </ActionLink>
        </div>
      </PageSection>
    </>
  );
}
