import { useMemo } from 'react';
import Section from './Section';
import { solveStage1 } from '../logic/stage1';
import { solveStage2 } from '../logic/stage2';
import { PLAYERS } from '../data/defaultGame';

export default function ComparisonPanel({ stage1, stage2 }) {
  const s1 = useMemo(() => solveStage1(stage1), [stage1]);
  const s2 = useMemo(() => solveStage2(stage2), [stage2]);

  const hasNE = s1.nashEquilibria.length > 0;
  const stage1Payoff = hasNE ? s1.nashEquilibria[0].payoff.zoomEats : null;
  const stage2Payoff = s2.outcome.zoomEats;

  let statement;
  if (!hasNE) {
    statement = 'Stage 1 has no pure-strategy Nash Equilibrium, so a direct payoff comparison isn\'t defined — edit the matrix until an equilibrium emerges.';
  } else if (stage2Payoff > stage1Payoff) {
    statement = `${PLAYERS.zoomEats}'s payoff rises from ${stage1Payoff} to ${stage2Payoff} by committing — the first-mover commitment is worth ${stage2Payoff - stage1Payoff}.`;
  } else if (stage2Payoff < stage1Payoff) {
    statement = `${PLAYERS.zoomEats}'s payoff falls from ${stage1Payoff} to ${stage2Payoff} by committing — moving first actually costs ${stage1Payoff - stage2Payoff} here.`;
  } else {
    statement = `${PLAYERS.zoomEats}'s payoff is unchanged at ${stage1Payoff} — committing first makes no difference with these payoffs.`;
  }

  return (
    <Section
      eyebrow="04 — Comparison"
      title="Stage 1 vs Stage 2"
      subtitle="Does moving first and committing actually help ZoomEats?"
    >
      <div className="compare-grid">
        <div className="compare-stat">
          <p className="compare-stat__label">Stage 1 — Nash Equilibrium</p>
          <p className="compare-stat__value">{hasNE ? stage1Payoff : '—'}</p>
          <p className="compare-stat__sub">{PLAYERS.zoomEats}'s payoff, simultaneous play</p>
        </div>
        <div className="compare-arrow">→</div>
        <div className="compare-stat">
          <p className="compare-stat__label">Stage 2 — Subgame Perfect Equilibrium</p>
          <p className="compare-stat__value">{stage2Payoff}</p>
          <p className="compare-stat__sub">{PLAYERS.zoomEats}'s payoff, after committing first</p>
        </div>
      </div>

      <p className="compare-statement">{statement}</p>
    </Section>
  );
}
