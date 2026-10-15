import { ChapterHeading } from '@/components/layout/ChapterHeading';
import { Contours } from '@/components/media/Contours';
import { DatoImage } from '@/components/media/DatoImage';
import { ActionLink } from '@/components/ui/ActionLink';
import { homeCopy } from '@/content/home';
import type { DatoImage as DatoImageData } from '@/lib/datocms/types';
import styles from './Hero.module.css';

const copy = homeCopy.landscape;

/**
 * Chapter 01, the opening scene (PLAN §7.2 A): the photograph first, then
 * the title settles and contour lines draw over the land. As the scene
 * scrolls away the photograph recedes and only the lines carry on.
 */
export function Hero({ image }: { image: DatoImageData }) {
  return (
    <section id="landscape" className={`surface-dark ${styles.hero}`}>
      <div className={styles.media}>
        <DatoImage
          data={image.responsiveImage}
          alt={copy.imageAlt}
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
          label="The Landscape"
          title={copy.title}
          className={styles.heading}
        />
        <p className={`lede ${styles.lede}`}>{copy.lede}</p>
        <div className={styles.actions}>
          <ActionLink href={copy.primary.href}>{copy.primary.label}</ActionLink>
          <ActionLink href={copy.secondary.href} variant="quiet">
            {copy.secondary.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
