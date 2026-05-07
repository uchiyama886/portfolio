import type { About as AboutData } from '../data/portfolio'
import styles from './About.module.css'

export function About({ affiliation, paragraphs }: AboutData) {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.heading}>
        About
      </h2>
      <p className={styles.affiliation}>{affiliation}</p>
      <div className={styles.body}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
