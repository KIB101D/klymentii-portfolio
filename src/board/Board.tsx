import { useEffect, useRef, useState } from "react";
import type { NodeKey } from "./content/content";
import { CONTENT } from "./content/content";
import { CurveLayer } from "./CurveLayer";
import { Node } from "./Node";
import { Popover } from "./Popover";
import { useBoardCurves } from "./useBoardCurves";
import { useMousePosition } from "../shared/useMousePosition";
import { useI18n } from "../i18n";
import "./board.css";

const NODE_CONFIG = [
  {
    id: "about",
    float: {
      x: 14,
      y: -18,
      duration: "11s",
      delay: "0s",
    },
  },
  {
    id: "experience",
    float: {
      x: -16,
      y: 14,
      duration: "13s",
      delay: "1.4s",
    },
  },
  {
    id: "projects",
    float: {
      x: 13,
      y: 17,
      duration: "9.5s",
      delay: "0.8s",
    },
  },
  {
    id: "contacts",
    float: {
      x: -14,
      y: -12,
      duration: "12s",
      delay: "2.1s",
    },
  },
] as const;

export function Board() {
  const { locale, setLocale, t } = useI18n();

  const boardRef = useRef<HTMLDivElement>(null);
  const boardBgRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);

  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([
    null,
    null,
    null,
    null,
  ]);

  const curveRefs = useRef<Array<SVGPathElement | null>>([null, null, null]);

  const [visibleNodes, setVisibleNodes] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [drawnCurves, setDrawnCurves] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const [headerVisible, setHeaderVisible] = useState(false);

  const [quicklinksVisible, setQuicklinksVisible] = useState(false);

  const [coordsVisible, setCoordsVisible] = useState(false);

  const [hintVisible, setHintVisible] = useState(false);

  const [activeMobile, setActiveMobile] = useState<NodeKey | null>(null);

  const [openPopovers, setOpenPopovers] = useState<NodeKey[]>([]);

  const [popoverZ, setPopoverZ] = useState(20);

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const isDesktop = () => window.matchMedia("(min-width: 641px)").matches;

  useMousePosition(boardBgRef, coordsRef, t.board.coords);

  useBoardCurves({
    boardRef,
    nodeRefs,
    curveRefs,
  });

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setHeaderVisible(true), 40),

      window.setTimeout(() => setQuicklinksVisible(true), 80),

      window.setTimeout(() => setCoordsVisible(true), 120),

      window.setTimeout(() => setHintVisible(true), 160),

      window.setTimeout(
        () => setVisibleNodes((v) => [true, v[1], v[2], v[3]]),
        180,
      ),

      window.setTimeout(() => setDrawnCurves((v) => [true, v[1], v[2]]), 380),

      window.setTimeout(
        () => setVisibleNodes((v) => [v[0], true, v[2], v[3]]),
        620,
      ),

      window.setTimeout(() => setDrawnCurves((v) => [v[0], true, v[2]]), 820),

      window.setTimeout(
        () => setVisibleNodes((v) => [v[0], v[1], true, v[3]]),
        1060,
      ),

      window.setTimeout(() => setDrawnCurves((v) => [v[0], v[1], true]), 1260),

      window.setTimeout(
        () => setVisibleNodes((v) => [v[0], v[1], v[2], true]),
        1500,
      ),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!isDesktop()) {
        setOpenPopovers([]);
        setActiveMobile(null);
      }

      setLanguageMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isDesktop() || openPopovers.length === 0) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (target?.closest(".node-popover") || target?.closest(".node")) {
        return;
      }

      setOpenPopovers([]);
    };

    const handleLanguageOutsideClick = (event: MouseEvent) => {
      if (!languageMenuOpen || isDesktop()) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (target?.closest(".locale-switcher")) {
        return;
      }

      setLanguageMenuOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);

    document.addEventListener("click", handleLanguageOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);

      document.removeEventListener("click", handleLanguageOutsideClick);
    };
  }, [openPopovers.length, languageMenuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setOpenPopovers([]);
      setActiveMobile(null);
      setLanguageMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  function toggleNode(nodeKey: NodeKey) {
    if (isDesktop()) {
      setOpenPopovers((current) => {
        if (current.includes(nodeKey)) {
          return current.filter((key) => key !== nodeKey);
        }

        setPopoverZ((value) => value + 1);

        return [...current, nodeKey];
      });

      return;
    }

    setActiveMobile(nodeKey);
  }

  const ActiveContent = activeMobile ? CONTENT[activeMobile] : null;

  return (
    <div
      ref={boardRef}
      className={`board ${activeMobile ? "has-open-panel" : ""}`}
    >
      <div ref={boardBgRef} className="board-bg" />

      <div className="board-vignette" />

      <CurveLayer
        register={(index, element) => {
          curveRefs.current[index] = element;
        }}
        drawn={drawnCurves}
      />

      <div className={`board-header ${headerVisible ? "is-visible" : ""}`}>
        <span className="dot">◆</span> {t.board.header}
      </div>

      <nav
        className={`quicklinks ${quicklinksVisible ? "is-visible" : ""}`}
        aria-label="Quick links"
      >
        <a
          href="https://github.com/KIB101D"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.board.quickGitHub}
        </a>

        <a href="mailto:boiko.klymentii.ua@gmail.com">{t.board.quickEmail}</a>

        <div
          className={`locale-switcher ${languageMenuOpen ? "is-open" : ""}`}
          aria-label="Language"
        >
          <div className="locale-desktop-options">
            {(["en", "uk", "pl"] as const).map((item) => (
              <button
                key={item}
                className={locale === item ? "is-active" : ""}
                type="button"
                onClick={() => setLocale(item)}
                aria-pressed={locale === item}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="locale-mobile-trigger"
            type="button"
            aria-label="Select language"
            aria-expanded={languageMenuOpen}
            onClick={() => setLanguageMenuOpen((open) => !open)}
          >
            {locale.toUpperCase()}
          </button>

          <div
            className="locale-mobile-options"
            aria-hidden={!languageMenuOpen}
          >
            {(["en", "uk", "pl"] as const).map((item) => (
              <button
                key={item}
                className={locale === item ? "is-active" : ""}
                type="button"
                tabIndex={languageMenuOpen ? 0 : -1}
                onClick={() => {
                  setLocale(item);
                  setLanguageMenuOpen(false);
                }}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div
        ref={coordsRef}
        className={`coords ${coordsVisible ? "is-visible" : ""}`}
      >
        x · y
      </div>

      <div className={`hint ${hintVisible ? "is-visible" : ""}`}>
        {t.board.hint}
      </div>

      {NODE_CONFIG.map((node, index) => (
        <Node
          key={node.id}
          id={node.id}
          label={t.board.nodes[node.id]}
          float={node.float}
          visible={visibleNodes[index]}
          active={activeMobile === node.id || openPopovers.includes(node.id)}
          onClick={() => toggleNode(node.id)}
          register={(element) => {
            nodeRefs.current[index] = element;
          }}
        />
      ))}

      {openPopovers.map((nodeKey, index) => {
        const nodeIndex = NODE_CONFIG.findIndex((node) => node.id === nodeKey);

        const anchor = nodeRefs.current[nodeIndex];

        if (!anchor) {
          return null;
        }

        return (
          <Popover
            key={nodeKey}
            nodeKey={nodeKey}
            anchor={anchor}
            zIndex={21 + index + (popoverZ - 20)}
            onClose={() =>
              setOpenPopovers((current) =>
                current.filter((key) => key !== nodeKey),
              )
            }
          />
        );
      })}

      <div
        className={`backdrop ${activeMobile ? "is-open" : ""}`}
        onClick={() => setActiveMobile(null)}
        aria-hidden="true"
      />

      <aside
        className={`panel panel--bottom ${
          activeMobile === "about" ? "is-open" : ""
        }`}
        aria-hidden={activeMobile !== "about"}
      >
        <button
          className="panel-close"
          type="button"
          aria-label={t.board.close}
          onClick={() => setActiveMobile(null)}
        >
          ✕
        </button>

        <div className="panel-content">
          {activeMobile === "about" && ActiveContent ? <ActiveContent /> : null}
        </div>
      </aside>

      <aside
        className={`panel panel--right ${
          activeMobile && activeMobile !== "about" ? "is-open" : ""
        }`}
        aria-hidden={!activeMobile || activeMobile === "about"}
      >
        <button
          className="panel-close"
          type="button"
          aria-label={t.board.close}
          onClick={() => setActiveMobile(null)}
        >
          ✕
        </button>

        <div className="panel-content">
          {activeMobile && activeMobile !== "about" && ActiveContent ? (
            <ActiveContent />
          ) : null}
        </div>
      </aside>
    </div>
  );
}
