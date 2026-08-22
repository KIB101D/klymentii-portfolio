import { useState } from "react";
import { Board } from "./board/Board";
import { IntroScene } from "./intro/IntroScene";
import { I18nProvider } from "./i18n";
import "./app.css";

const INTRO_SEEN_KEY = "klymentii:intro-seen";

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {}
}

function PortfolioApp() {
  const [introVisible, setIntroVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(() => hasSeenIntro());

  function finishIntro() {
    markIntroSeen();
    setIntroVisible(false);
    setShowSkip(false);
  }

  return (
    <main className="app-shell">
      <IntroScene
        shouldPlay={introVisible}
        showSkip={showSkip}
        onFinished={finishIntro}
      />

      {introVisible ? null : <Board />}
    </main>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <PortfolioApp />
    </I18nProvider>
  );
}
