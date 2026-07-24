import { useState } from 'react'
import './App.css'
import IntroScreen from './components/IntroScreen'
import ScoreHeader from './components/ScoreHeader'
import Stage1Round from './components/Stage1Round'
import Stage2Round from './components/Stage2Round'
import ResultsScreen from './components/ResultsScreen'

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
          <Stage1Round
            onComplete={(result) => {
              setStage1Result(result)
              setScreen('stage2')
            }}
          />
        )}

        {screen === 'stage2' && (
          <Stage2Round
            onComplete={(result) => {
              setStage2Result(result)
              setScreen('results')
            }}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen stage1Result={stage1Result} stage2Result={stage2Result} onPlayAgain={playAgain} />
        )}
      </div>
    </div>
  )
}

export default App
