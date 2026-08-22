import { useI18n } from "../../i18n";

const recommendationFiles = {
  studentAbroad: {
    name: "StudentsAbroad",
    en: "/recommendations/studentsabroad-en.pdf",
    uk: "/recommendations/studentsabroad-ua.pdf",
  },
  dma: {
    name: "DMA EU",
    en: "/recommendations/dma-en.pdf",
    uk: "/recommendations/dma-ua.pdf",
  },
} as const;

function getRecommendation(org: string) {
  if (org.includes("StudentsAbroad") || org.includes("StudentAbroad")) {
    return recommendationFiles.studentAbroad;
  }

  if (org.includes("DMA EU")) {
    return recommendationFiles.dma;
  }

  return null;
}

export function ExperienceContent() {
  const { t } = useI18n();

  return (
    <>
      <p className="eyebrow">{t.experience.eyebrow}</p>

      <ol className="timeline">
        {t.experience.entries.map(([date, role, org]) => {
          const recommendation = getRecommendation(org);

          return (
            <li key={`${date}-${org}`} className="timeline-item">
              <span className="tl-date">{date}</span>

              <span className="tl-role">{role}</span>

              <span className="tl-org">{org}</span>

              {recommendation && (
                <div className="tl-recommendation" aria-label="References">
                  <span className="tl-recommendation-label">References</span>

                  <div className="tl-recommendation-links">
                    <a
                      href={recommendation.en}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${recommendation.name} recommendation letter in English`}
                    >
                      EN
                    </a>

                    <span className="tl-recommendation-separator">/</span>

                    <a
                      href={recommendation.uk}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${recommendation.name} recommendation letter in Ukrainian`}
                    >
                      UA
                    </a>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
