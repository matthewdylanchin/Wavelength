# Wavelength

A desktop web version of the board game **Wavelength**, with a cozy, tactile, "A Little to the Left"–inspired visual style.

## What this is

Wavelength is a social guessing game. One player (the clue giver) sees a hidden target band on a dial and gives a clue. Their team rotates a needle to where they think the target is. The closer to the center of the band, the more points scored.

This project recreates that experience as a single-screen desktop web app.

## Status

Early development. See `docs/build-plan.md` for the current step.

## Documentation

All design and implementation docs live in `docs/`. Start with:

- **`CLAUDE.md`** — instructions for Claude Code when working in this repo
- **`docs/requirements.md`** — what we're building and why
- **`docs/mechanics.md`** — the rules of Wavelength as implemented here
- **`docs/design.md`** — visual language and UI components
- **`docs/architecture.md`** — code structure, state model, dial math
- **`docs/build-plan.md`** — ordered implementation steps

## Tech

- React + TypeScript
- Vite
- Tailwind CSS (for shell/layout)
- SVG (for the dial)
- Framer Motion (for animation)
- `useReducer` for game state

## Running locally

```bash
npm install
npm run dev
```

(Setup commands will be added once the project is scaffolded.)
