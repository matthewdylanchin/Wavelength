import { useEffect, useReducer, useState } from "react";
import Dial from "./components/dial/Dial";
import AdjustGuessControl from "./components/game/AdjustGuessControl";
import ClueDisplay from "./components/game/ClueDisplay";
import ClueInput from "./components/game/ClueInput";
import SpinKnob from "./components/game/SpinKnob";
import ScoreDisplay from "./components/game/ScoreDisplay";
import { gameReducer } from "./state/gameReducer";
import { initialState } from "./state/gameState";

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { phase, round, totalScore } = state;

  // Draft clue lives outside the reducer — don't persist half-typed text in game state
  const [draftClue, setDraftClue] = useState("");

  // Reset draft when a new spin phase begins
  useEffect(() => {
    if (phase === "spinning") setDraftClue("");
  }, [phase]);

  function submitClue() {
    dispatch({ type: "SUBMIT_CLUE", clue: draftClue.trim() });
  }

  const primaryButton = getPrimaryButton(phase, submitClue, () =>
    dispatch({ type: phase === "spinning" ? "LOCK_TARGET" : phase === "guessing" ? "REVEAL" : "NEXT_ROUND" })
  );

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <ClueDisplay phase={phase} spectrum={round.spectrum} clue={round.clue} />

      <Dial
        guessAngle={round.guessAngle}
        targetAngle={round.targetAngle}
        revealed={phase === "clue" || phase === "scored"}
        spectrum={round.spectrum}
      />

      {phase === "clue" && (
        <div style={{ marginTop: "1rem" }}>
          <ClueInput
            value={draftClue}
            onChange={setDraftClue}
            onSubmit={submitClue}
          />
        </div>
      )}

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <SpinKnob
          onSpin={() => dispatch({ type: "SPIN" })}
          disabled={phase !== "spinning"}
        />

        <AdjustGuessControl
          angle={round.guessAngle}
          onChange={(next) => dispatch({ type: "ADJUST_GUESS", absolute: next })}
          disabled={phase !== "guessing"}
        />

        {primaryButton && (
          <button
            onClick={primaryButton.onClick}
            disabled={primaryButton.disabled}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "2px solid var(--color-cream-shadow)",
              background: primaryButton.disabled ? "var(--color-cream-dark)" : "#4a6741",
              color: primaryButton.disabled ? "var(--color-brown-soft)" : "#f5f0e8",
              fontWeight: 600,
              cursor: primaryButton.disabled ? "default" : "pointer",
              fontSize: 14,
              whiteSpace: "nowrap",
              opacity: primaryButton.disabled ? 0.6 : 1,
            }}
          >
            {primaryButton.label}
          </button>
        )}
      </div>

      {phase === "scored" && (
        <ScoreDisplay
          points={round.pointsThisRound ?? 0}
          totalScore={totalScore + (round.pointsThisRound ?? 0)}
          roundNumber={round.number}
        />
      )}
    </div>
  );
}

type PrimaryButton = { label: string; onClick: () => void; disabled: boolean }

function getPrimaryButton(
  phase: string,
  submitClue: () => void,
  dispatch: () => void,
): PrimaryButton | null {
  switch (phase) {
    case "idle":
      return { label: "Start round", onClick: dispatch, disabled: false }
    case "spinning":
      return { label: "Lock target", onClick: dispatch, disabled: false }
    case "clue":
      return { label: "Pass to team", onClick: submitClue, disabled: false }
    case "guessing":
      return { label: "Reveal", onClick: dispatch, disabled: false }
    case "scored":
      return { label: "Next round", onClick: dispatch, disabled: false }
    default:
      return null
  }
}
