import { Fragment, useMemo } from 'react';
import Section from './Section';
import NumberField from './NumberField';
import { solveStage1, label } from '../logic/stage1';
import { PLAYERS } from '../data/defaultGame';

const ROWS = ['discount', 'standard'];
const COLS = ['discount', 'standard'];

function updateCell(matrix, row, col, field, value) {
  return {
    ...matrix,
    [row]: {
      ...matrix[row],
      [col]: {
        ...matrix[row][col],
        [field]: value,
      },
    },
  };
}

export default function Stage1Matrix({ matrix, onChange }) {
  const result = useMemo(() => solveStage1(matrix), [matrix]);

  const isEquilibrium = (row, col) =>
    result.nashEquilibria.some((ne) => ne.row === row && ne.col === col);

  return (
    <Section
      eyebrow="02 — Stage 1"
      title="Simultaneous Game"
      subtitle="Both players choose Discount or Standard pricing at the same time, without observing the other's move."
    >
      <div className="matrix-wrap">
        <div className="matrix">
          <div className="matrix__corner" />
          {COLS.map((col) => (
            <div className="matrix__col-head" key={col}>
              {PLAYERS.zoomEats}: {label(col)}
            </div>
          ))}

          {ROWS.map((row) => (
            <Fragment key={row}>
              <div className="matrix__row-head">
                {PLAYERS.campusCart}: {label(row)}
              </div>
              {COLS.map((col) => {
                const cell = matrix[row][col];
                const eq = isEquilibrium(row, col);
                const isLastCol = col === COLS[COLS.length - 1];
                return (
                  <div
                    className={`matrix__cell${eq ? ' matrix__cell--eq' : ''}${isLastCol ? ' matrix__cell--last' : ''}`}
                    key={`${row}-${col}`}
                  >
                    {eq && <span className="matrix__badge">✓ Nash Equilibrium</span>}
                    <div className="matrix__payoffs">
                      <NumberField
                        label="CampusCart"
                        value={cell.campusCart}
                        onChange={(v) => onChange(updateCell(matrix, row, col, 'campusCart', v))}
                      />
                      <NumberField
                        label="ZoomEats"
                        value={cell.zoomEats}
                        onChange={(v) => onChange(updateCell(matrix, row, col, 'zoomEats', v))}
                      />
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>

        <div className="working-panel">
          <h3>Working</h3>
          <ul className="working-list">
            {result.working.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          <h3>Dominant strategies</h3>
          <ul className="working-list">
            <li>
              {PLAYERS.campusCart}:{' '}
              {result.campusCartDominant
                ? `${label(result.campusCartDominant)} dominates`
                : 'no dominant strategy'}
            </li>
            <li>
              {PLAYERS.zoomEats}:{' '}
              {result.zoomEatsDominant
                ? `${label(result.zoomEatsDominant)} dominates`
                : 'no dominant strategy'}
            </li>
          </ul>

          <h3>Nash Equilibrium</h3>
          <ul className="working-list">
            {result.nashEquilibria.length === 0 && <li>No pure-strategy Nash Equilibrium.</li>}
            {result.nashEquilibria.map((ne, i) => (
              <li key={i}>
                ({PLAYERS.campusCart}: {label(ne.row)}, {PLAYERS.zoomEats}: {label(ne.col)}) →
                payoff ({ne.payoff.campusCart}, {ne.payoff.zoomEats})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
