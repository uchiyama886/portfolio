import type { Hero as HeroData } from '../data/portfolio'
import styles from './Hero.module.css'

export function Hero({ name, catchphrase, iconSrc }: HeroData) {
  return (
    <section className={`${styles.section} ${iconSrc ? '' : styles.iconless}`}>
      {iconSrc && (
        <img src={iconSrc} alt={name} className={styles.icon} width={96} height={96} />
      )}
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.catchphrase}>{catchphrase}</p>
    </section>
  )
}
