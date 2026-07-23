import Section from './Section';
import { JUSTIFICATION_HINT, STAGE1_STRATEGIES, STAGE2_CAMPUSCART_MOVES, STAGE2_ZOOMEATS_MOVES } from '../data/defaultGame';

export default function GameSpecification({ justification, onJustificationChange }) {
  return (
    <Section
      eyebrow="01 — Specification"
      title="Game Specification"
      subtitle="Two campus food-delivery startups, one simultaneous pricing decision and one sequential commitment decision."
    >
      <div className="spec-grid">
        <div className="spec-block">
          <h3>Players</h3>
          <ul className="spec-list">
            <li><strong>CampusCart</strong> — student-run delivery startup, responds/moves second in Stage 2</li>
            <li><strong>ZoomEats</strong> — student-run delivery startup, moves first in Stage 2</li>
          </ul>
        </div>

        <div className="spec-block">
          <h3>Stage 1 strategies (simultaneous)</h3>
          <p className="spec-note">Both players choose independently, at the same time:</p>
          <ul className="spec-list">
            {STAGE1_STRATEGIES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="spec-block">
          <h3>Stage 2 strategies (sequential)</h3>
          <p className="spec-note">ZoomEats moves first:</p>
          <ul className="spec-list">
            {STAGE2_ZOOMEATS_MOVES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="spec-note">CampusCart observes, then responds:</p>
          <ul className="spec-list">
            {STAGE2_CAMPUSCART_MOVES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="spec-justification">
        <h3>Payoff justification</h3>
        <p className="spec-note">{JUSTIFICATION_HINT}</p>
        <textarea
          className="text-editor"
          rows={6}
          placeholder="Write your justification here…"
          value={justification}
          onChange={(e) => onJustificationChange(e.target.value)}
        />
      </div>
    </Section>
  );
}
