# Instructions for Claude Code

You are helping build a desktop web version of the board game **Wavelength**. Read this file first in any new session, then read the relevant doc(s) in `docs/` for the task at hand.

## Project context

- **What:** Single-screen desktop web app recreating Wavelength.
- **Visual vibe:** Soft, cozy, tactile, slightly playful — like *A Little to the Left*. Cream palette, gentle shadows, springy micro-animations. Not flat, not corporate, not neon.
- **Stack:** React + TypeScript + Vite + Tailwind + SVG + Framer Motion.
- **State:** `useReducer` in a single `<GameBoard>` container. No Redux, no Zustand.
- **Mechanical fidelity matters more than visual polish.** A pretty broken Wavelength is worse than an ugly correct one.

## Where to find things

- `docs/requirements.md` — what we're building and constraints
- `docs/mechanics.md` — game rules, scoring, phase machine
- `docs/design.md` — visual language, components, the screenshot reference
- `docs/architecture.md` — folder layout, state shape, dial math conventions
- `docs/build-plan.md` — the ordered build steps; **always check which step we're on before suggesting work**

## Working principles

1. **Follow the build plan in order.** Don't jump ahead. Each step has a "done when" condition — meet it before moving on.
2. **Pure functions for dial math.** All angle, point, and scoring math lives in `src/lib/dial.ts` as pure, unit-tested functions. Never inline geometry into components.
3. **Angles in degrees, 0–180.** 0° = left tip (FREEZING), 90° = center (TARGET), 180° = right tip (SCORCHING). Never store pixel coordinates in state.
4. **SVG for the dial, not Canvas, not divs.** The whole dial is one `<svg>` with layered `<g>` groups.
5. **Phase enum, not scattered booleans.** Game state transitions through `idle → spinning → clue → guessing → revealing → scored`. Gate UI on `phase`, never on ad-hoc flags.
6. **The target is hidden until reveal.** The `<RevealCover>` must be fully opaque. Never use low opacity "for now" — that bug will ship.
7. **Lock the guess at reveal.** Once `phase === 'revealing'`, `guessAngle` is immutable until next round.
8. **Ask before redesigning.** If a request would change the visual language established in `docs/design.md`, confirm first.

## What not to do

- Don't refactor working code unless asked.
- Don't introduce new dependencies without flagging it.
- Don't write Canvas code for the dial.
- Don't compute needle endpoints manually — use `transform="rotate(angle - 90, cx, cy)"`.
- Don't paint scoring bands and the spectrum onto the same SVG layer — they're separate concerns.
- Don't gate UI on more than one piece of state if `phase` already covers it.
- Don't polish animations before mechanics work (build-plan steps 1–9 first, polish at step 10).

## When stuck

If a request is ambiguous, re-read the relevant doc in `docs/` before asking. If still ambiguous, ask one focused question. Don't guess on game mechanics — get them right.

## Commit style

Small, focused commits per build-plan sub-step. Message format: `step N: <what>`. Example: `step 4: render scoring bands at target angle`.
