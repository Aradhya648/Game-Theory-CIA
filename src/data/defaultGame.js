// Scenario data driving the game. Payoffs are fixed for gameplay — the game teaches the
// equilibrium by letting the player feel the consequences of deviating from it.

export const PLAYERS = {
  campusCart: 'CampusCart',
  zoomEats: 'ZoomEats',
};

export const STAGE1_STRATEGIES = ['Discount Pricing', 'Standard Pricing'];
export const STAGE2_ZOOMEATS_MOVES = ['Commit to Free Delivery', 'Launch at Standard Pricing'];
export const STAGE2_CAMPUSCART_MOVES = ['Discount Pricing', 'Standard Pricing'];

// Stage 1: simultaneous 2x2 matrix.
// Rows = CampusCart action, Columns = ZoomEats action.
// Each cell: { campusCart: number, zoomEats: number }
export const defaultStage1 = {
  discount: {
    discount: { campusCart: 3, zoomEats: 3 },
    standard: { campusCart: 7, zoomEats: 2 },
  },
  standard: {
    discount: { campusCart: 2, zoomEats: 7 },
    standard: { campusCart: 5, zoomEats: 5 },
  },
};

// Stage 2: sequential game tree.
// ZoomEats moves first (commit / standard), CampusCart observes and responds.
export const defaultStage2 = {
  commit: {
    discount: { zoomEats: 4, campusCart: 2 },
    standard: { zoomEats: 9, campusCart: 4 },
  },
  standard: {
    discount: { zoomEats: 2, campusCart: 7 },
    standard: { zoomEats: 5, campusCart: 5 },
  },
};
