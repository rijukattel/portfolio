'use client';

import styles from './PrintButton.module.css';

/** Opens the browser's print dialog, where "Save as PDF" is available. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
