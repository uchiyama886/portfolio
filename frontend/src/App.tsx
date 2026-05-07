import { About } from './components/About'
import { Career } from './components/Career'
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
      <Skills items={portfolio.skills} works={portfolio.works} />
      <Works items={portfolio.works} />
      <Career items={portfolio.career} />
    </main>
  )
}

export default App
