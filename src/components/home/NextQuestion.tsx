import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Contours } from '@/components/media/Contours';
import { Reveal } from '@/components/motion/Reveal';
import { ActionLink } from '@/components/ui/ActionLink';
import { getLabels } from '@/lib/datocms/labels';
import styles from './NextQuestion.module.css';

/**
 * Chapter 05, the closing scene (PLAN §7.2 E): the contour lines return and
 * draw in slowly while the directions and the contact action settle in.
 */
type NextQuestionProps = {
  title: string;
  intro?: string;
  directions: { title: string; text: string }[];
};

export async function NextQuestion({
  title,
  intro,
  directions,
}: NextQuestionProps) {
  const labels = await getLabels();
  return (
    <section
      id="next-question"
      className={`section surface-paper ${styles.next}`}
    >
      <Contours
        field="landscape"
        draw
        pace="slow"
        className={styles.contours}
      />
      <div className={`container ${styles.grid}`}>
        <ChapterHeading
          number="05"
          label={labels.chapterNext}
          title={title}
          className={styles.heading}
        />
        <div className={styles.body}>
          {intro ? <p className="lede">{intro}</p> : null}
          <ol role="list" className={styles.directions}>
            {directions.map((direction, i) => (
              <Reveal
                as="li"
                key={direction.title}
                index={i}
                className={styles.direction}
              >
                <span className={styles.number}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={styles.title}>{direction.title}</h3>
                  <p className={styles.text}>{direction.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className={styles.actions}>
            <ActionLink href="/contact">
              {labels.discussOpportunities}
            </ActionLink>
            <ActionLink href="/cv" variant="quiet">
              {labels.heroSecondary}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
