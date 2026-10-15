import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Contours } from '@/components/media/Contours';
import { DatoImage } from '@/components/media/DatoImage';
import { ActionLink } from '@/components/ui/ActionLink';
import { getLabels } from '@/lib/datocms/labels';
import type { DatoImage as DatoImageData } from '@/lib/datocms/types';
import styles from './Hero.module.css';

type HeroProps = { image: DatoImageData; title: string; lede: string };

/**
 * Chapter 01, the opening scene (PLAN §7.2 A): the photograph first, then
 * the title settles and contour lines draw over the land. As the scene
 * scrolls away the photograph recedes and only the lines carry on.
 */
export async function Hero({ image, title, lede }: HeroProps) {
  const labels = await getLabels();
  return (
    <section id="landscape" className={`surface-dark ${styles.hero}`}>
      <div className={styles.media}>
        <DatoImage
          data={image.responsiveImage}
          alt={image.alt ?? ''}
          sizes="100vw"
          fill
          focalPoint={image.focalPoint}
          priority
          className={styles.photo}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <Contours field="landscape" draw className={styles.contours} />
      <div className={`container ${styles.inner}`}>
        <ChapterHeading
          as="h1"
          size="display"
          number="01"
          label={labels.chapterLandscape}
          title={title}
          className={styles.heading}
        />
        <p className={`lede ${styles.lede}`}>{lede}</p>
        <div className={styles.actions}>
          <ActionLink href="/research">{labels.heroPrimary}</ActionLink>
          <ActionLink href="/cv" variant="quiet">
            {labels.heroSecondary}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
