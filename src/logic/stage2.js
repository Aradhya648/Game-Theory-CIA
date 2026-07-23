import { PLAYERS, STAGE2_CAMPUSCART_MOVES, STAGE2_ZOOMEATS_MOVES } from '../data/defaultGame';

const zLabel = (k) => (k === 'commit' ? STAGE2_ZOOMEATS_MOVES[0] : STAGE2_ZOOMEATS_MOVES[1]);
const cLabel = (k) => (k === 'discount' ? STAGE2_CAMPUSCART_MOVES[0] : STAGE2_CAMPUSCART_MOVES[1]);

// Backward induction over the fixed 3-level tree: ZoomEats root -> CampusCart node -> terminal payoffs.
export function solveStage2(tree) {
  const working = [];
  const campusCartChoice = {};

  ['commit', 'standard'].forEach((branch) => {
    const d = tree[branch].discount.campusCart;
    const s = tree[branch].standard.campusCart;
    const chosen = d >= s ? 'discount' : 'standard';
    campusCartChoice[branch] = chosen;
    working.push(
      `At the ${PLAYERS.campusCart} node after ${PLAYERS.zoomEats} ${zLabel(branch)}: ${PLAYERS.campusCart} compares ${d} (${cLabel('discount')}) vs ${s} (${cLabel('standard')}) → chooses ${cLabel(chosen)}.`
    );
  });

  const commitOutcome = tree.commit[campusCartChoice.commit];
  const standardOutcome = tree.standard[campusCartChoice.standard];

  const zoomEatsChoice = commitOutcome.zoomEats >= standardOutcome.zoomEats ? 'commit' : 'standard';
  working.push(
    `At the root, ${PLAYERS.zoomEats} anticipates ${PLAYERS.campusCart} will respond with ${cLabel(campusCartChoice.commit)} to ${zLabel('commit')} (payoff ${commitOutcome.zoomEats}) and ${cLabel(campusCartChoice.standard)} to ${zLabel('standard')} (payoff ${standardOutcome.zoomEats}) → chooses ${zLabel(zoomEatsChoice)}.`
  );

  const path = {
    zoomEatsMove: zoomEatsChoice,
    campusCartMove: campusCartChoice[zoomEatsChoice],
  };
  const outcome = tree[path.zoomEatsMove][path.campusCartMove];

  return {
    campusCartChoice,
    zoomEatsChoice,
    path,
    outcome,
    working,
  };
}

export { zLabel, cLabel };
