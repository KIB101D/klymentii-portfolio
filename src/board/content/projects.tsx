const projects = [
  ["ReactShop", "Next.js"],
  ["SEO Checker", "Web Vitals"],
  ["DAG Demo", "Webpack"],
  ["CATS", "Vanilla JS"],
] as const;

export function ProjectsContent() {
  return (
    <>
      <p className="eyebrow">Projects</p>
      <div className="project-grid">
        {projects.map(([name, tag]) => (
          <a className="project-card" href="#" key={name}>
            <span className="pc-name">{name}</span>
            <span className="pc-tag">{tag}</span>
          </a>
        ))}
      </div>
    </>
  );
}
