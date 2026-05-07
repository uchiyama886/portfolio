import { About } from './components/About'
import { Hero } from './components/Hero'
import { Links } from './components/Links'
import { Skills } from './components/Skills'
import { Works } from './components/Works'
import { portfolio } from './data/portfolio'
import '../../design/tokens.css'
import '../../design/globals.css'

function App() {
  return (
    <main className="container">
      <Hero {...portfolio.hero} />
      <Links items={portfolio.links} />
      <About {...portfolio.about} />
      <Skills items={portfolio.skills} />
      <Works items={portfolio.works} />
    </main>
  )
}

export default App
