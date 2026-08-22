import { useI18n } from "../../i18n";

export function ProjectsContent() {
  const { t } = useI18n();
  return (
    <>
      <p className="eyebrow">{t.projects.eyebrow}</p>
      <div className="project-grid">
        {t.projects.entries.map(([name, tag, href]) => (
          <a
            className="project-card"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            key={name}
          >
            <span className="pc-name">{name}</span>
            <span className="pc-tag">{tag}</span>
          </a>
        ))}
      </div>
    </>
  );
}
