import { useEffect, useState } from 'react';
import CompanyBadge from './CompanyBadge';

function PayoffCard({ company, name, choice, payoff, maxPayoff, isWinner, animate }) {
  const pct = maxPayoff > 0 ? Math.max(4, (payoff / maxPayoff) * 100) : 4;
  return (
    <div className={`payoff-card payoff-card--${company}`}>
      <div className="payoff-card__head">
        <CompanyBadge company={company} size="md" />
        {isWinner && <span className="payoff-card__star">★</span>}
      </div>
      <p className="payoff-card__name">{name}</p>
      <p className="payoff-card__choice">{choice}</p>
      <p className="payoff-card__value">{payoff}</p>
      <div className="payoff-bar">
        <div className="payoff-bar__fill" style={{ width: animate ? `${pct}%` : '0%' }} />
      </div>
    </div>
  );
}

export default function RoundReveal({
  playerChoice,
  cpuChoice,
  playerPayoff,
  cpuPayoff,
  explanation,
  cpuReaction,
  onContinue,
  continueLabel = 'Continue',
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  const maxPayoff = Math.max(playerPayoff, cpuPayoff, 1);

  return (
    <div className="reveal">
      <div className={`reveal__cards${animate ? ' reveal__cards--in' : ''}`}>
        <PayoffCard
          company="zoomeats"
          name="You"
          choice={playerChoice}
          payoff={playerPayoff}
          maxPayoff={maxPayoff}
          isWinner={playerPayoff > cpuPayoff}
          animate={animate}
        />
        <PayoffCard
          company="campuscart"
          name="CampusCart"
          choice={cpuChoice}
          payoff={cpuPayoff}
          maxPayoff={maxPayoff}
          isWinner={cpuPayoff > playerPayoff}
          animate={animate}
        />
      </div>

      {cpuReaction && <p className="reveal__quote">"{cpuReaction}" — CampusCart</p>}
      <p className="reveal__explain">{explanation}</p>

      <button className="btn btn--primary" onClick={onContinue}>
        {continueLabel}
      </button>
    </div>
  );
}
