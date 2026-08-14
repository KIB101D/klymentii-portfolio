const timeline = [
  ["May 2026 — present", "Frontend Developer", "School of Heroes"],
  ["Jan 2026 — Apr 2026", "Internship", "DMA EU - analytics admin panel"],
  ["May 2025 — Nov 2025", "Freelance", "StudentAbroad - EdTech platform"],
] as const;

export function ExperienceContent() {
  return (
    <>
      <p className="eyebrow">Experience</p>
      <ol className="timeline">
        {timeline.map(([date, role, org]) => (
          <li key={`${date}-${org}`}>
            <span className="tl-date">{date}</span>
            <span className="tl-role">{role}</span>
            <span className="tl-org">{org}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
