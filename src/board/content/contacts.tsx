import { useState } from "react";
import { useI18n } from "../../i18n";

export function ContactsContent() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText("boiko.klymentii.ua@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore clipboard failures; the address remains visible.
    }
  }

  return (
    <>
      <p className="eyebrow">{t.contacts.eyebrow}</p>
      <div className="status-row">
        <span className="status-dot" />
        {t.board.status}
      </div>
      <div className="channel-list">
        <a
          className="channel-row"
          href="https://github.com/KIB101D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="channel-tag">GH</span>
          <span className="channel-body">
            <span className="channel-label">GitHub</span>
            <span className="channel-value">KIB101D</span>
          </span>
          <span className="channel-hint">{t.board.open}</span>
        </a>
        <a
          className="channel-row"
          href="https://www.linkedin.com/in/klymentii-boiko-a92539303/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="channel-tag">
            <svg
              viewBox="0 0 448 512"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
          </span>
          <span className="channel-body">
            <span className="channel-label">LinkedIn</span>
            <span className="channel-value">klymentii-boiko</span>
          </span>
          <span className="channel-hint">{t.board.open}</span>
        </a>
        <button
          className={`channel-row ${copied ? "is-copied" : ""}`}
          type="button"
          onClick={copyEmail}
        >
          <span className="channel-tag">@</span>
          <span className="channel-body">
            <span className="channel-label">Email</span>
            <span className="channel-value">boiko.klymentii.ua@gmail.com</span>
          </span>
          <span className="channel-hint">
            {copied ? t.board.copied : t.board.copy}
          </span>
        </button>
      </div>
    </>
  );
}
