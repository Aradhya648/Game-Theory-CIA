import './App.css'
import { usePersistentState } from './hooks/usePersistentState'
import { DEFAULT_JUSTIFICATION } from './data/defaultGame'
import GameSpecification from './components/GameSpecification'

function App() {
  const [justification, setJustification] = usePersistentState('justification', DEFAULT_JUSTIFICATION)

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-header__eyebrow">CIA 1A.2 — Design-Your-Own Two-Stage Game</p>
        <h1 className="app-header__title">Two-Stage Game: Campus Food Delivery Pricing War</h1>
        <p className="app-header__subtitle">
          ZoomEats and CampusCart, two student-run campus delivery startups, face a simultaneous
          pricing decision in Stage 1 and a sequential commitment decision in Stage 2. All payoffs
          below are editable and every equilibrium re-solves live.
        </p>
      </header>

      <GameSpecification justification={justification} onJustificationChange={setJustification} />
    </div>
  )
}

export default App
