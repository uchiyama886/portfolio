import type { CareerEntry } from '../data/portfolio'
import styles from './Career.module.css'

function CareerItem({ entry }: { entry: CareerEntry }) {
  const companyNode = entry.url ? (
    <a
      href={entry.url}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.companyLink}
    >
      {entry.company}
      <span className={styles.externalArrow} aria-hidden="true">
        ↗
      </span>
    </a>
  ) : (
    entry.company
  )

  return (
    <li className={styles.entry}>
      <h3 className={styles.company}>{companyNode}</h3>
      <p className={styles.meta}>
        <span>{entry.role}</span>
        <span className={styles.metaSeparator} aria-hidden="true">
          ·
        </span>
        <span className={styles.metaPeriod}>{entry.period}</span>
      </p>
      <p className={styles.description}>{entry.description}</p>
    </li>
  )
}

export interface CareerProps {
  items: CareerEntry[]
}

export function Career({ items }: CareerProps) {
  return (
    <section className={styles.section} aria-labelledby="career-heading">
      <h2 id="career-heading" className={styles.heading}>
        Career
      </h2>
      <ul className={styles.list}>
        {items.map((entry, index) => (
          <CareerItem key={`${entry.company}-${index}`} entry={entry} />
        ))}
      </ul>
    </section>
  )
}
