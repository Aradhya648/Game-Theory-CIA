import { useState } from 'react'
import './App.css'
import IntroScreen from './components/IntroScreen'
import ScoreHeader from './components/ScoreHeader'

function App() {
  const [screen, setScreen] = useState('intro') // 'intro' | 'stage1' | 'stage2' | 'results'
  const [stage1Result, setStage1Result] = useState(null)
  const [stage2Result, setStage2Result] = useState(null)

  const zoomEatsScore = (stage1Result?.payoff.zoomEats || 0) + (stage2Result?.payoff.zoomEats || 0)
  const campusCartScore = (stage1Result?.payoff.campusCart || 0) + (stage2Result?.payoff.campusCart || 0)
  const roundsComplete = (stage1Result ? 1 : 0) + (stage2Result ? 1 : 0)
  const round = screen === 'stage1' ? 1 : screen === 'stage2' ? 2 : screen === 'results' ? 2 : 0

  function playAgain() {
    setStage1Result(null)
    setStage2Result(null)
    setScreen('stage1')
  }

  return (
    <div className="game-shell">
      <div className="game-frame">
        {screen !== 'intro' && (
          <ScoreHeader
            zoomEatsScore={zoomEatsScore}
            campusCartScore={campusCartScore}
            round={round}
            roundsComplete={roundsComplete}
          />
        )}

        {screen === 'intro' && <IntroScreen onStart={() => setScreen('stage1')} />}

        {screen === 'stage1' && (
          <div className="scene">
            <p>Round 1 placeholder — built in the next step.</p>
            <button
              className="btn btn--primary"
              onClick={() => {
                setStage1Result({ payoff: { zoomEats: 3, campusCart: 3 } })
                setScreen('stage2')
              }}
            >
              Simulate Round 1
            </button>
          </div>
        )}

        {screen === 'stage2' && (
          <div className="scene">
            <p>Round 2 placeholder — built in the next step.</p>
            <button
              className="btn btn--primary"
              onClick={() => {
                setStage2Result({ payoff: { zoomEats: 9, campusCart: 4 } })
                setScreen('results')
              }}
            >
              Simulate Round 2
            </button>
          </div>
        )}

        {screen === 'results' && (
          <div className="scene">
            <p>Results placeholder — built in a later step.</p>
            <button className="btn btn--primary" onClick={playAgain}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
