import { ExperienceTimeline } from '@/components/fieldwork/ExperienceTimeline';
import {
  FieldPhotos,
  type FieldPhoto,
} from '@/components/fieldwork/FieldPhotos';
import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { ActionLink } from '@/components/ui/ActionLink';
import { experience } from '@/content/experience';
import { homeCopy } from '@/content/home';
import styles from './FieldChapter.module.css';

const copy = homeCopy.field;

/**
 * Chapter 03: field experience as a timeline of field notes beside a column
 * of photographs (PLAN §7.2 B). Photos are not tied to a specific role.
 */
export function FieldChapter({ photos }: { photos: FieldPhoto[] }) {
  return (
    <section id="field" className={`section surface-paper ${styles.chapter}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <ChapterHeading number="03" label="The Field" title={copy.title} />
          <p className="lede">{copy.intro}</p>
        </div>

        <ExperienceTimeline entries={experience} className={styles.notes} />
        <FieldPhotos photos={photos} className={styles.photos} />

        <div className={styles.more}>
          <ActionLink href="/fieldwork" variant="quiet">
            All field experience
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
