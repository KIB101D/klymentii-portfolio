import { useI18n } from "../../i18n";

export function AboutContent() {
  const { t } = useI18n();
  return (
    <>
      <p className="eyebrow">{t.about.eyebrow}</p>
      <div className="avatar">&lt;/&gt;</div>
      <p className="bio">{t.about.bio}</p>
      <div className="pills">
        {t.about.skills.map((pill) => <span className="pill" key={pill}>{pill}</span>)}
      </div>
    </>
  );
}
