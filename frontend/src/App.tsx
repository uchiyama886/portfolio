import { Hero } from './components/Hero'
import { Links } from './components/Links'
import { portfolio } from './data/portfolio'
import '../../design/tokens.css'
import '../../design/globals.css'

function App() {
  return (
    <main className="container">
      <Hero {...portfolio.hero} />
      <Links items={portfolio.links} />
    </main>
  )
}

export default App
