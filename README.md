# Two-Stage Game: Campus Delivery Pricing War

A playable interactive game built for the CIA 1A.2 "Design-Your-Own Two-Stage Game"
assignment. You run **ZoomEats**; **CampusCart** is your rival. Two rounds — a simultaneous
pricing standoff, then a sequential commitment play — decide the semester.

The written analysis/report for the assignment is produced separately; this repo is the
playable companion.

## How it plays

1. **Intro** — sets the premise, one click to start.
2. **Round 1 (Stage 1, simultaneous)** — pick Discount or Standard pricing without seeing
   CampusCart's move. CampusCart always plays its Nash-equilibrium strategy, computed live
   from the payoff matrix (`src/logic/stage1.js`), not hardcoded.
3. **Round 2 (Stage 2, sequential)** — you commit first; CampusCart genuinely reacts to your
   choice via backward induction (`src/logic/stage2.js`), so its response actually depends on
   what you picked.
4. **Results** — final score for both sides, a verdict comparing your total to the best
   possible score (the combined Nash Equilibrium + Subgame Perfect Equilibrium payoff), and a
   recap of both rounds. Play Again drops you straight back into Round 1.

Each round has a blind-pick → "CPU thinking" beat → animated reveal (payoff cards, fill bars,
a round-winner star, an in-character CampusCart reaction line) rather than just printing
numbers.

## Stack

Vite + React, no backend, no external UI libraries. Brand colors (ZoomEats amber /
CampusCart teal), the flip-reveal and confetti animations, and all layout are hand-written
CSS — see `src/index.css` for design tokens and `src/App.css` for components.

The underlying game-theory solvers (`src/logic/stage1.js`, `src/logic/stage2.js`) compute
the actual Nash Equilibrium and Subgame Perfect Equilibrium from the payoff data in
`src/data/defaultGame.js` — they drive both the CPU opponent's behavior and the results
screen's "optimal score" comparison, so the numbers are never hand-picked.

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploying to Vercel

Standard Vite + React app — Vercel auto-detects it, no config needed:

1. Push this repo to GitHub (already connected as `origin`).
2. In Vercel, "Add New Project" → import this repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.
