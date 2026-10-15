import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { DatoImage } from '@/components/media/DatoImage';
import { Reveal } from '@/components/motion/Reveal';
import { ActionLink } from '@/components/ui/ActionLink';
import { experience } from '@/content/experience';
import { homeCopy } from '@/content/home';
import type { DatoImage as DatoImageData } from '@/lib/datocms/types';
import styles from './FieldChapter.module.css';

const copy = homeCopy.field;

type FieldPhoto = { image: DatoImageData; alt: string; caption: string };

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

        <ol role="list" className={styles.notes}>
          {experience.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.organisation}
              index={i}
              className={styles.note}
            >
              <p className={styles.meta}>
                <span>{entry.period}</span>
                <span>{entry.location}</span>
              </p>
              <h3 className={styles.role}>{entry.role}</h3>
              <p className={styles.organisation}>{entry.organisation}</p>
              <ul className={styles.points}>
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <div className={styles.photos}>
          {photos.map((photo, i) => (
            <Reveal
              as="figure"
              key={photo.caption}
              index={i}
              className={styles.photo}
            >
              <DatoImage
                data={photo.image.responsiveImage}
                alt={photo.alt}
                fill
                focalPoint={photo.image.focalPoint}
                sizes="(min-width: 64em) 28vw, 46vw"
                className={styles.frame}
              />
              <figcaption className={styles.annotation}>
                {photo.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className={styles.more}>
          <ActionLink href="/fieldwork" variant="quiet">
            All field experience
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
