import { useState } from "react";

export function ContactsContent() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText("boiko.klymentii.ua@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <>
      <p className="eyebrow">Contacts</p>
      <div className="status-row">
        <span className="status-dot" />
        Open to remote frontend roles
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
          <span className="channel-hint">open ↗</span>
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
          <span className="channel-hint">{copied ? "copied ✓" : "copy"}</span>
        </button>
      </div>
    </>
  );
}
