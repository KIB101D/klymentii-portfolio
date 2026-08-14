import { useState } from "react";
import { IntroScene } from "./intro/IntroScene";
import { Board } from "./board/Board";

export default function App() {
  const [phase, setPhase] = useState<"intro" | "board">("intro");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1c1c1c] text-[#f1eee6]">
      <IntroScene
        onFinished={() => {
          setPhase("board");
        }}
      />

      {phase === "board" ? <Board /> : null}
    </main>
  );
}
