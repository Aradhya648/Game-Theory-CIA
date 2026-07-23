import { PLAYERS, STAGE1_STRATEGIES } from '../data/defaultGame';

const ROWS = ['discount', 'standard'];
const COLS = ['discount', 'standard'];
const other = (k) => (k === 'discount' ? 'standard' : 'discount');
const label = (k) => (k === 'discount' ? STAGE1_STRATEGIES[0] : STAGE1_STRATEGIES[1]);

// Given the 2x2 matrix, derive best responses, dominant strategies, Nash equilibria,
// and a plain-English working trace for both players.
export function solveStage1(matrix) {
  const working = [];

  // Best response of CampusCart to each ZoomEats column.
  const campusCartBestResponse = {};
  COLS.forEach((col) => {
    const a = matrix.discount[col].campusCart;
    const b = matrix.standard[col].campusCart;
    const best = a >= b ? 'discount' : 'standard';
    campusCartBestResponse[col] = best;
    working.push(
      `If ${PLAYERS.zoomEats} plays ${label(col)}, ${PLAYERS.campusCart} earns ${a} (${label('discount')}) vs ${b} (${label('standard')}) → ${label(best)} is better.`
    );
  });

  // Best response of ZoomEats to each CampusCart row.
  const zoomEatsBestResponse = {};
  ROWS.forEach((row) => {
    const a = matrix[row].discount.zoomEats;
    const b = matrix[row].standard.zoomEats;
    const best = a >= b ? 'discount' : 'standard';
    zoomEatsBestResponse[row] = best;
    working.push(
      `If ${PLAYERS.campusCart} plays ${label(row)}, ${PLAYERS.zoomEats} earns ${a} (${label('discount')}) vs ${b} (${label('standard')}) → ${label(best)} is better.`
    );
  });

  // Dominant strategy check: a row/col strategy that is a best response regardless
  // of what the opponent does.
  const campusCartDominant =
    campusCartBestResponse.discount === campusCartBestResponse.standard
      ? campusCartBestResponse.discount
      : null;
  const zoomEatsDominant =
    zoomEatsBestResponse.discount === zoomEatsBestResponse.standard
      ? zoomEatsBestResponse.discount
      : null;

  // Nash equilibria: cell where each player's action is a best response to the other's.
  const nashEquilibria = [];
  ROWS.forEach((row) => {
    COLS.forEach((col) => {
      const campusCartOk = campusCartBestResponse[col] === row;
      const zoomEatsOk = zoomEatsBestResponse[row] === col;
      if (campusCartOk && zoomEatsOk) {
        nashEquilibria.push({ row, col, payoff: matrix[row][col] });
      }
    });
  });

  return {
    campusCartBestResponse,
    zoomEatsBestResponse,
    campusCartDominant,
    zoomEatsDominant,
    nashEquilibria,
    working,
  };
}

export { ROWS, COLS, label };
