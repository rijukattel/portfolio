import type { CSSProperties } from 'react';
import type { ChartData } from '@/content/types';
import styles from './BarChart.module.css';

type BarChartProps = {
  data: ChartData;
  title: string;
  figureNumber: number;
  /** Header for the value column, read by screen readers. */
  valueLabel?: string;
  className?: string;
};

/**
 * Percentage bar chart built on a real <table>, so the data reads correctly
 * without the visuals (PLAN §7.2 C, §10). Labels and values render from the
 * first frame; only the bars grow in. The key finding is marked in text as
 * well as colour.
 */
export function BarChart({
  data,
  title,
  figureNumber,
  valueLabel = 'Share of respondents',
  className,
}: BarChartProps) {
  return (
    <figure
      className={className ? `${styles.figure} ${className}` : styles.figure}
      data-reveal=""
      data-chart=""
    >
      <table className={styles.table}>
        <caption className={styles.title}>
          <span className={styles.number}>Fig. {figureNumber}</span> {title}
        </caption>
        <thead className="visually-hidden">
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">{valueLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={row.label}
              className={row.highlight ? styles.highlight : undefined}
              style={{ '--value': row.value / 100, '--i': i } as CSSProperties}
            >
              <th scope="row" className={styles.label}>
                {row.label}
              </th>
              <td className={styles.cell}>
                <span className={styles.track} aria-hidden="true">
                  <span className={styles.bar} />
                </span>
                <span className={styles.value}>
                  {row.value}%
                  {row.highlight ? (
                    <span className={styles.flag}> · key finding</span>
                  ) : null}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className={styles.caption}>{data.caption}</figcaption>
    </figure>
  );
}
