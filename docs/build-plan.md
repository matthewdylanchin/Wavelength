# Build Plan

The ordered implementation steps. Do them in order. Don't move on until each step's "done when" condition is met.

## Step 0 — Project scaffold

**Build:** Vite + React + TypeScript project. Install Tailwind, Framer Motion, Vitest. Create the folder structure from `architecture.md`. Set up CSS custom properties for the palette in `src/styles/tokens.css`.

**Why first:** Nothing else works without it.

**Done when:** `npm run dev` shows a blank page in the browser, `npm run test` runs (even with zero tests), and the folder structure matches `architecture.md`.

---

## Step 1 — Static dial geometry

**Build:** `dial.ts` with `angleToPoint`, `clampAngle`, and `randomTarget`. Unit tests for all three. Then `<Dial>` and `<DialBase>` rendering a static cream semicircle in SVG with FREEZING / TARGET / SCORCHING labels positioned via `angleToPoint`.

**Why now:** The math module is the foundation everything else depends on. Get it right in isolation before any visuals depend on it.

**Done when:** `dial.test.ts` passes (especially the three known points: 0°, 90°, 180°). The semicircle renders in the browser at the correct shape with labels at the correct positions. Resizing the window doesn't break label placement.

---

## Step 2 — Guess needle as a controlled component

**Build:** `<GuessNeedle>` taking an `angle` prop and rendering via `transform="rotate(angle - 90, cx, cy)"`. Hardcode an angle in the parent for now (no state yet). Then add `<AdjustGuessControl>` with two buttons that increment/decrement the angle via local component state.

**Why now:** Proves the rotation math works and gives you a tangible thing to play with before introducing the reducer.

**Done when:** Clicking the arrows visibly rotates the needle smoothly across the full semicircle, from 0° to 180°, without clipping or jumping.

---

## Step 3 — Hidden target generation

**Build:** Add `targetAngle` to local state in the parent. Add `<SpinKnob>` that calls `randomTarget()` and updates the state. **Do not render the target visually yet** — `console.log` it to verify.

**Why now:** Confirms the spin mechanic works and produces sensible angles before you spend time on the visually fiddly target rendering.

**Done when:** Each click on the spin knob logs a new angle in [15, 165]. You trust the randomness.

---

## Step 4 — Target layer (visible during dev)

**Build:** `bandPath()` in `dial.ts` (with tests). `<TargetLayer>` renders three concentric annular sectors centered on `targetAngle` using `bandPath()` for the 4/3/2 bands. **Render it visibly** at first — no cover yet. Each band gets a placeholder color so you can see the geometry.

**Why now:** This is the hardest single piece of geometry in the whole project. Get it right in isolation, with the target visible, before adding the cover.

**Done when:** Spinning produces a correctly positioned bullseye every time. The bands are visibly symmetric around the target. Spinning to 15° and 165° both render cleanly without clipping.

---

## Step 5 — Scoring function

**Build:** `scoring.ts` with `scoreFor(guess, target)`. Unit tests for boundary conditions (delta of exactly 7, 14, 22). Wire it into the parent and display the live would-be score next to the dial as dev-only debug text.

**Why now:** Now that target and guess both exist, scoring is just a pure function over them. Validating it live as you rotate the needle catches off-by-one errors immediately.

**Done when:** Rotating the needle into each band shows the correct score in real time. Boundaries feel symmetric on both sides of the target.

---

## Step 6 — Reveal cover

**Build:** `<RevealCover>` as an opaque cream layer over `<TargetLayer>`. Add a temporary "Reveal" button that toggles its visibility with a Framer Motion animation (slide up + fade). The bands are now hidden by default and only appear after pressing reveal.

**Why now:** This is the visual climax of the game. Build it once mechanics are proven so you can iterate on the animation without worrying about correctness underneath.

**Done when:** The bands are completely hidden until you press reveal — no peeking, no opacity tricks. The reveal animation feels satisfying. Pressing it again (or resetting) hides them again for testing.

---

## Step 7 — Phase machine

**Build:** Move local state into `gameReducer.ts` with the full `Phase` enum and action types from `architecture.md`. `<GameBoard>` calls `useReducer`. Each control is enabled only in its appropriate phase. `<PhaseStatus>` updates its label per phase. Remove all the dev-only debug displays.

**Why now:** Up to here, everything has been ad-hoc state. Now that the mechanical pieces all work, formalise the phase transitions so the UI enforces correct order.

**Done when:** You cannot spin during guessing. You cannot reveal before guessing. You cannot adjust the guess after revealing. The phase pill always reflects the current phase. Every transition happens via a reducer action.

---

## Step 8 — Clue input + spectrum config

**Build:** `spectra.ts` with the hardcoded list and `pickRandomSpectrum`. `<ClueInput>` for the clue giver to type a clue during the `clue` phase. `<ClueDisplay>` shows the current spectrum and clue. The dial's spectrum labels (FREEZING / SCORCHING) come from the current spectrum, not hardcoded.

**Why now:** The mechanical loop is complete; now fill in the human-facing content.

**Done when:** A full round plays end to end with a randomly picked spectrum and a custom clue. Different rounds show different spectra.

---

## Step 9 — Score display + next round

**Build:** `<ScoreDisplay>` shown during the `scored` phase with points awarded and running total. `NEXT_ROUND` action resets round state, increments round number, picks a new spectrum, preserves total score. "Next round" button on the primary CTA.

**Why now:** Closes the loop so the game is replayable.

**Done when:** You can play three rounds in a row without refreshing. Total score accumulates correctly. New spectra appear each round.

---

## Step 10 — Polish

**Build:** Animation tuning. Spin should animate through intermediate angles before settling, with a slight overshoot. Needle should feel weighty (springy but not bouncy). Reveal cover animation should feel like a curtain or door, not a fade. Buttons get subtle hover lift. The cream palette gets refined. The scoring band colors get tuned to feel like felt or watercolor. Add a slight grain texture to the dial if it improves the cozy vibe.

**Why last:** Polish on broken mechanics is wasted effort. Now the foundation is stable and you can iterate on feel.

**Done when:** It feels like the cozy tactile thing you set out to build. You'd want to show it to someone.

---

## After v1

Possible follow-ups, in rough priority order:

- Sound effects (spin click, reveal whoosh, score chime)
- Keyboard controls for the needle (arrow keys = fine, shift+arrow = coarse)
- Drag-to-rotate the needle directly
- Two-team scoring with team switching
- Custom spectrum entry by the user
- Persisted scores between sessions (localStorage)
- The "left/right" betting mechanic from the real game
- Multiplayer (this is a big jump — separate project)
