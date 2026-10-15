import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Contours } from '@/components/media/Contours';
import { Reveal } from '@/components/motion/Reveal';
import {
  ChapterProgress,
  type Chapter,
} from '@/components/navigation/ChapterProgress';
import { ActionLink } from '@/components/ui/ActionLink';
import styles from './page.module.css';

// Phase 1 foundation preview: exercises the shell, chapter rail, reveals and
// contour drawing with the real chapter structure. Phase 3 replaces the
// placeholder chapter bodies with the full homepage (docs/PLAN.md §8).

const chapters: Chapter[] = [
  { id: 'landscape', number: '01', title: 'The Landscape' },
  { id: 'questions', number: '02', title: 'The Questions' },
  { id: 'field', number: '03', title: 'The Field' },
  { id: 'evidence', number: '04', title: 'The Evidence' },
  { id: 'next-question', number: '05', title: 'The Next Question' },
];

const themes = [
  'Climate change and community resilience',
  'Pesticides, pollinators and environmental justice',
  'Soil health and fertility',
  'Crop diversity and production systems',
  'Farmers, markets and participation',
];

export default function Home() {
  return (
    <>
      <ChapterProgress chapters={chapters} />

      <section id="landscape" className={styles.hero}>
        <Contours field="landscape" draw className={styles.heroContours} />
        <div className={`container ${styles.heroInner}`}>
          <ChapterHeading
            as="h1"
            size="display"
            number="01"
            label="The Landscape"
            title="Understanding agriculture. Investigating change. Supporting resilient communities."
          />
          <p className="lede">
            Agricultural science graduate (Tribhuvan University, 2024) with
            farmer-engagement and field-research experience in Nepal, studying
            climate adaptation, pesticides and pollinators, and how farmers
            respond to change.
          </p>
          <div className={styles.actions}>
            <ActionLink href="/research">Explore research</ActionLink>
            <ActionLink href="/cv" variant="quiet">
              View academic CV
            </ActionLink>
          </div>
        </div>
      </section>

      <section id="questions" className={`section ${styles.chapter}`}>
        <div className={`container ${styles.chapterBody}`}>
          <ChapterHeading
            number="02"
            label="The Questions"
            title="Questions rooted in the land."
          />
          <ol role="list" className={styles.themes}>
            {themes.map((theme, i) => (
              <Reveal as="li" key={theme} index={i}>
                <span className={styles.themeNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {theme}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="field" className={`section surface-paper ${styles.chapter}`}>
        <div className={`container ${styles.chapterBody}`}>
          <ChapterHeading
            number="03"
            label="The Field"
            title="Research that begins with farmers."
          />
          <Reveal as="p" className="lede">
            Field facilitation with GeoKrishi across two municipalities,
            managing the family farm in Ratnanagar, and coordinating the Lamahi
            Youth Network.
          </Reveal>
        </div>
      </section>

      <section id="evidence" className={`section ${styles.chapter}`}>
        <div className={`container ${styles.chapterBody}`}>
          <ChapterHeading
            number="04"
            label="The Evidence"
            title="What the studies found."
          />
          <Reveal as="p" className="lede">
            Six studies, from an aromatic rice genotype thesis to a
            100-household survey of climate adaptation in Gauradaha.
          </Reveal>
        </div>
      </section>

      <section
        id="next-question"
        className={`section surface-dark ${styles.chapter}`}
      >
        <div className={`container ${styles.chapterBody}`}>
          <ChapterHeading
            number="05"
            label="The Next Question"
            title="Where the research goes next."
          />
          <Reveal className={styles.closing}>
            <p className="lede">
              Pollinators, pesticide governance, and how farmers perceive and
              respond to agricultural change.
            </p>
            <div className={styles.actions}>
              <ActionLink href="/contact">
                Discuss research opportunities
              </ActionLink>
              <ActionLink href="/cv" variant="quiet">
                View academic CV
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
