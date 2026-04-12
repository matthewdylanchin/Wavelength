import { useState } from "react";
import Dial from "./components/dial/Dial";
import AdjustGuessControl from "./components/game/AdjustGuessControl";
import SpinKnob from "./components/game/SpinKnob";
import { randomTarget } from "./lib/dial";

export default function App() {
  const [guessAngle, setGuessAngle] = useState(90);
  const [_targetAngle, setTargetAngle] = useState(90);

  function handleSpin() {
    const next = randomTarget();
    setTargetAngle(next);
    console.log("targetAngle:", next.toFixed(2));
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <Dial guessAngle={guessAngle} />
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
      </div>
    </div>
  );
}
