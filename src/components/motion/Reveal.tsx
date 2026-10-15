import type { CSSProperties, HTMLAttributes } from 'react';

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article' | 'figure' | 'li' | 'p' | 'header';
  /** Position in a staggered group (0–4); each step adds --stagger. */
  index?: number;
};

/**
 * Fades and lifts its content in when scrolled into view (PLAN §7.2 B).
 * Content is visible by default; never wrap the hero headline or other
 * likely LCP elements.
 */
export function Reveal({
  as: Tag = 'div',
  index = 0,
  style,
  ...rest
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      style={
        { '--reveal-index': Math.min(index, 4), ...style } as CSSProperties
      }
      {...rest}
    />
  );
}
