import { useState } from "react";
import Dial from "./components/dial/Dial";
import AdjustGuessControl from "./components/game/AdjustGuessControl";
import SpinKnob from "./components/game/SpinKnob";
import { randomTarget } from "./lib/dial";
import { scoreFor } from "./lib/scoring";

export default function App() {
  const [guessAngle, setGuessAngle] = useState(90);
  const [targetAngle, setTargetAngle] = useState(90);
  const [revealed, setRevealed] = useState(false);

  function handleSpin() {
    const next = randomTarget();
    setTargetAngle(next);
    setRevealed(false);
    console.log("targetAngle:", next.toFixed(2));
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <Dial guessAngle={guessAngle} targetAngle={targetAngle} revealed={revealed} />

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <SpinKnob onSpin={handleSpin} />
        <AdjustGuessControl angle={guessAngle} onChange={setGuessAngle} />
        <button
          onClick={() => setRevealed((r) => !r)}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "2px solid var(--color-cream-shadow)",
            background: revealed ? "var(--color-cream-dark)" : "#4a6741",
            color: revealed ? "var(--color-brown-dark)" : "#f5f0e8",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
      </div>

      {/* DEV ONLY — removed in Step 7; only shown after reveal so score can't be seen early */}
      {revealed && (
        <p style={{ textAlign: "center", marginTop: "1rem", fontFamily: "monospace" }}>
          Score: {scoreFor(guessAngle, targetAngle)}
        </p>
      )}
    </div>
  );
}
