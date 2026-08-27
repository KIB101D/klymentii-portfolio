import { useEffect, useRef } from "react";
import { createIntroEngine } from "./createIntroEngine";
import { useI18n } from "../i18n";
import "./intro.css";

interface IntroSceneProps {
  onFinished: () => void;
  shouldPlay: boolean;
  showSkip: boolean;
}

export function IntroScene({
  onFinished,
  shouldPlay,
  showSkip,
}: IntroSceneProps) {
  const { t } = useI18n();

  const canvasHostRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const stickerLogoRef = useRef<HTMLDivElement>(null);
  const stickerShadowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  const skipRef = useRef<HTMLButtonElement>(null);
  const skipIndicatorRef = useRef<HTMLDivElement>(null);
  const skipTouchLayerRef = useRef<HTMLDivElement>(null);

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

    if (Object.values(refs).some((value) => !value)) {
      return;
    }

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

    const button = skipRef.current;
    const indicator = skipIndicatorRef.current;

    if (!showSkip) {
      return () => engine.dispose();
    }

    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    /*
     * Desktop:
     * - visible skip hint
     * - click
     * - Enter / Escape
     */
    if (!isMobile) {
      if (!button) {
        return () => engine.dispose();
      }

      const handleSkip = () => {
        engine.skip();
      };

      const handleClick = () => {
        handleSkip();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === "Escape") {
          handleSkip();
        }
      };

      button.addEventListener("click", handleClick);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        button.removeEventListener("click", handleClick);
        window.removeEventListener("keydown", handleKeyDown);
        engine.dispose();
      };
    }

    /*
     * Mobile:
     * - no fixed skip button
     * - touch anywhere
     * - indicator appears exactly at touch point
     * - hold to fill the ring
     */
    const touchLayer = skipTouchLayerRef.current;

    if (!indicator || !touchLayer) {
      return () => engine.dispose();
    }

    const progress = indicator.querySelector<SVGCircleElement>(
      ".intro-skip-progress",
    );

    const HOLD_DURATION = 900;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    let holdStart = 0;
    let holdFrame: number | null = null;
    let holding = false;
    let completedByHold = false;
    let activeTouchId: number | null = null;

    const hideIndicator = () => {
      indicator.classList.remove("is-visible", "is-pressing");
      indicator.setAttribute("aria-hidden", "true");

      if (progress) {
        progress.style.strokeDashoffset = `${circumference}`;
      }
    };

    const resetProgress = () => {
      holding = false;
      activeTouchId = null;
      completedByHold = false;

      if (holdFrame !== null) {
        cancelAnimationFrame(holdFrame);
        holdFrame = null;
      }

      hideIndicator();
    };

    const updateProgress = (now: number) => {
      if (!holding) return;

      const elapsed = now - holdStart;
      const ratio = Math.min(1, elapsed / HOLD_DURATION);

      if (progress) {
        progress.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
      }

      if (ratio >= 1) {
        completedByHold = true;
        holding = false;
        activeTouchId = null;
        holdFrame = null;

        hideIndicator();
        engine.skip();

        return;
      }

      holdFrame = requestAnimationFrame(updateProgress);
    };

    const showIndicatorAt = (x: number, y: number) => {
      indicator.style.left = `${x}px`;
      indicator.style.top = `${y}px`;

      indicator.classList.add("is-visible", "is-pressing");
      indicator.setAttribute("aria-hidden", "false");
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (holding) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      event.preventDefault();

      activeTouchId = touch.identifier;
      completedByHold = false;
      holding = true;
      holdStart = performance.now();

      showIndicatorAt(touch.clientX, touch.clientY);

      if (progress) {
        progress.style.strokeDasharray = `${circumference}`;
        progress.style.strokeDashoffset = `${circumference}`;
      }

      holdFrame = requestAnimationFrame(updateProgress);
    };

    const findActiveTouch = (event: TouchEvent) =>
      Array.from(event.changedTouches).find(
        (touch) => touch.identifier === activeTouchId,
      );

    const handleTouchEnd = (event: TouchEvent) => {
      if (!holding || !findActiveTouch(event)) {
        return;
      }

      if (!completedByHold) {
        resetProgress();
      }
    };

    const handleTouchCancel = (event: TouchEvent) => {
      if (!holding || !findActiveTouch(event)) {
        return;
      }

      resetProgress();
    };

    // Defensive: guards Android-style long-press context menus too.
    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetProgress();
      }
    };

    touchLayer.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    touchLayer.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    touchLayer.addEventListener("touchcancel", handleTouchCancel, {
      passive: false,
    });

    touchLayer.addEventListener("contextmenu", handleContextMenu);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      resetProgress();

      touchLayer.removeEventListener("touchstart", handleTouchStart);
      touchLayer.removeEventListener("touchend", handleTouchEnd);
      touchLayer.removeEventListener("touchcancel", handleTouchCancel);
      touchLayer.removeEventListener("contextmenu", handleContextMenu);

      document.removeEventListener("visibilitychange", handleVisibilityChange);

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
        <>
          <button
            ref={skipRef}
            className="intro-skip intro-skip-desktop-button pointer-events-auto"
            type="button"
            aria-label={t.intro.skipAria}
          >
            <span className="intro-skip-desktop">
              <span className="intro-skip-key">↵</span>
              <span>{t.intro.skip}</span>
            </span>
          </button>

          <div
            ref={skipTouchLayerRef}
            className="intro-skip-touch-layer"
            aria-hidden="true"
          />

          <div
            ref={skipIndicatorRef}
            className="intro-skip-touch-indicator"
            aria-hidden="true"
          >
            <svg
              className="intro-skip-ring"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle className="intro-skip-track" cx="24" cy="24" r="20" />

              <circle className="intro-skip-progress" cx="24" cy="24" r="20" />
            </svg>
          </div>

          <div className="intro-skip-mobile-hint" aria-hidden="true">
            {t.intro.skipHold}
          </div>
        </>
      )}
    </section>
  );
}
