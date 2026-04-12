# Design

Visual language, components, and the reference screenshot.

## Vibe

Cozy, tactile, slightly playful. The reference is *A Little to the Left* — soft cream tones, gentle shadows, a sense that everything is a physical object you could nudge with your finger. Not flat. Not corporate. Not neon. Not skeuomorphic to the point of kitsch.

The dial in particular should feel like a wooden board game piece, not a digital speedometer.

## Reference screenshot

The starting visual direction is the screenshot in the original brief: a fake macOS window containing a sidebar (Home / My Games / Friends / Achievements) and a main area with the dial, clue text, and adjustment controls. **Do not redesign this shell.** Extend it.

## Palette

All colors live as CSS custom properties for easy tuning. Approximate values from the reference:

- `--bg-page` — very pale cream, almost white (`#F8F4EA` ish)
- `--bg-panel` — slightly warmer cream for the sidebar (`#F1E9D2` ish)
- `--bg-card` — softest cream for cards/pills
- `--ink-strong` — deep warm brown for the needle and primary text (`#3E2A1F` ish)
- `--ink-soft` — muted brown-grey for secondary text
- `--accent-green` — the dark olive/forest green from the "Spin Target" pill and primary buttons
- `--accent-green-soft` — a paler version for hover/disabled states
- `--score-4` — warm, saturated (the bullseye) — suggest a soft coral or warm gold
- `--score-3` — one tier softer
- `--score-2` — softest
- (scoring band colors should harmonise with the cream palette, not clash)

Refine these once the dial is rendering — don't bikeshed before pixels exist.

## Typography

- A friendly serif or rounded sans for headings and clue text (the reference uses something with warmth — pick one and commit).
- A slightly more neutral sans for UI labels (button text, sidebar items).
- Italic for the clue itself (matches the reference: *"A cup of lukewarm tea"*).

## Component inventory

### Shell (already exists in the screenshot)

- **`<AppShell>`** — fake macOS window: traffic-light dots, title bar with game name, rounded outer container with subtle drop shadow.
- **`<Sidebar>`** — Home, My Games, Friends, Achievements. Visual placeholders for v1 (no routing, no functionality). Active state on Home.
- **`<ActiveGameCard>`** — bottom of the sidebar. Shows current game name and a progress indicator.
- **`<TitleBar>`** — top of the main area, shows the game logo/icon and avatar stack on the right.

### Game area (the new mechanically-correct stuff)

- **`<GameBoard>`** — orchestrator. Owns the reducer. Renders everything below based on phase.
- **`<ClueDisplay>`** — top of the game area. Shows "The clue giver has chosen a point on the spectrum. Where does *'A cup of lukewarm tea'* land?" Updates per phase (e.g. "Waiting for clue…" during the clue phase).
- **`<Dial>`** — the semicircle. A single SVG with layered groups:
  - **`<DialBase>`** — cream semicircle background, FREEZING / TARGET / SCORCHING labels at 0° / 90° / 180°. The spectrum labels swap per round.
  - **`<TargetLayer>`** — three concentric scoring band wedges centered on `targetAngle`. Always rendered, hidden behind cover until reveal.
  - **`<RevealCover>`** — opaque cream layer over `<TargetLayer>`. Animates away on reveal (slide up + fade, or doors-open — pick one, commit).
  - **`<GuessNeedle>`** — the dark warm-brown pointer. The bold visible needle from the screenshot becomes this.
  - **`<TargetNeedle>`** *(post-reveal only)* — thin marker showing exact target center.
- **`<SpinKnob>`** — the round knob at the bottom of the semicircle (already in the screenshot). Click to randomise target. Disabled outside `spinning` phase.
- **`<AdjustGuessControl>`** — the "< ADJUST GUESS >" pill plus the two larger rotary buttons on either side (already in the screenshot). Coarse and fine angle adjustments. Disabled outside `guessing` phase.
- **`<PhaseStatus>`** — the "Team is debating…" pill in the bottom right of the screenshot. Label changes per phase.
- **`<PrimaryActionButton>`** — bottom CTA. Label and behavior change per phase: "Spin", "Lock target", "Submit clue", "Reveal", "Next round".
- **`<ClueInput>`** — appears only during `clue` phase. Text field for the clue giver to type the clue.
- **`<ScoreDisplay>`** — appears during `scored` phase. Shows points awarded and running total.

## Layering inside the dial SVG

Back to front:

1. `<DialBase>` (semicircle + spectrum labels)
2. `<TargetLayer>` (scoring band wedges)
3. `<RevealCover>` (opaque, hides #2 until reveal)
4. `<GuessNeedle>`
5. `<TargetNeedle>` (only after reveal)

The needle must always be above the cover so it stays visible during the reveal animation.

## Animation principles

- **Springs over linear easing.** Use Framer Motion springs for the needle, the spin, and the reveal. Tune stiffness/damping by feel.
- **The spin should look mechanical.** Don't just snap to a random angle — animate through several intermediate angles before settling. A short overshoot and bounce sells it.
- **The reveal is the climax.** Take your time. ~600–900ms. Spring or ease-out, with the cover sliding up while fading slightly.
- **The needle should feel weighty.** Slow stiffness, moderate damping. Not bouncy like a toy, not stiff like a slider.
- **Micro-interactions on hover.** Buttons can subtly lift. The spin knob can rotate a few degrees on hover to hint at its function.

## What changes per phase visually

- `idle` — most controls dimmed, just "Start round"
- `spinning` — spin knob is highlighted, target is rolling, primary CTA says "Lock target"
- `clue` — clue input takes focus, dial dims slightly, primary CTA says "Submit clue"
- `guessing` — adjust guess controls become live, dial brightens, primary CTA says "Reveal"
- `revealing` — controls all disabled during the animation
- `scored` — score display fades in below the dial, primary CTA says "Next round"

## What NOT to do visually

- Don't add neon, gradients with high saturation, or hard shadows.
- Don't use a sans-serif system font like Helvetica — pick something with character.
- Don't render the scoring bands as flat blocks of primary color. They should feel like watercolor or felt.
- Don't show the target during `guessing`. Ever. Even faintly. Even "for testing" in committed code.
- Don't let the needle clip outside the semicircle.
