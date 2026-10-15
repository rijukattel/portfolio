import { Reveal } from '@/components/motion/Reveal';
import type { ExperienceEntry } from '@/content/types';
import styles from './ExperienceTimeline.module.css';

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
  headingLevel?: 'h2' | 'h3';
  className?: string;
};

/**
 * Field notes on a hairline timeline (PLAN §7.2 B). Each note reveals in
 * sequence; with motion off they are simply there.
 */
export function ExperienceTimeline({
  entries,
  headingLevel: Heading = 'h3',
  className,
}: ExperienceTimelineProps) {
  return (
    <ol
      role="list"
      className={className ? `${styles.notes} ${className}` : styles.notes}
    >
      {entries.map((entry, i) => (
        <Reveal
          as="li"
          key={`${entry.organisation}-${entry.role}`}
          index={i}
          className={styles.note}
        >
          <p className={styles.meta}>
            <span>{entry.period}</span>
            <span>{entry.location}</span>
          </p>
          <Heading className={styles.role}>{entry.role}</Heading>
          <p className={styles.organisation}>{entry.organisation}</p>
          <ul className={styles.points}>
            {entry.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}
