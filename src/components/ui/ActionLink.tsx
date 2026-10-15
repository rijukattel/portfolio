import type { Route } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ActionLink.module.css';

type ActionLinkProps = {
  href: Route | `mailto:${string}`;
  /** One primary action per scene (PLAN §6.1); everything else is quiet. */
  variant?: 'primary' | 'quiet';
  children: ReactNode;
  className?: string;
};

export function ActionLink({
  href,
  variant = 'primary',
  children,
  className,
}: ActionLinkProps) {
  const classes = [styles.action, styles[variant], className]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  return href.startsWith('mailto:') ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href as Route} className={classes}>
      {content}
    </Link>
  );
}
