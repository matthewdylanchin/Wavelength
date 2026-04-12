# Architecture

Code structure, state model, and dial math conventions.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (shell, layout, buttons — *not* the dial)
- **SVG** (the dial — hand-written, not a charting lib)
- **Framer Motion** (animation)
- **Vitest** (unit tests, specifically for `dial.ts`)

No Redux, no Zustand, no React Query, no router. Single screen, single reducer.

## Folder structure

```
src/
├── main.tsx
├── App.tsx
├── index.css                  # Tailwind + CSS custom properties
├── components/
│   ├── shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TitleBar.tsx
│   │   └── ActiveGameCard.tsx
│   ├── game/
│   │   ├── GameBoard.tsx       # owns the reducer
│   │   ├── ClueDisplay.tsx
│   │   ├── ClueInput.tsx
│   │   ├── PhaseStatus.tsx
│   │   ├── PrimaryActionButton.tsx
│   │   ├── ScoreDisplay.tsx
│   │   ├── SpinKnob.tsx
│   │   └── AdjustGuessControl.tsx
│   └── dial/
│       ├── Dial.tsx            # the <svg> wrapper
│       ├── DialBase.tsx
│       ├── TargetLayer.tsx
│       ├── RevealCover.tsx
│       ├── GuessNeedle.tsx
│       └── TargetNeedle.tsx
├── lib/
│   ├── dial.ts                 # pure dial math — see below
│   ├── dial.test.ts            # unit tests for dial.ts
│   ├── spectra.ts              # the hardcoded spectrum list
│   └── scoring.ts              # pure scoring function
├── state/
│   ├── gameReducer.ts          # the useReducer reducer
│   ├── gameState.ts            # types and initial state
│   └── actions.ts              # action types and creators
└── styles/
    └── tokens.css              # CSS custom properties for the palette
```

## State model

```typescript
type Phase =
  | 'idle'
  | 'spinning'
  | 'clue'
  | 'guessing'
  | 'revealing'
  | 'scored';

type Spectrum = {
  left: string;   // e.g. "Freezing"
  right: string;  // e.g. "Scorching"
};

type Round = {
  number: number;
  spectrum: Spectrum;
  clue: string;
  targetAngle: number;     // degrees, 0–180
  guessAngle: number;      // degrees, 0–180
  pointsThisRound: number | null;
};

type GameState = {
  phase: Phase;
  round: Round;
  totalScore: number;
};
```

Notes:

- `targetAngle` and `guessAngle` are always degrees in [0, 180]. Never pixels, never radians (except inside math functions).
- `pointsThisRound` is `null` until scored, so the score display knows whether to render.
- `totalScore` persists across rounds; round state resets on `NEXT_ROUND`.

## Reducer actions

```typescript
type Action =
  | { type: 'START_ROUND' }
  | { type: 'SPIN' }
  | { type: 'LOCK_TARGET' }
  | { type: 'SUBMIT_CLUE'; clue: string }
  | { type: 'ADJUST_GUESS'; delta?: number; absolute?: number }
  | { type: 'REVEAL' }
  | { type: 'NEXT_ROUND' };
```

`ADJUST_GUESS` accepts either a delta (for the < > buttons) or an absolute angle (for future drag support). Clamp to [0, 180] in the reducer.

## Dial math (`src/lib/dial.ts`)

This is the most important module in the codebase. Every visual element depends on it being correct. **Pure functions only. Unit-tested. No React.**

### Conventions

- **0° = left tip** of the semicircle
- **90° = top center**
- **180° = right tip**
- The semicircle bulges upward (typical "gauge" orientation).

### Required functions

```typescript
// Convert a dial angle (0–180) to an (x, y) point on the arc.
// cx, cy is the center of the semicircle's flat edge. r is the radius.
angleToPoint(angle: number, cx: number, cy: number, r: number): { x: number; y: number }

// Generate a random target angle, clamped to a safe range away from the edges.
randomTarget(): number  // returns a value in [15, 165]

// Build an SVG path string for an annular sector (a "donut slice").
// Used for scoring band wedges.
bandPath(
  centerAngle: number,
  halfWidth: number,
  innerR: number,
  outerR: number,
  cx: number,
  cy: number
): string

// Clamp an angle to the valid dial range.
clampAngle(angle: number): number  // [0, 180]
```

### Conversion formula

For a semicircle bulging upward, with 0° on the left:

```
const rad = (angle * Math.PI) / 180;
const x = cx - r * Math.cos(rad);
const y = cy - r * Math.sin(rad);
```

The minus signs put 0° on the left and bulge the arc upward. Test this with three known points (0°, 90°, 180°) before trusting it.

### Needle rendering

**Do not** compute needle endpoints. Render the needle as a vertical line from the center upward, then apply:

```jsx
<g transform={`rotate(${angle - 90}, ${cx}, ${cy})`}>
  <line ... />
</g>
```

When `angle === 90`, the needle points straight up. When `angle === 0`, it points left. When `angle === 180`, right.

## Scoring (`src/lib/scoring.ts`)

```typescript
const BANDS = [
  { points: 4, halfWidth: 7 },
  { points: 3, halfWidth: 14 },
  { points: 2, halfWidth: 22 },
];

scoreFor(guessAngle: number, targetAngle: number): number
```

Pure function. Computes `delta = abs(guess - target)` and returns the points for the smallest band that contains it, or 0.

## Spectra (`src/lib/spectra.ts`)

A hardcoded array of `Spectrum` objects and a `pickRandomSpectrum(excluding?: Spectrum)` helper that avoids immediate repetition.

## Component responsibilities

- **`<GameBoard>`** is the only component that owns state. It calls `useReducer` and passes props down.
- **All other components are presentational.** They take props, render SVG/JSX, and call back via callbacks. No `useState` for game logic anywhere else (local UI state for things like input focus is fine).
- **`<Dial>`** is one `<svg>` element with a fixed viewBox (e.g. `0 0 800 450`). All children are positioned in viewBox units, not pixels. CSS scales the whole SVG.
- **`<TargetLayer>`** is rendered always but wrapped in a `<g>` that's hidden by `<RevealCover>` until the cover animates away. Don't conditionally mount it — that breaks the reveal animation.

## Testing

- `dial.test.ts` — assert `angleToPoint(0, 100, 100, 50)` returns `{x: 50, y: 100}`, etc.
- `scoring.test.ts` — assert exact band boundaries (delta of 7 = 4 points, delta of 8 = 3 points, etc.)
- No component tests for v1. The visual feedback loop is faster than RTL for this kind of project.

## Build & dev commands

To be added once Vite is scaffolded. Expected:

```bash
npm install
npm run dev      # local dev server
npm run test     # vitest
npm run build    # production build
```
