# Two-Stage Game: Campus Food Delivery Pricing War

Interactive companion for the CIA 1A.2 "Design-Your-Own Two-Stage Game" assignment. ZoomEats
and CampusCart — two student-run campus delivery startups — play a simultaneous pricing game
in Stage 1 and a sequential commitment game in Stage 2. Every payoff is editable and both
equilibria re-solve live.

## What's here

- **Game specification** — players, strategy sets, and an editable payoff-justification field.
- **Stage 1** — editable 2×2 payoff matrix with live best-response working, dominant-strategy
  check, and Nash Equilibrium highlight.
- **Stage 2** — editable game tree with measured SVG connectors, backward-induction working,
  and the Subgame Perfect Equilibrium path highlighted.
- **Comparison panel** — auto-computed Stage 1 vs Stage 2 payoff delta for ZoomEats.
- **Designer's commentary** — a 500–600 word editor (own analysis, not AI-generated) with a
  live word count.
- **Report export** — a "Generate Report" button opens the browser print dialog with a
  print stylesheet that strips editing chrome for a clean PDF, plus an AI-use disclosure
  footer with an editable team name.

All edits persist to `localStorage` so a refresh doesn't lose your work.

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

This is a standard Vite + React app — Vercel auto-detects it, no config needed:

1. Push this repo to GitHub (already connected as `origin`).
2. In Vercel, "Add New Project" → import this repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

## Stack

Vite + React, no backend, no external UI libraries — all styling and the game tree's SVG
connectors are hand-written.
