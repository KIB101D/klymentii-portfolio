import { useEffect, useRef } from "react";
import { createIntroEngine, type IntroEngine } from "./createIntroEngine";
import "./intro.css";

interface IntroSceneProps {
  onFinished: () => void;
}

export function IntroScene({ onFinished }: IntroSceneProps) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const stickerLogoRef = useRef<HTMLDivElement>(null);
  const stickerShadowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<IntroEngine | null>(null);
  const onFinishedRef = useRef(onFinished);

  onFinishedRef.current = onFinished;

  useEffect(() => {
    const canvasHost = canvasHostRef.current;
    const cut = cutRef.current;
    const flash = flashRef.current;
    const sticker = stickerRef.current;
    const stickerLogo = stickerLogoRef.current;
    const stickerShadow = stickerShadowRef.current;
    const dust = dustRef.current;

    if (
      !canvasHost ||
      !cut ||
      !flash ||
      !sticker ||
      !stickerLogo ||
      !stickerShadow ||
      !dust
    ) {
      return;
    }

    const engine = createIntroEngine({
      canvasHost,
      cut,
      flash,
      sticker,
      stickerLogo,
      stickerShadow,
      dust,
      onFinished: () => onFinishedRef.current(),
    });

    engineRef.current = engine;

    void engine
      .init()
      .then(() => engine.play())
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <section
      aria-label="Intro animation"
      className="intro-scene pointer-events-none fixed inset-0"
    >
      <div ref={canvasHostRef} className="absolute inset-0 z-0" />

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
    </section>
  );
}
