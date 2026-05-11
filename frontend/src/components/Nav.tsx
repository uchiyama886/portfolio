import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Works', href: '#works' },
  { label: 'Career', href: '#career' },
]

export interface NavProps {
  name: string
}

export function Nav({ name }: NavProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          {name}
        </a>
        <nav aria-label="ページ内ナビゲーション">
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className={styles.lang}>JA</span>
      </div>
    </header>
  )
}
