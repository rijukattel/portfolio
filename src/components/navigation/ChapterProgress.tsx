'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ChapterProgress.module.css';

export type Chapter = { id: string; number: string; title: string };

/**
 * Story navigation for chaptered pages (PLAN §7.3): a slim reading-progress
 * line on every viewport plus a numbered chapter rail on wide screens.
 * Chapters are ordinary in-page links, so history and keyboard work as usual.
 */
export function ChapterProgress({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const chapter of chapters) {
      const section = document.getElementById(chapter.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [chapters]);

  // Browsers without scroll-driven animations get an rAF-throttled fallback.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || CSS.supports('animation-timeline: scroll()')) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty(
        '--progress',
        String(max > 0 ? window.scrollY / max : 0)
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <>
      <div className={styles.bar} aria-hidden="true">
        <span ref={barRef} />
      </div>
      <nav aria-label="Chapters" className={styles.rail}>
        <ol role="list" className={styles.list}>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className={styles.item}
                aria-current={active === chapter.id ? 'location' : undefined}
              >
                <span className={styles.number}>{chapter.number}</span>
                <span className={styles.tick} aria-hidden="true" />
                <span className={styles.title}>{chapter.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
