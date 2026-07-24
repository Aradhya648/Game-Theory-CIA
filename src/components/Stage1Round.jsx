import { useEffect, useState } from 'react';
import ChoiceCard from './ChoiceCard';
import ThinkingIndicator from './ThinkingIndicator';
import RoundReveal from './RoundReveal';
import { solveStage1, label } from '../logic/stage1';
import { defaultStage1 } from '../data/defaultGame';

const CPU_MOVE = (() => {
  const result = solveStage1(defaultStage1);
  return result.campusCartDominant || result.nashEquilibria[0]?.row || 'discount';
})();

const EXPLANATIONS = {
  'discount-discount':
    "CampusCart discounted too — you're both fighting for the same students, and margins take the hit.",
  'discount-standard':
    'CampusCart held its price while you discounted — you undercut them and grabbed the bulk of the orders.',
  'standard-discount':
    'CampusCart discounted while you held steady — they picked off your price-sensitive customers.',
  'standard-standard':
    "Neither of you blinked — prices stayed high and you both kept your margins intact.",
};

const REACTIONS = {
  'discount-discount': 'Everyone is discounting this week. Just business.',
  'discount-standard': "Ouch. We held at standard pricing — didn't see that coming.",
  'standard-discount': 'Thanks for staying at standard price. Made our discount hit harder.',
  'standard-standard': "Nobody blinked first. I can respect that.",
};

export default function Stage1Round({ onComplete }) {
  const [phase, setPhase] = useState('choosing'); // 'choosing' | 'locked' | 'thinking' | 'revealed'
  const [playerMove, setPlayerMove] = useState(null);

  useEffect(() => {
    if (phase === 'locked') {
      const t = setTimeout(() => setPhase('thinking'), 500);
      return () => clearTimeout(t);
    }
    if (phase === 'thinking') {
      const t = setTimeout(() => setPhase('revealed'), 1100);
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
        <p className="scene__eyebrow">Round 1 — The Pricing Standoff</p>
        <h2 className="scene__title scene__title--sm">Simultaneous move</h2>
        <p className="scene__lede">
          Finals week is coming — every dorm is ordering delivery. Do you cut prices to grab
          share, or hold your margins? CampusCart is choosing at the exact same time.
        </p>
        <div className="choice-grid">
          <ChoiceCard
            title="Discount Pricing"
            hint="Cut prices, chase market share"
            state={phase === 'locked' ? (playerMove === 'discount' ? 'selected' : 'dimmed') : 'idle'}
            onClick={() => pick('discount')}
          />
          <ChoiceCard
            title="Standard Pricing"
            hint="Hold your margins steady"
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
        <ThinkingIndicator text="CampusCart is setting its price" />
      </div>
    );
  }

  const payoff = defaultStage1[CPU_MOVE][playerMove];
  const key = `${playerMove}-${CPU_MOVE}`;

  return (
    <div className="scene">
      <p className="scene__eyebrow">Round 1 result</p>
      <RoundReveal
        playerChoice={label(playerMove)}
        cpuChoice={label(CPU_MOVE)}
        playerPayoff={payoff.zoomEats}
        cpuPayoff={payoff.campusCart}
        explanation={EXPLANATIONS[key]}
        cpuReaction={REACTIONS[key]}
        continueLabel="Continue to Round 2"
        onContinue={() =>
          onComplete({
            playerMove,
            cpuMove: CPU_MOVE,
            payoff: { zoomEats: payoff.zoomEats, campusCart: payoff.campusCart },
          })
        }
      />
    </div>
  );
}
