import type { CSSProperties } from 'react';
import { contourFields, type ContourField } from './contour-fields';
import styles from './Contours.module.css';

type ContoursProps = {
  field: ContourField;
  className?: string;
  /** Draw the lines in when they scroll into view (motion permitting). */
  draw?: boolean;
  /** "slow" for the closing scene, where the movement settles (PLAN §7.2 E). */
  pace?: 'normal' | 'slow';
};

/** Decorative topographic lines (PLAN §6.5). Always hidden from assistive tech. */
export function Contours({
  field,
  className,
  draw = false,
  pace = 'normal',
}: ContoursProps) {
  const { viewBox, lines } = contourFields[field];
  return (
    <svg
      className={
        className ? `${styles.contours} ${className}` : styles.contours
      }
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      data-reveal={draw ? '' : undefined}
      data-draw={draw ? '' : undefined}
      data-pace={draw && pace === 'slow' ? 'slow' : undefined}
    >
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          pathLength={1}
          className={line.index ? styles.index : undefined}
          style={{ '--level': line.level } as CSSProperties}
        />
      ))}
    </svg>
  );
}
