# Game Mechanics

This document defines exactly how Wavelength behaves in this implementation. When in doubt about game logic, this file is the source of truth.

## The dial

- A semicircle representing a continuous spectrum between two opposing concepts.
- **Left tip = 0°** (e.g. FREEZING)
- **Center = 90°** (e.g. TEPID)
- **Right tip = 180°** (e.g. SCORCHING)
- All angles are stored in degrees on the 0–180 range. Never as pixels.

## The hidden target

- On spin, a `targetAngle` is randomly generated in the range **[15°, 165°]**.
- The 15° margin on each end prevents the scoring bands from being clipped by the semicircle's flat edge, which would feel unfair.
- The target is a single angle, but it has scoring bands radiating symmetrically from it.

## Scoring bands

Symmetric, centered on `targetAngle`. Half-widths in degrees:

| Points | Half-width | Total span      |
| ------ | ---------- | --------------- |
| 4      | 7°         | 14°             |
| 3      | 14°        | 28°             |
| 2      | 22°        | 44°             |
| 0      | —          | everywhere else |

These are tunable. Narrower = harder. Start with these values; adjust during playtesting.

## Scoring function

Pure function. Given `guessAngle` and `targetAngle`, both in degrees:

```
delta = abs(guessAngle - targetAngle)

if      delta <= 7   → 4 points
else if delta <= 14  → 3 points
else if delta <= 22  → 2 points
else                 → 0 points
```

The symmetry of the bands is a natural consequence of using `abs()`. Don't try to render two separate sides — it's one symmetric range computed from one center angle.

## Spectra

A spectrum is a `{ left, right }` pair of opposing concepts. For v1, hardcode a list:

- Freezing ↔ Scorching
- Overrated ↔ Underrated
- Useless ↔ Useful
- Boring ↔ Exciting
- Weird ↔ Normal
- Cheap ↔ Expensive
- Quiet ↔ Loud
- Dangerous ↔ Safe

On each new round, pick one at random (without immediate repetition).

## Phase machine

The game progresses through these phases in order:

```
idle → spinning → clue → guessing → revealing → scored → (next round → spinning)
```

The `clue` phase doubles as the "peek" phase: the cover lifts so the clue giver can see the target, then drops back down when transitioning to `guessing`.

| Phase       | Cover          | Who sees the target | What's enabled                         |
| ----------- | -------------- | ------------------- | -------------------------------------- |
| `idle`      | up             | nobody              | "Start round" button                   |
| `spinning`  | up             | nobody              | Spin knob, "Lock target" button        |
| `clue`      | **lifted**     | **clue giver only** | Clue text input, "Pass to team" button |
| `guessing`  | **back down**  | nobody              | Adjust guess controls, "Reveal" button |
| `revealing` | animating away | everyone            | Nothing (transient)                    |
| `scored`    | away           | everyone            | "Next round" button                    |

Rules:

- The current `phase` is the **only** thing gating UI affordances. Don't introduce parallel booleans.
- Transitions happen via reducer actions, not direct state mutation.
- `targetAngle` is set during `spinning` and immutable from `clue` onward.
- `guessAngle` is mutable during `guessing` and immutable from `revealing` onward.
- The cover visibility is derived from `phase`, not a separate boolean. The same `AnimatePresence` exit animation fires twice per round: once entering `clue` (peek), once entering `scored` (final reveal).
- "Pass to team" is the single confirmation that the clue giver has seen the target and is ready to hand off — it both ends the peek and starts guessing in one click.

## Reducer actions

```
START_ROUND       — idle/scored → spinning, picks new spectrum
SPIN              — spinning, generates new targetAngle
LOCK_TARGET       — spinning → clue (cover lifts for clue giver)
SUBMIT_CLUE       — clue → guessing (cover drops, hand off to guessers)
ADJUST_GUESS      — guessing, updates guessAngle (delta or absolute)
REVEAL            — guessing → revealing → scored, computes points, cover animates away
NEXT_ROUND        — scored → spinning, increments round, resets round state, preserves total score
```

> **Naming note:** The action is called `SUBMIT_CLUE` in code but the user-facing button label is "Pass to team". In Step 8, this same action will be extended to carry the actual clue text typed by the clue giver. Until then, it dispatches with an empty clue string.

## Scoring accumulation

- Each round produces `pointsThisRound` (0, 2, 3, or 4).
- These add to a running total. For v1 (single team), there's just one cumulative score. Multi-team scoring is out of scope for v1 but the state shape should leave room for it.

## What this implementation does NOT include

- Left/right betting (in the real game, the opposing team bets which side of the needle the target is on). Out of scope for v1.
- The "psychic" role rotation. v1 assumes one player toggling between roles informally.
- Catch-up rules or end-game conditions. v1 is open-ended — you play as many rounds as you want.
