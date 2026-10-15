'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { primaryNav } from '@/config/navigation';
import { siteDefaults } from '@/config/site';
import styles from './HeaderNav.module.css';

const inlineItems = primaryNav.filter((item) => item.href !== '/contact');

function isCurrent(pathname: string, href: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === href || path.startsWith(`${href}/`);
}

/**
 * Desktop: inline links with Contact as the one emphasised action.
 * Below 1024 px: CV stays visible beside a Menu button that opens a modal
 * <dialog> (native focus trap, Escape to close, focus restored on close).
 */
export function HeaderNav() {
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
          {inlineItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={styles.contact}
              aria-current={current('/contact')}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.compact}>
        <Link href="/cv" className={styles.link} aria-current={current('/cv')}>
          CV
        </Link>
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
          Menu
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
            <span className={styles.dialogName}>{siteDefaults.name}</span>
            <button
              type="button"
              className={styles.menuButton}
              onClick={closeMenu}
            >
              Close
            </button>
          </div>
          <nav aria-label="Site">
            <ol role="list" className={styles.dialogList}>
              {primaryNav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
          <a
            href={`mailto:${siteDefaults.email}`}
            className={styles.dialogEmail}
          >
            {siteDefaults.email}
          </a>
        </div>
      </dialog>
    </>
  );
}
