import type { Skill } from '../data/portfolio'
import styles from './Skills.module.css'

const CATEGORY_ORDER = ['language', 'tool', 'os', 'other'] as const
type CategoryKey = (typeof CATEGORY_ORDER)[number]

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  language: 'Languages',
  tool: 'Tools',
  os: 'OS',
  other: 'Others',
}

function groupByCategory(items: Skill[]): Record<CategoryKey, Skill[]> {
  const groups: Record<CategoryKey, Skill[]> = {
    language: [],
    tool: [],
    os: [],
    other: [],
  }
  for (const item of items) {
    const key = (item.category ?? 'other') as CategoryKey
    if (key in groups) {
      groups[key].push(item)
    } else {
      groups.other.push(item)
    }
  }
  return groups
}

export interface SkillsProps {
  items: Skill[]
}

export function Skills({ items }: SkillsProps) {
  const groups = groupByCategory(items)
  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.heading}>
        Skills
      </h2>
      <div className={styles.groups}>
        {CATEGORY_ORDER.filter((key) => groups[key].length > 0).map((key) => (
          <div key={key} className={styles.group}>
            <h3 className={styles.groupLabel}>{CATEGORY_LABELS[key]}</h3>
            <ul className={styles.chipList}>
              {groups[key].map((skill) => (
                <li key={skill.name} className={styles.chip}>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
