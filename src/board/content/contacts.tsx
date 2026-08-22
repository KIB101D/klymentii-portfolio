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
      <div className="status-row"><span className="status-dot" />{t.board.status}</div>
      <div className="channel-list">
        <a className="channel-row" href="https://github.com/KIB101D" target="_blank" rel="noopener noreferrer">
          <span className="channel-tag">GH</span>
          <span className="channel-body"><span className="channel-label">GitHub</span><span className="channel-value">KIB101D</span></span>
          <span className="channel-hint">{t.board.open}</span>
        </a>
        <button className={`channel-row ${copied ? "is-copied" : ""}`} type="button" onClick={copyEmail}>
          <span className="channel-tag">@</span>
          <span className="channel-body"><span className="channel-label">Email</span><span className="channel-value">boiko.klymentii.ua@gmail.com</span></span>
          <span className="channel-hint">{copied ? t.board.copied : t.board.copy}</span>
        </button>
      </div>
    </>
  );
}
