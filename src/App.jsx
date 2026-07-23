import './App.css'
import { usePersistentState } from './hooks/usePersistentState'
import { COMMENTARY_PROMPTS, DEFAULT_JUSTIFICATION, defaultStage1, defaultStage2 } from './data/defaultGame'
import GameSpecification from './components/GameSpecification'
import Stage1Matrix from './components/Stage1Matrix'
import Stage2Tree from './components/Stage2Tree'
import ComparisonPanel from './components/ComparisonPanel'
import Commentary from './components/Commentary'

function App() {
  const [justification, setJustification] = usePersistentState('justification', DEFAULT_JUSTIFICATION)
  const [stage1, setStage1] = usePersistentState('stage1', defaultStage1)
  const [stage2, setStage2] = usePersistentState('stage2', defaultStage2)
  const [commentary, setCommentary] = usePersistentState('commentary', COMMENTARY_PROMPTS)

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
      <Stage1Matrix matrix={stage1} onChange={setStage1} />
      <Stage2Tree tree={stage2} onChange={setStage2} />
      <ComparisonPanel stage1={stage1} stage2={stage2} />
      <Commentary text={commentary} onChange={setCommentary} />
    </div>
  )
}

export default App
