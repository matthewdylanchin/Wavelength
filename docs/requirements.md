# Requirements

## Goal

Build a desktop web app that recreates the board game **Wavelength** with mechanical fidelity and a cozy, tactile visual style inspired by *A Little to the Left*.

## Audience

A single user (initially) playing locally — both the clue giver and the guessing team are at the same machine. Multiplayer is **not** in scope for v1.

## Platform

- Desktop web only.
- Designed at roughly macOS window proportions (the UI lives inside a fake macOS window chrome).
- No mobile support, no responsive breakpoints below ~1024px.

## Functional requirements

The app must support a complete round of Wavelength:

1. **Spectrum selection** — each round has a pair of opposing concepts (e.g. Freezing ↔ Scorching, Overrated ↔ Underrated). For v1, spectra can be hardcoded in a list and randomly picked.
2. **Hidden target generation** — when a round starts, the app randomly picks a target angle on the dial. The target has a scoring band around it (4 / 3 / 2 points, mirrored). The target is **not** shown to the guessing team until reveal.
3. **Spin/randomise** — the clue giver presses a spin control to generate the hidden target. Re-spinning is allowed until a clue is submitted.
4. **Clue entry** — the clue giver types a free-text clue (e.g. "a cup of lukewarm tea"). The clue is displayed to the guessing team.
5. **Guess adjustment** — the guessing team rotates a needle along the dial using coarse and fine controls.
6. **Reveal** — the guessing team commits the guess; the cover over the hidden target animates away to expose the scoring bands.
7. **Scoring** — points are awarded based on which band the needle landed in (4, 3, 2, or 0). The result is displayed.
8. **Next round** — round state resets, scores persist, a new spectrum is picked.

## Non-functional requirements

- **Mechanical correctness first.** The dial must behave like Wavelength, not a generic gauge.
- **Tactile feel.** Animations should feel springy and physical, not linear or instant.
- **Cozy visual language.** Cream palette, soft shadows, gentle typography. See `design.md`.
- **No backend.** Everything runs in the browser. No persistence beyond the current session.
- **Accessible enough.** Keyboard support for adjusting the needle is nice-to-have, not required for v1.

## Out of scope for v1

- Multiplayer / networked play
- User accounts, saved games, achievements (the sidebar items are visual placeholders)
- Sound effects (can be added in polish phase)
- Mobile / touch
- Internationalisation
- Custom spectrum creation by the user

## Constraints

- Must build incrementally per `build-plan.md`. Mechanics before polish.
- Must preserve the existing visual direction established in the reference screenshot (see `design.md`). Do not redesign the shell or palette.
- Must use the tech stack listed in `architecture.md`. No swapping frameworks mid-build.

## Definition of done for v1

A user can:

1. See the dial and sidebar in the cozy macOS-style window.
2. Spin to generate a hidden target.
3. See and enter a clue.
4. Rotate the needle along the full spectrum.
5. Press reveal and watch the cover animate away to expose the scoring bands.
6. See points awarded for the round.
7. Start a new round with a fresh spectrum and target while scores accumulate.

That's v1. Everything else is optional polish.
