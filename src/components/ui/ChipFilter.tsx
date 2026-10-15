import styles from './ChipFilter.module.css';

type ChipOption = { value: string; label: string; count?: number };

type ChipFilterProps = {
  legend: string;
  /** Radio group name, unique on the page. */
  name: string;
  /** Inputs get ids `${idPrefix}-all` and `${idPrefix}-${value}`. */
  idPrefix: string;
  allLabel: string;
  allCount?: number;
  options: ChipOption[];
};

/**
 * A radio group styled as chips. The page hides and shows items with CSS
 * :has() rules keyed on these ids, so filtering needs no JavaScript and
 * the arrow keys move between options.
 */
export function ChipFilter({
  legend,
  name,
  idPrefix,
  allLabel,
  allCount,
  options,
}: ChipFilterProps) {
  const chip = (value: string, label: string, count?: number, all = false) => (
    <span key={value} className={styles.group}>
      <input
        type="radio"
        name={name}
        id={`${idPrefix}-${value}`}
        value={value}
        className={styles.radio}
        defaultChecked={all}
      />
      <label htmlFor={`${idPrefix}-${value}`} className={styles.chip}>
        {label}
        {count !== undefined ? <span>{count}</span> : null}
      </label>
    </span>
  );

  return (
    <fieldset className={styles.fieldset}>
      <legend className="caption">{legend}</legend>
      <div className={styles.options}>
        {chip('all', allLabel, allCount, true)}
        {options.map((option) =>
          chip(option.value, option.label, option.count)
        )}
      </div>
    </fieldset>
  );
}
