import type { Work, WorkCategory } from '../data/portfolio'
import styles from './Works.module.css'

const CATEGORY_ORDER: WorkCategory[] = ['team', 'hackathon', 'personal']

const CATEGORY_LABELS: Record<WorkCategory, string> = {
  team: 'Team Projects',
  hackathon: 'Hackathons',
  personal: 'Personal',
}

function groupByCategory(items: Work[]): Record<WorkCategory, Work[]> {
  const groups: Record<WorkCategory, Work[]> = {
    team: [],
    hackathon: [],
    personal: [],
  }
  for (const item of items) {
    groups[item.category].push(item)
  }
  return groups
}

function WorkCard({ work }: { work: Work }) {
  const titleNode = work.url ? (
    <a
      href={work.url}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.titleLink}
    >
      {work.title}
      <span className={styles.externalArrow} aria-hidden="true">
        ↗
      </span>
    </a>
  ) : (
    work.title
  )

  return (
    <li className={styles.card}>
      <h4 className={styles.title}>{titleNode}</h4>
      {work.period && <p className={styles.period}>{work.period}</p>}
      <p className={styles.description}>{work.description}</p>
      {work.stack && work.stack.length > 0 && (
        <ul className={styles.stackList}>
          {work.stack.map((tech) => (
            <li key={tech} className={styles.stackChip}>
              {tech}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export interface WorksProps {
  items: Work[]
}

export function Works({ items }: WorksProps) {
  const groups = groupByCategory(items)
  return (
    <section className={styles.section} aria-labelledby="works-heading">
      <h2 id="works-heading" className={styles.heading}>
        Works
      </h2>
      <div className={styles.groups}>
        {CATEGORY_ORDER.filter((key) => groups[key].length > 0).map((key) => (
          <div key={key} className={styles.group}>
            <h3 className={styles.groupLabel}>{CATEGORY_LABELS[key]}</h3>
            <ul className={styles.cardList}>
              {groups[key].map((work, index) => (
                <WorkCard key={`${work.title}-${index}`} work={work} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
