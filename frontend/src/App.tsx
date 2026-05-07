import { Hero } from './components/Hero'
import { portfolio } from './data/portfolio'
import '../../design/tokens.css'
import '../../design/globals.css'

function App() {
  return (
    <main className="container">
      <Hero {...portfolio.hero} />
    </main>
  )
}

export default App
