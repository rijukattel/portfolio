import type { CSSProperties } from 'react';
import { RSCImage } from 'react-datocms/rsc-image';
import type { FocalPoint, ResponsiveImage } from '@/lib/datocms/types';
import styles from './DatoImage.module.css';

type DatoImageProps = {
  data: ResponsiveImage;
  /** Overrides the DatoCMS alt text; pass "" for a decorative image. */
  alt?: string;
  /** Rendered width hint for srcset selection. */
  sizes?: string;
  /** Only for the image most likely to be the page's LCP element. */
  priority?: boolean;
  /**
   * Fill a box sized by `className` (e.g. an aspect-ratio), cropping with
   * object-fit around the focal point.
   */
  fill?: boolean;
  focalPoint?: FocalPoint;
  /**
   * Cap the rendered height (a CSS length); the image narrows to keep its
   * proportions. For portrait photos inside running text.
   */
  maxHeight?: string;
  className?: string;
};

/**
 * Responsive DatoCMS image: AVIF/WebP via imgix, intrinsic aspect ratio
 * reserved (no layout shift) and a blurred placeholder while it loads.
 *
 * RSCImage sizes the <img> with inline styles, so layout changes go through
 * its `imgStyle` (applied last) rather than through CSS classes.
 */
export function DatoImage({
  data,
  alt,
  sizes,
  priority = false,
  fill = false,
  focalPoint,
  maxHeight,
  className,
}: DatoImageProps) {
  let imgStyle: CSSProperties | undefined;
  if (fill) {
    imgStyle = {
      width: '100%',
      height: '100%',
      maxWidth: 'none',
      aspectRatio: 'auto',
      objectFit: 'cover',
      objectPosition: focalPoint
        ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
        : undefined,
    };
  } else if (maxHeight) {
    const ratio = data.aspectRatio ?? data.width / data.height;
    imgStyle = {
      width: `min(100%, calc(${maxHeight} * ${ratio.toFixed(4)}))`,
      marginInline: 'auto',
    };
  }

  return (
    <RSCImage
      data={{ ...data, alt: alt ?? data.alt ?? '' }}
      sizes={sizes}
      priority={priority}
      pictureClassName={
        className ? `${styles.picture} ${className}` : styles.picture
      }
      imgClassName={styles.img}
      imgStyle={imgStyle}
    />
  );
}
