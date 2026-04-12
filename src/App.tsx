import { useReducer } from "react";
import Dial from "./components/dial/Dial";
import AdjustGuessControl from "./components/game/AdjustGuessControl";
import SpinKnob from "./components/game/SpinKnob";
import { gameReducer } from "./state/gameReducer";
import { initialState } from "./state/gameState";

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { phase, round, totalScore } = state;

  const primaryButton = getPrimaryButton(phase);

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <Dial
        guessAngle={round.guessAngle}
        targetAngle={round.targetAngle}
        revealed={phase === "clue" || phase === "scored"}
      />

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
            onClick={() => dispatch(primaryButton.action)}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "2px solid var(--color-cream-shadow)",
              background: "#4a6741",
              color: "#f5f0e8",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            {primaryButton.label}
          </button>
        )}
      </div>

      {phase === "scored" && (
        <p style={{ textAlign: "center", marginTop: "1rem", fontFamily: "monospace" }}>
          Round {round.number}: {round.pointsThisRound} pts — Total: {totalScore + (round.pointsThisRound ?? 0)} pts
        </p>
      )}
    </div>
  );
}

type PrimaryButton = { label: string; action: Parameters<typeof gameReducer>[1] }

function getPrimaryButton(phase: string): PrimaryButton | null {
  switch (phase) {
    case "idle":     return { label: "Start round",   action: { type: "START_ROUND" } }
    case "spinning": return { label: "Lock target",   action: { type: "LOCK_TARGET" } }
    case "clue":     return { label: "Pass to team",  action: { type: "SUBMIT_CLUE", clue: "" } }
    case "guessing": return { label: "Reveal",        action: { type: "REVEAL" } }
    case "scored":   return { label: "Next round",    action: { type: "NEXT_ROUND" } }
    default:         return null
  }
}
