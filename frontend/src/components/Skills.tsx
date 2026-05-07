import { useState } from 'react'
import type { Skill, SkillLevel, Work } from '../data/portfolio'
import styles from './Skills.module.css'

const LEVEL_ORDER: SkillLevel[] = ['advanced', 'intermediate', 'beginner']

const LEVEL_LABELS: Record<SkillLevel, string> = {
  advanced: 'Advanced',
  intermediate: 'Intermediate',
  beginner: 'Beginner',
}

function groupByLevel(items: Skill[]): Record<SkillLevel, Skill[]> {
  const groups: Record<SkillLevel, Skill[]> = {
    advanced: [],
    intermediate: [],
    beginner: [],
  }
  for (const item of items) {
    groups[item.level].push(item)
  }
  return groups
}

function findRelatedWorks(skillName: string, works: Work[]): Work[] {
  const target = skillName.toLowerCase()
  return works.filter((w) =>
    w.stack?.some((tech) => tech.toLowerCase() === target),
  )
}

function RelatedWorkCard({ work }: { work: Work }) {
  const titleNode = work.url ? (
    <a
      href={work.url}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.relatedTitleLink}
    >
      {work.title}
      <span className={styles.relatedArrow} aria-hidden="true">
        ↗
      </span>
    </a>
  ) : (
    work.title
  )
  return (
    <li className={styles.relatedCard}>
      <p className={styles.relatedTitle}>{titleNode}</p>
      {work.period && <p className={styles.relatedMeta}>{work.period}</p>}
      <p className={styles.relatedDescription}>{work.description}</p>
    </li>
  )
}

export interface SkillsProps {
  items: Skill[]
  works: Work[]
}

export function Skills({ items, works }: SkillsProps) {
  const groups = groupByLevel(items)
  const [selected, setSelected] = useState<string | null>(null)

  const handleToggle = (name: string) => {
    setSelected((prev) => (prev === name ? null : name))
  }

  const relatedWorks = selected ? findRelatedWorks(selected, works) : []

  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.heading}>
        Skills
      </h2>
      <div className={styles.groups}>
        {LEVEL_ORDER.filter((level) => groups[level].length > 0).map(
          (level) => {
            const groupHasSelected = groups[level].some(
              (s) => s.name === selected,
            )
            return (
              <div key={level} className={styles.group}>
                <h3 className={styles.groupLabel}>{LEVEL_LABELS[level]}</h3>
                <ul className={styles.chipList}>
                  {groups[level].map((skill) => {
                    const isSelected = selected === skill.name
                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                          aria-pressed={isSelected}
                          onClick={() => handleToggle(skill.name)}
                        >
                          {skill.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                {groupHasSelected && selected && (
                  <div
                    className={styles.related}
                    role="region"
                    aria-live="polite"
                    aria-label={`${selected} に関連する Work`}
                  >
                    {relatedWorks.length > 0 ? (
                      <ul className={styles.relatedList}>
                        {relatedWorks.map((work, index) => (
                          <RelatedWorkCard
                            key={`${work.title}-${index}`}
                            work={work}
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.relatedEmpty}>
                        このスキルに紐づく Work はまだ登録されていません。
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}
