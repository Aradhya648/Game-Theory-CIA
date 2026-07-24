import CompanyBadge from './CompanyBadge';
import { solveStage1, label } from '../logic/stage1';
import { solveStage2, zLabel, cLabel } from '../logic/stage2';
import { defaultStage1, defaultStage2 } from '../data/defaultGame';

const STAGE1_NE = solveStage1(defaultStage1).nashEquilibria[0];
const STAGE2_SPE = solveStage2(defaultStage2);

export default function ResultsScreen({ stage1Result, stage2Result, onPlayAgain }) {
  const zoomEatsTotal = stage1Result.payoff.zoomEats + stage2Result.payoff.zoomEats;
  const campusCartTotal = stage1Result.payoff.campusCart + stage2Result.payoff.campusCart;
  const optimalTotal = STAGE1_NE.payoff.zoomEats + STAGE2_SPE.outcome.zoomEats;

  const stage1Optimal = stage1Result.playerMove === STAGE1_NE.col;
  const stage2Optimal = stage2Result.playerMove === STAGE2_SPE.path.zoomEatsMove;
  const optimalCount = (stage1Optimal ? 1 : 0) + (stage2Optimal ? 1 : 0);
  const perfect = optimalCount === 2;

  const badgeLabel = perfect ? 'Perfect Play' : optimalCount === 1 ? 'Solid Strategist' : 'Room to Grow';

  const sentences = [];
  if (perfect) {
    sentences.push(
      `You played it exactly like a game theorist would — ${zoomEatsTotal} points, the maximum possible.`
    );
  } else {
    if (!stage1Optimal) {
      const lost = STAGE1_NE.payoff.zoomEats - stage1Result.payoff.zoomEats;
      sentences.push(
        `${label(stage1Result.playerMove)} in Round 1 cost you ${lost} point${lost === 1 ? '' : 's'} — CampusCart was always going to discount there.`
      );
    }
    if (!stage2Optimal) {
      const lost = STAGE2_SPE.outcome.zoomEats - stage2Result.payoff.zoomEats;
      sentences.push(
        `${zLabel(stage2Result.playerMove)} in Round 2 cost you ${lost} points — CampusCart only backs off when you commit first.`
      );
    }
  }

  return (
    <div className="scene">
      {perfect && (
        <div className="celebration">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="confetti-dot" />
          ))}
        </div>
      )}

      <p className="scene__eyebrow">Final Scoreboard</p>
      <p className={`results-badge${perfect ? ' results-badge--perfect' : ''}`}>{badgeLabel}</p>

      <div className="final-scores">
        <div className="final-scores__side">
          <CompanyBadge company="zoomeats" size="lg" />
          <p className="final-scores__label">You</p>
          <p className="final-scores__value">{zoomEatsTotal}</p>
        </div>
        <div className="final-scores__vs">
          <span>of {optimalTotal} possible</span>
        </div>
        <div className="final-scores__side">
          <CompanyBadge company="campuscart" size="lg" />
          <p className="final-scores__label">CampusCart</p>
          <p className="final-scores__value">{campusCartTotal}</p>
        </div>
      </div>

      {sentences.map((s, i) => (
        <p className="scene__lede" key={i}>
          {s}
        </p>
      ))}

      <div className="recap-strip">
        <div className="recap-chip">
          <p className="recap-chip__round">Round 1</p>
          <p className="recap-chip__line">
            You: {label(stage1Result.playerMove)} → <strong>{stage1Result.payoff.zoomEats}</strong>
          </p>
          <p className="recap-chip__line">
            CampusCart: {label(stage1Result.cpuMove)} → <strong>{stage1Result.payoff.campusCart}</strong>
          </p>
        </div>
        <div className="recap-chip">
          <p className="recap-chip__round">Round 2</p>
          <p className="recap-chip__line">
            You: {zLabel(stage2Result.playerMove)} → <strong>{stage2Result.payoff.zoomEats}</strong>
          </p>
          <p className="recap-chip__line">
            CampusCart: {cLabel(stage2Result.cpuMove)} → <strong>{stage2Result.payoff.campusCart}</strong>
          </p>
        </div>
      </div>

      <button className="btn btn--primary" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}
