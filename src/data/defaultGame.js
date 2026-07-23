// Default scenario data. Every payoff here is editable at runtime through the UI —
// this module only supplies the starting values and static labels.

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

export const DEFAULT_JUSTIFICATION = '';

export const JUSTIFICATION_HINT =
  'Explain why these payoff numbers are realistic for two student-run campus food delivery startups — e.g. what do the numbers represent (weekly orders, margin, market share), and why does a price war erode joint payoffs while one-sided discounting redistributes them?';

export const COMMENTARY_PROMPTS = `Guiding prompts — replace this entire block with your own 500–600 word analysis. Delete these prompts once you start writing.

1. Why are these payoffs realistic? What real campus-delivery dynamics (order volume, margins, customer switching) do the numbers try to capture?

2. What's the managerial lesson from Stage 1? Why do both startups end up worse off than if they had coordinated on Standard Pricing, and why is that equilibrium not stable?

3. How does Stage 2 change behavior compared to Stage 1? What does ZoomEats's first-mover commitment do to CampusCart's incentives, and why does backward induction predict a different outcome than simultaneous play?

4. Where does this model break down? What real-world frictions (repeated interaction, reputation, budget constraints, imperfect information) does this simple two-stage framework leave out?
`;

export const DEFAULT_TEAM_NAME = '[Your Name(s)]';
