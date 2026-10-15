import { DatoImage } from '@/components/media/DatoImage';
import { Reveal } from '@/components/motion/Reveal';
import type { DatoImage as DatoImageData } from '@/lib/datocms/types';
import styles from './FieldPhotos.module.css';

export type FieldPhoto = {
  image: DatoImageData;
  alt: string;
  caption: string;
};

/**
 * A staggered column of three photographs with field-note annotations.
 * Captions describe what the photo shows, never more.
 */
export function FieldPhotos({
  photos,
  className,
}: {
  photos: FieldPhoto[];
  className?: string;
}) {
  return (
    <div
      className={className ? `${styles.photos} ${className}` : styles.photos}
    >
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
          <figcaption className={styles.annotation}>{photo.caption}</figcaption>
        </Reveal>
      ))}
    </div>
  );
}
