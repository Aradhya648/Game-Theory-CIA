import { useLayoutEffect, useRef, useState } from 'react';
import Section from './Section';
import NumberField from './NumberField';
import { solveStage2, zLabel, cLabel } from '../logic/stage2';
import { PLAYERS } from '../data/defaultGame';

const BRANCHES = ['commit', 'standard'];
const CHOICES = ['discount', 'standard'];

function updateLeaf(tree, branch, choice, field, value) {
  return {
    ...tree,
    [branch]: {
      ...tree[branch],
      [choice]: {
        ...tree[branch][choice],
        [field]: value,
      },
    },
  };
}

function centerBottom(el, containerRect) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 - containerRect.left, y: r.bottom - containerRect.top };
}

function centerTop(el, containerRect) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 - containerRect.left, y: r.top - containerRect.top };
}

export default function Stage2Tree({ tree, onChange }) {
  const result = solveStage2(tree);

  const containerRef = useRef(null);
  const rootRef = useRef(null);
  const nodeRefs = { commit: useRef(null), standard: useRef(null) };
  const leafRefs = {
    commit: { discount: useRef(null), standard: useRef(null) },
    standard: { discount: useRef(null), standard: useRef(null) },
  };

  const [lines, setLines] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      const next = [];

      BRANCHES.forEach((branch) => {
        const from = centerBottom(rootRef.current, rect);
        const to = centerTop(nodeRefs[branch].current, rect);
        next.push({
          key: `root-${branch}`,
          x1: from.x,
          y1: from.y,
          x2: to.x,
          y2: to.y,
          highlighted: result.path.zoomEatsMove === branch,
        });

        CHOICES.forEach((choice) => {
          const leafFrom = centerBottom(nodeRefs[branch].current, rect);
          const leafTo = centerTop(leafRefs[branch][choice].current, rect);
          next.push({
            key: `${branch}-${choice}`,
            x1: leafFrom.x,
            y1: leafFrom.y,
            x2: leafTo.x,
            y2: leafTo.y,
            highlighted:
              result.path.zoomEatsMove === branch && result.path.campusCartMove === choice,
          });
        });
      });

      setLines(next);
      setSize({ width: rect.width, height: rect.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [tree, result.path.zoomEatsMove, result.path.campusCartMove]);

  return (
    <Section
      eyebrow="03 — Stage 2"
      title="Sequential Game (Commitment)"
      subtitle="ZoomEats moves first and commits publicly; CampusCart observes the move, then responds."
    >
      <div className="tree-wrap">
        <div className="tree" ref={containerRef}>
          <svg className="tree__lines" width={size.width} height={size.height}>
            {lines.map((l) => (
              <line
                key={l.key}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                className={l.highlighted ? 'tree__edge tree__edge--active' : 'tree__edge'}
              />
            ))}
          </svg>

          <div className="tree__row tree__row--root">
            <div className="tree-node tree-node--root" ref={rootRef}>
              <span className="tree-node__player">{PLAYERS.zoomEats}</span>
            </div>
          </div>

          <div className="tree__row tree__row--branches">
            {BRANCHES.map((branch) => (
              <div className="tree__branch-label" key={branch}>
                {zLabel(branch)}
                {result.zoomEatsChoice === branch && <span className="tree__check">✓</span>}
              </div>
            ))}
          </div>

          <div className="tree__row tree__row--decisions">
            {BRANCHES.map((branch) => (
              <div
                className={`tree-node tree-node--decision${result.zoomEatsChoice === branch ? ' tree-node--active' : ''}`}
                ref={nodeRefs[branch]}
                key={branch}
              >
                <span className="tree-node__player">{PLAYERS.campusCart}</span>
              </div>
            ))}
          </div>

          <div className="tree__row tree__row--leaf-branches">
            {BRANCHES.map((branch) =>
              CHOICES.map((choice) => (
                <div className="tree__branch-label" key={`${branch}-${choice}-label`}>
                  {cLabel(choice)}
                  {result.campusCartChoice[branch] === choice && (
                    <span className="tree__check">✓</span>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="tree__row tree__row--leaves">
            {BRANCHES.map((branch) =>
              CHOICES.map((choice) => {
                const isSpe =
                  result.path.zoomEatsMove === branch && result.path.campusCartMove === choice;
                const cell = tree[branch][choice];
                return (
                  <div
                    className={`tree-leaf${isSpe ? ' tree-leaf--spe' : ''}`}
                    ref={leafRefs[branch][choice]}
                    key={`${branch}-${choice}`}
                  >
                    {isSpe && <span className="matrix__badge">✓ SPE</span>}
                    <div className="matrix__payoffs">
                      <NumberField
                        label="ZoomEats"
                        value={cell.zoomEats}
                        onChange={(v) => onChange(updateLeaf(tree, branch, choice, 'zoomEats', v))}
                      />
                      <NumberField
                        label="CampusCart"
                        value={cell.campusCart}
                        onChange={(v) => onChange(updateLeaf(tree, branch, choice, 'campusCart', v))}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="working-panel">
          <h3>Backward induction</h3>
          <ul className="working-list">
            {result.working.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          <h3>Subgame Perfect Equilibrium</h3>
          <ul className="working-list">
            <li>
              {PLAYERS.zoomEats} {zLabel(result.path.zoomEatsMove)} → {PLAYERS.campusCart}{' '}
              {cLabel(result.path.campusCartMove)} → payoff ({result.outcome.zoomEats},{' '}
              {result.outcome.campusCart})
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
