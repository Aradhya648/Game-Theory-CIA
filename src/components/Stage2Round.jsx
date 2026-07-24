import { useEffect, useState } from 'react';
import ChoiceCard from './ChoiceCard';
import ThinkingIndicator from './ThinkingIndicator';
import RoundReveal from './RoundReveal';
import { solveStage2, zLabel, cLabel } from '../logic/stage2';
import { defaultStage2 } from '../data/defaultGame';

const CAMPUSCART_RESPONSE = solveStage2(defaultStage2).campusCartChoice;

const EXPLANATIONS = {
  'commit-discount':
    'You committed to free delivery, and CampusCart discounted right back at you — a costly standoff for both sides.',
  'commit-standard':
    "You went all-in on free delivery. CampusCart didn't want a two-front price war — they held their price and let you own the discount lane.",
  'standard-discount':
    'You played it safe with standard pricing — CampusCart pounced with a discount and grabbed the price-sensitive crowd.',
  'standard-standard':
    'Neither side moved. A quiet week, modest margins for both.',
};

const REACTIONS = {
  'commit-discount': "You went big, so we went low. Let's see who blinks first.",
  'commit-standard': "Free delivery, huh? We'll hold our price — no need to match a costly stunt.",
  'standard-discount': "You played it safe. We didn't have to.",
  'standard-standard': 'Quiet week. I\'ll take it.',
};

export default function Stage2Round({ onComplete }) {
  const [phase, setPhase] = useState('choosing'); // 'choosing' | 'locked' | 'thinking' | 'revealed'
  const [playerMove, setPlayerMove] = useState(null);

  useEffect(() => {
    if (phase === 'locked') {
      const t = setTimeout(() => setPhase('thinking'), 500);
      return () => clearTimeout(t);
    }
    if (phase === 'thinking') {
      const t = setTimeout(() => setPhase('revealed'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function pick(move) {
    setPlayerMove(move);
    setPhase('locked');
  }

  if (phase === 'choosing' || phase === 'locked') {
    return (
      <div className="scene">
        <p className="scene__eyebrow">Round 2 — The Commitment Play</p>
        <h2 className="scene__title scene__title--sm">Your move, first</h2>
        <p className="scene__lede">
          This time you move first — and CampusCart gets to see it before they respond. Go big,
          or stay steady?
        </p>
        <div className="choice-grid">
          <ChoiceCard
            title="Commit to Free Delivery"
            hint="Bold, semester-long move"
            state={phase === 'locked' ? (playerMove === 'commit' ? 'selected' : 'dimmed') : 'idle'}
            onClick={() => pick('commit')}
          />
          <ChoiceCard
            title="Launch at Standard Pricing"
            hint="Play it safe, hold position"
            state={phase === 'locked' ? (playerMove === 'standard' ? 'selected' : 'dimmed') : 'idle'}
            onClick={() => pick('standard')}
          />
        </div>
      </div>
    );
  }

  if (phase === 'thinking') {
    return (
      <div className="scene">
        <ThinkingIndicator text="CampusCart saw your move. Deciding how to respond" />
      </div>
    );
  }

  const cpuMove = CAMPUSCART_RESPONSE[playerMove];
  const payoff = defaultStage2[playerMove][cpuMove];
  const key = `${playerMove}-${cpuMove}`;

  return (
    <div className="scene">
      <p className="scene__eyebrow">Round 2 result</p>
      <RoundReveal
        playerChoice={zLabel(playerMove)}
        cpuChoice={cLabel(cpuMove)}
        playerPayoff={payoff.zoomEats}
        cpuPayoff={payoff.campusCart}
        explanation={EXPLANATIONS[key]}
        cpuReaction={REACTIONS[key]}
        continueLabel="See Final Scoreboard"
        onContinue={() =>
          onComplete({
            playerMove,
            cpuMove,
            payoff: { zoomEats: payoff.zoomEats, campusCart: payoff.campusCart },
          })
        }
      />
    </div>
  );
}
