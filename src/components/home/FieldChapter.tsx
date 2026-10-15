import { ExperienceTimeline } from '@/components/fieldwork/ExperienceTimeline';
import {
  FieldPhotos,
  type FieldPhoto,
} from '@/components/fieldwork/FieldPhotos';
import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { ActionLink } from '@/components/ui/ActionLink';
import { homeLabels } from '@/content/home';
import type { ExperienceEntry } from '@/content/types';
import styles from './FieldChapter.module.css';

/**
 * Chapter 03: field experience as a timeline of field notes beside a column
 * of photographs (PLAN §7.2 B). Photos are not tied to a specific role.
 */
type FieldChapterProps = {
  title: string;
  intro?: string;
  experience: ExperienceEntry[];
  photos: FieldPhoto[];
};

export function FieldChapter({
  title,
  intro,
  experience,
  photos,
}: FieldChapterProps) {
  return (
    <section id="field" className={`section surface-paper ${styles.chapter}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <ChapterHeading number="03" label="The Field" title={title} />
          {intro ? <p className="lede">{intro}</p> : null}
        </div>

        <ExperienceTimeline entries={experience} className={styles.notes} />
        <FieldPhotos photos={photos} className={styles.photos} />

        <div className={styles.more}>
          <ActionLink href="/fieldwork" variant="quiet">
            {homeLabels.fieldMoreLabel}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
