import { useEffect, useRef } from "react";
import { createIntroEngine } from "./createIntroEngine";
import { useI18n } from "../i18n";
import "./intro.css";

interface IntroSceneProps {
  onFinished: () => void;
  shouldPlay: boolean;
  showSkip: boolean;
}

export function IntroScene({ onFinished, shouldPlay, showSkip }: IntroSceneProps) {
  const { t } = useI18n();
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const stickerLogoRef = useRef<HTMLDivElement>(null);
  const stickerShadowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const onFinishedRef = useRef(onFinished);

  onFinishedRef.current = onFinished;

  useEffect(() => {
    if (!shouldPlay) return;

    const refs = {
      canvasHost: canvasHostRef.current,
      cut: cutRef.current,
      flash: flashRef.current,
      sticker: stickerRef.current,
      stickerLogo: stickerLogoRef.current,
      stickerShadow: stickerShadowRef.current,
      dust: dustRef.current,
    };

    if (Object.values(refs).some((value) => !value)) return;

    const engine = createIntroEngine({
      canvasHost: refs.canvasHost!,
      cut: refs.cut!,
      flash: refs.flash!,
      sticker: refs.sticker!,
      stickerLogo: refs.stickerLogo!,
      stickerShadow: refs.stickerShadow!,
      dust: refs.dust!,
      onFinished: () => onFinishedRef.current(),
    });

    void engine
      .init()
      .then(() => engine.play())
      .catch((error: unknown) => console.error(error));

    const handleSkip = () => {
      engine.skip();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showSkip) return;
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        handleSkip();
      }
    };

    skipRef.current?.addEventListener("click", handleSkip);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      skipRef.current?.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleKeyDown);
      engine.dispose();
    };
  }, [shouldPlay, showSkip]);

  return (
    <section
      aria-label="Intro animation"
      className="intro-scene fixed inset-0 z-0 pointer-events-none"
    >
      <div ref={canvasHostRef} className="absolute inset-0" />
      <div ref={cutRef} className="intro-cut" aria-hidden="true" />
      <div ref={flashRef} className="intro-flash" aria-hidden="true" />
      <div ref={stickerRef} className="intro-sticker" aria-hidden="true">
        <div ref={stickerShadowRef} className="intro-sticker-shadow">
          Klymentii
        </div>
        <div ref={stickerLogoRef} className="intro-sticker-logo">
          Klymentii
        </div>
      </div>
      <div ref={dustRef} className="intro-dust" aria-hidden="true" />

      {shouldPlay && showSkip && (
        <button
          ref={skipRef}
          className="intro-skip pointer-events-auto"
          type="button"
          aria-label={t.intro.skipAria}
        >
          <span className="intro-skip-key">↵</span>
          <span>{t.intro.skip}</span>
        </button>
      )}
    </section>
  );
}
