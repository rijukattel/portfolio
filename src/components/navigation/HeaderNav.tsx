'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '@/lib/datocms/types';
import styles from './HeaderNav.module.css';

function isCurrent(pathname: string, href: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === href || path.startsWith(`${href}/`);
}

type HeaderNavProps = {
  name: string;
  email: string;
  items: NavItem[];
  labels: { menu: string; close: string };
};

/**
 * Desktop: inline links, with any "Show as button" item emphasised.
 * Below 1024 px: "Keep visible" items stay beside a Menu button that opens
 * a modal <dialog> (native focus trap, Escape to close, focus restored).
 * Items, their order and flags come from DatoCMS Site settings.
 */
export function HeaderNav({ name, email, items, labels }: HeaderNavProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const current = (href: string) =>
    isCurrent(pathname, href) ? ('page' as const) : undefined;
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <nav aria-label="Primary" className={styles.desktop}>
        <ul role="list" className={styles.list}>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href as Route}
                className={item.highlight ? styles.contact : styles.link}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.compact}>
        {items
          .filter((item) => item.pinned)
          .map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className={styles.link}
              aria-current={current(item.href)}
            >
              {item.label}
            </Link>
          ))}
        <button
          type="button"
          className={styles.menuButton}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => {
            dialogRef.current?.showModal();
            setMenuOpen(true);
          }}
        >
          {labels.menu}
        </button>
      </div>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Site menu"
        onClose={() => setMenuOpen(false)}
      >
        <div className={styles.dialogInner}>
          <div className={styles.dialogTop}>
            <span className={styles.dialogName}>{name}</span>
            <button
              type="button"
              className={styles.menuButton}
              onClick={closeMenu}
            >
              {labels.close}
            </button>
          </div>
          <nav aria-label="Site">
            <ol role="list" className={styles.dialogList}>
              {items.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href as Route}
                    className={styles.dialogLink}
                    aria-current={current(item.href)}
                    onClick={closeMenu}
                  >
                    <span className={styles.dialogNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <a href={`mailto:${email}`} className={styles.dialogEmail}>
            {email}
          </a>
        </div>
      </dialog>
    </>
  );
}
