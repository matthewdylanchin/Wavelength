import { useState } from "react";
import Dial from "./components/dial/Dial";
import AdjustGuessControl from "./components/game/AdjustGuessControl";

export default function App() {
  const [guessAngle, setGuessAngle] = useState(90);

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <Dial guessAngle={guessAngle} />
      <div style={{ marginTop: "1.5rem" }}>
        <AdjustGuessControl angle={guessAngle} onChange={setGuessAngle} />
      </div>
    </div>
  );
}
